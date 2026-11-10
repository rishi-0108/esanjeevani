# E-Sanjeevani — AI-Powered Disease Prediction & Healthcare Assistance Platform

E-Sanjeevani is a web-based healthcare assistance platform designed to help users assess their symptoms, explore possible health conditions, understand the urgency of their symptoms, and access healthcare-related recommendations.

The application provides a symptom-checking interface, disease prediction results, assessment reports, user authentication, and medical history management. It uses a React and TypeScript frontend with Supabase for authentication and persistent storage of assessment reports.

> **Disclaimer:** E-Sanjeevani is an academic project and is not a substitute for professional medical advice, diagnosis, or treatment. Its predictions and recommendations should be treated as informational only.

---

## Table of Contents

1. Project Overview
2. Objectives
3. Features
4. Technology Stack
5. System Architecture
6. Repository Structure
7. Prerequisites
8. Installation and Setup
9. Environment Configuration
10. Supabase Configuration
11. Running the Application
12. Available Commands
13. Application Workflow
14. Database Design
15. Documentation and Test Cases
16. Deployment
17. Troubleshooting
18. Security Considerations
19. Limitations
20. Future Scope

---

## 1. Project Overview

Healthcare accessibility and awareness remain important challenges. People may delay seeking medical attention because of limited access to healthcare services, a lack of awareness about symptoms, or uncertainty about the seriousness of their condition.

E-Sanjeevani aims to provide an accessible first-level healthcare assistance interface where users can:

- Enter personal and health-related information.
- Select or describe their symptoms.
- Receive possible disease predictions.
- View prediction confidence scores and health-related recommendations where supported.
- Review generated health assessment reports.
- Create an account and securely access saved assessment records.
- Revisit previous assessments through medical history.

The application is developed as part of an academic Software Engineering and Project Management project.

## 2. Objectives

- Develop an accessible and user-friendly healthcare assistance platform.
- Provide a structured symptom-checking workflow.
- Present possible disease predictions based on submitted symptoms.
- Display health-related recommendations and urgency information.
- Generate assessment reports for users.
- Implement user registration, login, and session management.
- Store assessment records securely using Supabase.
- Allow authenticated users to retrieve their previous assessment reports.

## 3. Features

### 3.1 Symptom Checker
- User-facing symptom assessment interface.
- Collection of relevant symptom information.
- Structured input for the disease prediction workflow.

### 3.2 AI-Powered Disease Prediction
- Processes submitted symptom information.
- Presents possible health conditions.
- Displays prediction results and associated confidence information where implemented.

### 3.3 Health Recommendations
- Provides health-related guidance based on assessment results.
- Includes urgency-related information where supported by the application.

### 3.4 Assessment Reports
- Displays the outcome of a health assessment.
- Organizes diagnosis-related information into a report.
- Supports saving reports for authenticated users.

### 3.5 User Authentication
- User registration using email and password.
- User login and logout.
- Session restoration through Supabase Authentication.
- Access to authenticated user features.

### 3.6 Medical History
- Retrieves previously saved assessment reports.
- Displays reports in chronological order.
- Allows users to revisit previous assessments.

### 3.7 Guest Access
- Provides access to the application's available guest workflow without requiring an account.
- Persistent medical history is intended for authenticated users.

---

## 4. Technology Stack

| Category | Technology |
|---|---|
| Frontend | React 18 |
| Programming Language | TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router |
| Icons | Lucide React |
| Backend Services | Supabase |
| Authentication | Supabase Auth |
| Database | PostgreSQL |
| Database Security | Row Level Security (RLS) |
| Package Manager | npm |
| Version Control | Git and GitHub |
| Deployment | Vercel |

### Why these technologies?

- **React:** Component-based frontend development.
- **TypeScript:** Static typing and improved maintainability.
- **Vite:** Fast development server and optimized production builds.
- **Tailwind CSS:** Utility-first styling.
- **Supabase:** Managed authentication and PostgreSQL database services.
- **React Router:** Client-side navigation between application pages.

---

## 5. System Architecture

The application follows a frontend-plus-managed-backend architecture.

```text
                  USER
                    |
                    v
             React Frontend
                    |
             React Router
                    |
          +---------+----------+
          |                    |
          v                    v
    Symptom Checker       Authentication
          |                    |
          v                    v
    Diagnosis Logic       Supabase Auth
          |
          v
    Assessment Report
          |
          v
    Assessment Service
          |
          v
       Supabase
          |
          v
      PostgreSQL
          |
          v
    Medical History
```

### Architecture Components

**Frontend Layer**

Responsible for the user interface, form handling, navigation, symptom submission, and presentation of assessment results.

**Authentication Layer**

Supabase Authentication manages user registration, login, logout, and session restoration.

**Application Service Layer**

The assessment service handles communication between the frontend and Supabase for saving and retrieving assessment records.

**Database Layer**

PostgreSQL stores assessment records. Row Level Security policies restrict access to records according to the authenticated user.

---

## 6. Repository Structure

```text
E-Sanjeevani/
│
├── Architecture Document/
│   ├── US-01_Architecture_Document.docx
│   ├── US-02_Architecture_Document.docx
│   └── ...
│
├── Functional Document/
│   ├── US-01_Functional_Document.docx
│   ├── US-02_Functional_Document.docx
│   └── ...
│
├── Test Cases/
│   ├── E_Sanjeevani_US01_Registration_Authentication_50_Test_Cases.xlsx
│   ├── E_Sanjeevani_US02_Guest_Access_50_Test_Cases.xlsx
│   └── ...
│
├── src/
│   ├── auth/
│   │   ├── AuthContext.ts
│   │   └── AuthProvider.tsx
│   │
│   ├── components/
│   │   └── layout/
│   │       ├── Footer.tsx
│   │       └── Navbar.tsx
│   │
│   ├── data/
│   │   └── diseases.ts
│   │
│   ├── lib/
│   │   └── supabase.ts
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── SymptomChecker.tsx
│   │   ├── Report.tsx
│   │   ├── MedicalHistory.tsx
│   │   └── PlaceholderPage.tsx
│   │
│   ├── services/
│   │   └── assessments.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   └── diagnosis.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── supabase/
│   ├── migrations/
│   │   └── 20261024000100_create_assessments.sql
│   └── README.md
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 7. Prerequisites

Install the following before running the project:

| Requirement | Purpose |
|---|---|
| Node.js (LTS) | JavaScript runtime |
| npm | Dependency management |
| Git | Version control |
| Visual Studio Code | Recommended code editor |
| Supabase account | Authentication and database services |
| Modern web browser | Running the application |

Verify the installations:

```powershell
node --version
npm --version
git --version
```

---

## 8. Installation and Setup

### Step 1: Clone the repository

```powershell
git clone https://github.com/rishi-0108/esanjeevani.git
```

### Step 2: Navigate to the project directory

```powershell
cd esanjeevani
```

### Step 3: Install dependencies

```powershell
npm ci
```

`npm ci` installs the exact dependency versions recorded in `package-lock.json`.

### Step 4: Create the environment file

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### Step 5: Configure environment variables

Open `.env` in your editor and add your Supabase project credentials.

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

Replace the placeholder values with the credentials from your Supabase project.

**Important:** Do not commit `.env` to GitHub.

---

## 9. Environment Configuration

The application uses the following environment variables:

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key used by the frontend client |

### Where to find these values

1. Open your Supabase dashboard.
2. Select your project.
3. Navigate to the project's API settings.
4. Copy the Project URL.
5. Copy the publishable key.
6. Add both values to your local `.env` file.

The `.env.example` file provides the expected variable names and placeholder values.

---

## 10. Supabase Configuration

E-Sanjeevani uses Supabase for authentication and persistent storage of assessment reports.

### Step 1: Create a Supabase project

1. Visit https://supabase.com/
2. Sign in or create an account.
3. Create a new project.
4. Configure the database password and region.
5. Wait for the project to finish provisioning.

### Step 2: Configure Authentication

1. Open the Supabase dashboard.
2. Navigate to Authentication.
3. Open the available sign-in providers.
4. Enable the Email provider.
5. Configure any required email confirmation settings for your environment.

### Step 3: Create the database table

The project includes a SQL migration:

```text
supabase/migrations/20261024000100_create_assessments.sql
```

To apply it:

1. Open the Supabase dashboard.
2. Select SQL Editor.
3. Open the migration file from your local project.
4. Copy its SQL contents.
5. Paste the SQL into the Supabase SQL Editor.
6. Execute the migration.
7. Verify that the `assessments` table and its policies have been created.

### Step 4: Verify Row Level Security

The migration defines the assessment table and its associated security policies.

The intended access model is:

- Authenticated users can save their own assessments.
- Users can retrieve their own assessment records.
- Users must not be able to access another user's assessment records.
- Database access is enforced through Row Level Security policies.

Do not disable RLS to work around permission errors.

---

## 11. Running the Application

After installing dependencies and configuring the environment variables, start the development server:

```powershell
npm run dev
```

Vite will display a local development URL, usually:

```text
http://localhost:5173/
```

Open the displayed URL in your browser.

### Production build

To generate an optimized production build:

```powershell
npm run build
```

The generated files are placed in:

```text
dist/
```

### Preview the production build locally

```powershell
npm run preview
```

---

## 12. Available Commands

Run these commands from the project root directory.

| Command | Description |
|---|---|
| `npm ci` | Install dependencies from the lockfile |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript types |

### Recommended verification before deployment

Run:

```powershell
npm run lint
npm run typecheck
npm run build
```

All three commands should complete successfully before deployment.

---

## 13. Application Workflow

The general user workflow is:

```text
Open Application
       |
       v
    Home Page
       |
       v
Choose Assessment Workflow
       |
       v
Enter Patient Information
       |
       v
Select / Submit Symptoms
       |
       v
Process Symptom Information
       |
       v
Display Prediction Results
       |
       v
View Health Assessment Report
       |
       v
Save Report (Authenticated User)
       |
       v
Access Medical History
```

### Authentication workflow

```text
User
 |
 +---- Register ----> Supabase Authentication
 |
 +---- Login -------> Session Created
 |
 +---- Logout ------> Session Cleared
 |
 +---- Restore Session on Application Reload
```

Guest and authenticated workflows may differ depending on the feature being accessed.

---

## 14. Database Design

The project uses Supabase PostgreSQL for storing assessment records.

### Assessments Table

The migration creates the following logical data structure:

| Field | Purpose |
|---|---|
| `id` | Unique assessment record identifier |
| `user_id` | Reference to the authenticated user |
| `DiagnosisReport` | JSONB data containing the assessment report |

The `user_id` field references Supabase Authentication users.

The report is stored as JSONB so that structured assessment information can be persisted as a JSON object.

**Note:** Refer to the SQL migration for the exact column definitions, defaults, constraints, indexes, and RLS policies.

### Data Flow

1. A user completes an assessment.
2. The application generates the assessment report.
3. If the user is authenticated, the assessment service submits the report to Supabase.
4. Supabase stores the report in the `assessments` table.
5. The medical history page retrieves the user's saved assessments.
6. The application displays the records in newest-first order.

---

## 15. Documentation and Test Cases

The repository contains supporting project documentation.

### Architecture Documents

Location:

```text
Architecture Document/
```

Contains architecture documentation for the project's ten user stories.

### Functional Documents

Location:

```text
Functional Document/
```

Contains functional documentation for the ten user stories.

### Test Case Workbooks

Location:

```text
Test Cases/
```

Contains Excel workbooks with 50 test cases for each of the ten user stories:

1. Registration and Authentication
2. Guest Access
3. Patient Information
4. Symptom Checker
5. AI Disease Prediction
6. Urgency Classification and Recommendations
7. Health Assessment Report
8. Save Assessment Reports
9. Medical History and Reopen Reports
10. Privacy and Secure Access

These workbooks provide the test scenarios and expected results for the respective functional areas.

---

## 16. Deployment

The frontend can be deployed using Vercel or another platform that supports Vite applications.

### Vercel Deployment

1. Push the project to GitHub.
2. Sign in to https://vercel.com/
3. Import the `esanjeevani` GitHub repository.
4. Configure the project using the Vite framework preset.
5. Set the environment variables in the Vercel project settings:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

6. Deploy the project.
7. Verify the deployed application.
8. Check registration, login, symptom assessment, report generation, and medical history functionality.

For subsequent deployments, push changes to the configured GitHub branch.

---

## 17. Troubleshooting

### Problem: Dependencies fail to install

Try:

```powershell
npm install
```

If the lockfile is valid, prefer `npm ci` for a clean installation.

### Problem: Supabase connection fails

Check:

- The Supabase project URL is correct.
- The publishable key is correct.
- The `.env` file is present in the project root.
- The variable names match `.env.example`.
- The development server was restarted after changing environment variables.

### Problem: Authentication is not working

Check:

- Email authentication is enabled in Supabase.
- The Supabase project is active.
- Email confirmation settings are configured as intended.
- Browser console and Supabase authentication logs for errors.

### Problem: Assessment reports are not being saved

Check:

- The database migration has been executed.
- The `assessments` table exists.
- The user is authenticated.
- The `user_id` and report payload match the database schema.
- The RLS policies permit the intended operation.

### Problem: Build fails

Run:

```powershell
npm run typecheck
npm run lint
```

Review the errors and fix them before running:

```powershell
npm run build
```

---

## 18. Security Considerations

- Never commit `.env` or other files containing private credentials.
- Use `.env.example` to document the required environment variables.
- Keep Supabase Row Level Security enabled.
- Restrict assessment records to their respective authenticated users.
- Never expose Supabase service-role keys in frontend code.
- Validate user input before processing or storing it.
- Avoid storing unnecessary personal or sensitive health information.
- Use HTTPS for deployed environments.
- Do not treat client-side access checks as a replacement for database-level authorization.

---

## 19. Limitations

- The platform is an academic prototype, not a certified medical diagnostic system.
- Prediction accuracy depends on the implemented diagnosis logic and the quality of submitted information.
- Results should not be used as the sole basis for medical decisions.
- The application does not replace consultation with a qualified healthcare professional.
- The availability of persistent assessment history depends on Supabase configuration and authentication.

---

## 20. Future Scope

Potential improvements include:

- Integration of clinically validated machine-learning models.
- Expansion of the disease and symptom database.
- Improved prediction explainability.
- Integration with healthcare professionals and teleconsultation services.
- Multilingual support.
- Additional patient dashboards and analytics.
- Improved accessibility and mobile responsiveness.
- More comprehensive automated testing.
- Enhanced privacy and healthcare data management.

---

## Repository

**GitHub:** https://github.com/rishi-0108/esanjeevani

**Live Application:** https://esanjeevani-smoky.vercel.app/

---

## License

This project is developed for academic and educational purposes. Add an explicit open-source license before permitting reuse, modification, or redistribution.

---

**E-Sanjeevani — AI-Powered Disease Prediction & Healthcare Assistance Platform**
