MeetAI — Async AI Meeting Intelligence Platform

MeetAI is a full-stack AI application that processes meeting recordings asynchronously, generates transcripts, and enables users to interact with an AI assistant grounded strictly in meeting content.

The project focuses on real-world engineering challenges such as background job processing, async UI coordination, authentication, and persistent AI context — not just AI demos.

🔍 Problem Statement

Meetings generate valuable information, but:

Context is easily lost

Action items are forgotten

Searching recordings is inefficient

MeetAI solves this by converting meeting audio into structured, queryable knowledge.

✨ Core Features
🎧 Async Transcription

Upload meeting audio

Background transcription using Python (faster-whisper)

Non-blocking processing with a clear lifecycle:

new → uploaded → transcribing → done

🤖 Transcript-Grounded AI Chat

Ask questions about the meeting

AI responses are strictly grounded in transcript content

Prevents hallucination

Chat history is persisted per meeting

🧠 AI Summary & Action Items

Automatic meeting summary after transcription

Action items stored and tracked

Completion state persisted in database

🔐 Authentication & Authorization

Secure user authentication

Meetings are private by default

Users can only access their own data

🔄 UI Synchronization

UI auto-refreshes while transcription is running

Transcript appears once background job completes

Manual refresh always resolves state

🏗 Architecture
Frontend

Next.js 15 (App Router)

Server Components & Server Actions

Tailwind CSS + shadcn/ui

Backend

PostgreSQL

Drizzle ORM

Server Actions for mutations

Single-run background job queue per meeting

AI & Processing

Python transcription worker (faster-whisper)

AI chat using transcript-scoped prompts

Persistent AI context per meeting

🔄 Async Processing Flow

User uploads meeting recording

Meeting status updates to uploaded

Background transcription job starts

Status changes to transcribing

Transcript saved to database

Status updates to done

UI refresh displays transcript automatically

This design avoids blocking requests and supports long-running tasks safely.

⚠️ Known Limitations

If transcription is triggered multiple times rapidly, UI auto-refresh may continue briefly

Manual refresh always resolves final state

Real-time streaming transcription is intentionally out of scope

These are known tradeoffs to keep async logic explicit and debuggable.

🧪 Local Development
npm install
npm run dev


App runs at:

http://localhost:3000


Environment variables are required for:

Database connection

Authentication secrets

AI provider keys

🎯 Engineering Focus

This project was built to explore:

Async system design in modern Next.js

Background job coordination

Database-driven UI state

Safe, grounded AI usage

Tradeoffs between reliability and complexity

It is intentionally engineering-focused, not a polished SaaS.

🚀 Future Improvements (Optional)

Team-based meeting sharing

AI usage limits & model routing

Analytics dashboard

Streaming transcription

Real-time collaboration

📌 Summary

MeetAI is not just a transcription demo — it is a practical example of how to build reliable, async AI systems using modern web architecture.