# Project Roadmap & TODOs

## 🔴 High Priority (Immediate Fixes)

- [ ] **Refine Manus Selectors:** The Playwright script (`server/manus-automation.ts`) uses hypothetical CSS selectors (e.g., `textarea[placeholder*="Ask"]`). These MUST be updated to match the actual DOM structure of `manus.im` once verified.
- [ ] **Error Handling for Browser:** Add robust recovery if the local Chrome window is accidentally closed by the user during a Manus run.
- [ ] **Supabase Realtime:** Connect the Frontend `ResearchProgress` component to Supabase Realtime subscriptions so the UI updates automatically without polling.

## 🟡 Medium Priority (Enhancements)

- [ ] **PDF Generation:** Implement the backend logic to convert the Markdown report into a styled PDF using `pdfkit` or `puppeteer` for the Email attachment feature.
- [ ] **Obsidian MCP Connection:** Currently, the system supports direct file writing (if running locally with permissions). The next step is to integrate the official Obsidian MCP server for richer interaction (tag management, linking).
- [ ] **Retry Logic:** Implement the "Granular Retry" button in the UI to re-trigger just one failed agent instead of the whole job.

## 🟢 Low Priority (Future Features)

- [ ] **Mobile Support:** Optimize the layout for mobile devices (currently desktop-first).
- [ ] **Voice Input:** Add a microphone button to the New Research page for dictating queries.
- [ ] **Scheduled Research:** Add a cron job feature to re-run specific research queries automatically every week/month.

## 🔧 Technical Debt

- [ ] **Type Safety:** Improve TypeScript interfaces for the API responses (currently using some `any` types for speed).
- [ ] **Testing:** Add unit tests for the `AIService` class to mock API responses and verify consolidation logic.
