# Supabase assessment storage

## What the table stores

The `public.assessments` table stores one generated `DiagnosisReport` per row. The row has a database UUID, the owning `auth.users.id`, and a database creation timestamp for history ordering. `report_data` stores the serialized report needed to reopen the existing report view: patient information, question answers, disease results and confidence scores, urgency, the report ID, timestamp, and recommendations.

The report payload contains personal and health information supplied by the user. Only save a report after the user is authenticated and has chosen to save it. Do not put credentials, passwords, tokens, or Supabase secret keys in the table.

## Access controls

Row Level Security is enabled. Authenticated users can select rows only when `user_id` matches `auth.uid()`, and can insert only rows with their own user ID. The `anon` role has no table privileges. Authenticated users are granted only `SELECT` and `INSERT`; updates and deletes are not granted in this phase.

## Apply the migration manually

1. Review `migrations/20261024000100_create_assessments.sql`.
2. In the Supabase Dashboard, open the intended project and go to **SQL Editor**.
3. Paste the complete migration into a new query and run it.
4. Confirm the query succeeds before proceeding to Phase 3B.

This repository migration has not been applied to the Supabase project. Apply it manually before adding application queries in Phase 3B.

## Verify table and policies

In the Dashboard, check **Table Editor** for `public.assessments`. In SQL Editor, run:

```sql
select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'assessments'
order by policyname;
```

The result should show the owner-only `SELECT` and `INSERT` policies for the `authenticated` role. Also confirm RLS is enabled for `public.assessments` in the table's security settings. Do not use real patient data for access-control testing.
