# Police Promotion Academy (পুলিশ প্রমোশন একাডেমি) — PRD

## Original Problem Statement
Phase 1 — UI/UX and project foundation for a Bengali, mobile-first police promotion
exam preparation app. Build frontend only (no payment, AI, auth backend or database).
27 screens, reusable components, 5-tab Bengali bottom navigation, dark-navy/professional-blue/
premium-gold design language with Noto Sans Bengali typography, realistic demo data, fully
responsive, every route working and TypeScript clean.

> Note: The user asked for Next.js + Tailwind. The Emergent platform builds & ships
> **Expo React Native** mobile apps (QR preview, iOS/Android builds, publish flow), so the
> app was built with Expo React Native + TypeScript and the theme-token system (same screens,
> navigation, design language and Bengali typography).

## Architecture
- **Frontend:** Expo (SDK 57) + Expo Router (file-based routing) + TypeScript
- **Theme:** dark-only token system in `src/theme.ts` (navy `#0F141C`, gold `#D4AF37`, blue `#3B82F6`)
- **Fonts:** Noto Sans Bengali (Regular/Medium/SemiBold/Bold) via expo-font
- **Icons:** `@react-native-vector-icons/material-design-icons`
- **Demo data:** `src/data/demo.ts` (subjects, MCQs, mock tests, notes, papers, notifications, plans)
- **Session hand-off:** `src/data/session.ts` (in-memory practice/mock-test results)
- **No backend used in Phase 1** (server.py untouched, boilerplate only)

## User Personas
- **Primary:** Serving police officers (SI, Sergeant, Inspector) preparing for promotion board exams
- **Secondary:** New recruits building subject foundations

## Core Requirements (static)
- Bengali-first UI, dark premium aesthetic, 44pt+ touch targets, 5 bottom tabs
- 27 screens covering learn → practice → test → review → analytics → premium → profile

## Implemented (2026-06-07)
### Reusable components (15)
Button, Card, Modal, Input, QuestionCard, OptionButton, ProgressBar, PremiumBadge,
Header, SubjectCard, TestCard, NoteCard, LoadingSkeleton, EmptyState — plus Icon, Screen, Toast.

### Screens (27) — all routes verified
Splash, Onboarding, Login, Registration, Home Dashboard, Subject List, Subject Details,
MCQ Practice, MCQ Result, Question Bank (tab), Mock Test List, Mock Test Instructions,
Mock Test Interface, Mock Test Result, Notes List (tab), Note Details, Previous Questions (tab),
AI Question Generator, AI Study Assistant, Bookmarks, Wrong Answers, Progress Analytics,
Premium, Subscription, Profile (tab), Settings, Notifications.

### Verified flows
- Splash → onboarding → login/register → home
- Full MCQ practice (instant feedback + explanation) → result with score gauge
- Full mock-test flow: instructions → agree → timer + question palette → submit confirm → scorecard
- Bank search + year chips + preview modal + bookmark; Notes categories + reader with font controls
- Analytics charts, Premium/Subscription, Settings logout, Notifications mark-all

## Backlog / Remaining
### P0 (next phase per user)
- Backend: FastAPI + MongoDB models for users, subjects, questions, attempts, bookmarks
- Real authentication (integration_expert — JWT or Emergent Google auth)
### P1
- Real MCQ/mock-test content seeded in DB; persist attempts, streaks, bookmarks, wrong-answers
- AI question generator + study assistant (LLM integration)
- Payments for premium (Stripe/bKash/Nagad)
### P2
- Offline caching, push notifications (on request), leaderboard

## Known minor items (non-blocking)
- Mock instructions show full test spec (100q/60m) while demo interface runs a 10-question subset
- RN-web console warnings for shadow* props / useNativeDriver (web-only, harmless)
