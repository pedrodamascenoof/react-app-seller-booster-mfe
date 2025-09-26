-- Migration: 001_create_profiles_table.sql
-- Creates public.profiles table, triggers to sync auth.users -> profiles and basic RLS policies

-- 1) Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2) Function + trigger to insert profile when auth.users row is created
create or replace function public.handle_auth_user_created()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, full_name, phone, created_at, updated_at)
  values (
    new.id,
    new.email,
    (new.raw_user_meta_data->>'name')::text,
    (new.raw_user_meta_data->>'phone')::text,
    now(),
    now()
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_auth_user_created();

-- 3) Function + trigger to sync updates
create or replace function public.handle_auth_user_updated()
returns trigger
language plpgsql
security definer
as $$
begin
  update public.profiles
  set
    email = new.email,
    full_name = (new.raw_user_meta_data->>'name')::text,
    phone = (new.raw_user_meta_data->>'phone')::text,
    updated_at = now()
  where id = new.id;

  return new;
end;
$$;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
after update on auth.users
for each row
execute function public.handle_auth_user_updated();

-- 4) Enable RLS and policies
alter table public.profiles enable row level security;

create policy "Profiles - select own" on public.profiles
  for select
  using ( auth.uid() = id );

create policy "Profiles - update own" on public.profiles
  for update
  using ( auth.uid() = id )
  with check ( auth.uid() = id );

-- Optional: allow insert by authenticated users only for their own id
create policy "Profiles - insert own" on public.profiles
  for insert
  with check ( auth.uid() = id );

-- End of migration
