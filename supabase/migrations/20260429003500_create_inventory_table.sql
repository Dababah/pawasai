-- Create inventory table for Core Pawas business
create table if not exists public.inventory (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text,
  stock integer default 0,
  price numeric(12, 2) default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Set up RLS for inventory
alter table public.inventory enable row level security;

create policy "Enable all access for authenticated users"
  on public.inventory for all
  using (true);

-- Trigger to update updated_at timestamp
create trigger update_inventory_updated_at
before update on public.inventory
for each row
execute function update_updated_at_column();
