-- Create trading_logs table for analysis
create table if not exists public.trading_logs (
  id uuid default gen_random_uuid() primary key,
  pair text not null, -- XAUUSD, BTCUSD, etc.
  type text check (type in ('Buy', 'Sell')),
  entry_price numeric(20, 8),
  exit_price numeric(20, 8),
  profit_loss numeric(20, 8),
  status text check (status in ('Open', 'Closed')) default 'Open',
  trading_plan text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Set up RLS for trading_logs
alter table public.trading_logs enable row level security;

create policy "Enable all access for authenticated users"
  on public.trading_logs for all
  using (true);

-- Trigger to update updated_at timestamp
create trigger update_trading_logs_updated_at
before update on public.trading_logs
for each row
execute function update_updated_at_column();
