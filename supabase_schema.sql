-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create research_requests table
create table public.research_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  original_prompt text not null,
  refined_prompt text,
  status text check (status in ('refining', 'approved', 'running', 'consolidating', 'complete', 'failed')) default 'refining',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone
);

-- Create research_tasks table
create table public.research_tasks (
  id uuid default uuid_generate_v4() primary key,
  request_id uuid references public.research_requests(id) on delete cascade not null,
  platform text check (platform in ('openai', 'gemini', 'claude', 'manus')) not null,
  status text check (status in ('pending', 'running', 'complete', 'failed')) default 'pending',
  result_text text,
  result_file_url text,
  error_message text,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create consolidated_reports table
create table public.consolidated_reports (
  id uuid default uuid_generate_v4() primary key,
  request_id uuid references public.research_requests(id) on delete cascade not null,
  content text not null,
  file_url text,
  obsidian_synced boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_settings table
create table public.user_settings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  obsidian_api_key text,
  obsidian_vault_path text,
  obsidian_target_folder text default 'Research',
  obsidian_integration_type text check (obsidian_integration_type in ('mcp', 'filesystem', 'disabled')) default 'filesystem',
  openai_api_key text,
  anthropic_api_key text,
  gemini_api_key text,
  refinement_model text default 'gpt-4.1-mini',
  consolidation_model text default 'claude-3-5-sonnet-20241022',
  enabled_agents jsonb default '["openai", "gemini", "claude", "manus"]'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create address_book table
create table public.address_book (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  email text not null,
  name text,
  last_used_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, email)
);

-- Enable Row Level Security (RLS)
alter table public.research_requests enable row level security;
alter table public.research_tasks enable row level security;
alter table public.consolidated_reports enable row level security;
alter table public.user_settings enable row level security;
alter table public.address_book enable row level security;

-- Create RLS Policies
create policy "Users can view their own requests" on public.research_requests for select using (auth.uid() = user_id);
create policy "Users can insert their own requests" on public.research_requests for insert with check (auth.uid() = user_id);
create policy "Users can update their own requests" on public.research_requests for update using (auth.uid() = user_id);

create policy "Users can view tasks for their requests" on public.research_tasks for select using (exists (select 1 from public.research_requests where id = research_tasks.request_id and user_id = auth.uid()));
create policy "Users can insert tasks for their requests" on public.research_tasks for insert with check (exists (select 1 from public.research_requests where id = research_tasks.request_id and user_id = auth.uid()));
create policy "Users can update tasks for their requests" on public.research_tasks for update using (exists (select 1 from public.research_requests where id = research_tasks.request_id and user_id = auth.uid()));

create policy "Users can view reports for their requests" on public.consolidated_reports for select using (exists (select 1 from public.research_requests where id = consolidated_reports.request_id and user_id = auth.uid()));
create policy "Users can insert reports for their requests" on public.consolidated_reports for insert with check (exists (select 1 from public.research_requests where id = consolidated_reports.request_id and user_id = auth.uid()));

create policy "Users can view their own settings" on public.user_settings for select using (auth.uid() = user_id);
create policy "Users can insert their own settings" on public.user_settings for insert with check (auth.uid() = user_id);
create policy "Users can update their own settings" on public.user_settings for update using (auth.uid() = user_id);

create policy "Users can view their own address book" on public.address_book for select using (auth.uid() = user_id);
create policy "Users can insert their own address book" on public.address_book for insert with check (auth.uid() = user_id);
create policy "Users can update their own address book" on public.address_book for update using (auth.uid() = user_id);

-- Create function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_settings (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create settings on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
