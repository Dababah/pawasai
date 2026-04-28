-- Enable the pgvector extension to work with embeddings
create extension if not exists vector;

-- Table for storing high-fidelity notes with block-based content
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Untitled Protocol',
  content jsonb not null default '{}'::jsonb, -- Block-based structure (Tiptap JSON)
  content_text text, -- Plain text for AI processing and traditional search
  category text check (category in ('tech', 'trading', 'business', 'academic', 'general')) default 'general',
  tags text[] default array[]::text[],
  embedding vector(1536), -- 1536 for OpenAI / 768 for Gemini (adjusted in code)
  user_id uuid references auth.users(id),
  is_pinned boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Index for fast similarity search using HNSW
create index on public.notes using hnsw (embedding vector_cosine_ops);

-- Function to match notes based on semantic similarity
create or replace function match_notes (
  query_embedding vector(768), -- Gemini standard
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  title text,
  content_text text,
  category text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    notes.id,
    notes.title,
    notes.content_text,
    notes.category,
    1 - (notes.embedding <=> query_embedding) as similarity
  from notes
  where 1 - (notes.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
end;
$$;

-- Trigger to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_notes_updated_at
before update on public.notes
for each row
execute function update_updated_at_column();
