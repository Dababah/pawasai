-- Adjust embedding dimension for Gemini (768)
alter table public.notes 
alter column embedding type vector(768);

-- Refresh the match_notes function just in case
create or replace function match_notes (
  query_embedding vector(768),
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
