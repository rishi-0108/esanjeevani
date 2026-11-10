-- Stores the complete generated report so a future history view can reopen it.
create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  report_data jsonb not null,
  constraint assessments_report_data_object check (jsonb_typeof(report_data) = 'object')
);

-- Supports listing one user's assessments newest first.
create index assessments_user_created_at_idx
  on public.assessments (user_id, created_at desc);

comment on table public.assessments is
  'Authenticated users'' generated health assessment reports; report_data mirrors the frontend DiagnosisReport payload.';
comment on column public.assessments.report_data is
  'Serialized DiagnosisReport including patientInfo, answers, results, overallUrgency, reportId, and timestamp.';

-- RLS and SQL grants both restrict access; anon receives no table privileges.
alter table public.assessments enable row level security;
revoke all privileges on table public.assessments from anon, authenticated;
grant select, insert on table public.assessments to authenticated;

-- A user may read only their own saved assessments.
create policy "Users can read their own assessments"
  on public.assessments
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- A user may save an assessment only under their own auth user ID.
create policy "Users can insert their own assessments"
  on public.assessments
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
