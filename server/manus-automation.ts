import { chromium, Browser, Page } from "playwright";

export class ManusAutomator {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async initialize() {
    // Launch in headful mode so the user can see what's happening (and handle login if needed)
    this.browser = await chromium.launch({ 
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }

  async runResearch(prompt: string): Promise<string> {
    if (!this.page) await this.initialize();
    if (!this.page) throw new Error("Failed to initialize browser");

    try {
      console.log("Navigating to Manus...");
      await this.page.goto("https://manus.im/login");

      // Check if we need to log in
      // We wait a bit to see if the user is redirected to app or stays on login
      try {
        await this.page.waitForURL("**/app", { timeout: 5000 });
        console.log("Already logged in!");
      } catch (e) {
        console.log("Please log in to Manus in the browser window...");
        // Wait indefinitely for user to log in and reach the app
        await this.page.waitForURL("**/app", { timeout: 300000 }); // 5 minutes to login
      }

      console.log("Starting research...");
      
      // Wait for the input area
      const inputSelector = 'textarea[placeholder*="Ask"]'; // Adjust selector based on actual UI
      await this.page.waitForSelector(inputSelector);
      
      // Type the prompt
      await this.page.fill(inputSelector, prompt);
      await this.page.keyboard.press("Enter");

      console.log("Research submitted. Waiting for results...");

      // Wait for the "Deep Research" or result container to appear and finish
      // This is the tricky part - we need to detect when it's DONE.
      // We'll look for a specific "Completed" indicator or wait for text to stop changing.
      
      // For now, we'll wait for a reasonable timeout or a specific element
      // In a real implementation, we'd poll the DOM for "status: complete"
      await this.page.waitForTimeout(30000); // Initial wait

      // Extract content
      // This selector is hypothetical and needs to be adjusted to the real Manus DOM
      const contentSelector = 'div[class*="markdown-body"]'; 
      await this.page.waitForSelector(contentSelector, { timeout: 600000 }); // Wait up to 10 mins for research
      
      const content = await this.page.innerText(contentSelector);
      
      return content;

    } catch (error) {
      console.error("Manus automation failed:", error);
      throw error;
    } finally {
      if (this.browser) {
        await this.browser.close();
        this.browser = null;
        this.page = null;
      }
    }
  }
}
