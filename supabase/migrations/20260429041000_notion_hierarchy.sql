-- Transform notes into a full hierarchical Page system (Notion style)
alter table public.notes 
add column if not exists parent_id uuid references public.notes(id),
add column if not exists icon text,
add column if not exists cover_url text,
add column if not exists properties jsonb default '{}'::jsonb;

-- Add a column for block-based content if not already perfect
-- We already have content jsonb, which is good for Tiptap JSON.

-- Create a view or index for faster hierarchical queries
create index if not exists idx_notes_parent_id on public.notes(parent_id);

-- Add a function to get breadcrumbs (optional but helpful for Notion feel)
create or replace function get_page_path(page_id uuid)
returns table (id uuid, title text) as $$
begin
  return query
  with recursive page_tree as (
    select n.id, n.title, n.parent_id, 1 as depth
    from notes n
    where n.id = page_id
    union all
    select n.id, n.title, n.parent_id, pt.depth + 1
    from notes n
    join page_tree pt on n.id = pt.parent_id
  )
  select pt.id, pt.title from page_tree pt order by pt.depth desc;
end;
$$ language plpgsql;
