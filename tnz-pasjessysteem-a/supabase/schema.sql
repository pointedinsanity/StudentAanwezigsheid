create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  email text not null,
  student_number text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create or replace function public.sync_profile_from_auth()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, student_number, updated_at)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'student_number', ''),
    now()
  )
  on conflict (id) do update set
    name = excluded.name,
    email = excluded.email,
    student_number = excluded.student_number,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_profile_sync on auth.users;
create trigger on_auth_user_profile_sync
after insert or update of email, raw_user_meta_data on auth.users
for each row execute function public.sync_profile_from_auth();

insert into public.profiles (id, name, email, student_number)
select id, coalesce(raw_user_meta_data ->> 'name', ''), email, coalesce(raw_user_meta_data ->> 'student_number', '')
from auth.users
on conflict (id) do update set
  name = excluded.name,
  email = excluded.email,
  student_number = excluded.student_number,
  updated_at = now();
