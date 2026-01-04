MeetAI — AI-Powered Meeting Understanding Platform

MeetAI is a full-stack AI application that processes meeting recordings asynchronously, generates transcripts, and allows users to interact with an AI agent grounded on the meeting content.

The project focuses on real-world engineering problems such as background job processing, UI synchronization, authentication, and persistent AI context — not just AI demos.

🚀 What Problem Does This Solve?

Meetings often contain valuable decisions and context that are lost after the call ends.

MeetAI helps users:

Transcribe meeting recordings reliably

View transcripts and summaries once processing completes

Ask AI questions grounded strictly in the meeting transcript

Track action items extracted from meetings

Unlike simple AI demos, MeetAI handles long-running tasks and async state coordination correctly.

🧠 Key Features

Async Audio Transcription

Audio uploads are processed in the background

Python-based transcription (faster-whisper)

Clear meeting status lifecycle:
new → uploaded → transcribing → done

Grounded AI Agent

AI answers are strictly grounded on transcript content

Prevents hallucination

Chat history is persisted per meeting

Live UI Synchronization

UI automatically refreshes while transcription is running

Transcript appears once background processing completes

Authentication & Authorization

Secure user sessions

Users can only access their own meetings

Action Items

AI-generated and manually created action items

Completion tracking

🏗 Architecture Overview
Frontend

Next.js 15 (App Router)

Server Components + Server Actions

Tailwind CSS + shadcn/ui

Backend

Server Actions for mutations

Background job queue (single-run per meeting)

PostgreSQL with Drizzle ORM

AI & Transcription

Python transcription worker (faster-whisper)

AI chat using transcript-grounded prompts

Persistent chat memory per meeting

🔄 Async Processing Flow

User uploads meeting audio

Meeting status updates to uploaded

Background transcription job starts

Status changes to transcribing

Transcript is saved to database

Status updates to done

UI refreshes and displays transcript automatically

This avoids blocking requests and ensures reliability for long-running jobs.

⚠️ Known Limitations

Auto-refresh may briefly continue if transcription is triggered multiple times rapidly

Manual page refresh always resolves UI state

Real-time streaming transcription is intentionally out of scope for this version

These tradeoffs were made to keep async logic explicit and understandable.

🧪 Local Development
npm install
npm run dev


App runs at:
http://localhost:3000

Environment variables are required for:

Database connection

Authentication

AI provider keys

🎯 Why This Project Exists

This project was built to explore:

Async system design in modern Next.js

Coordinating background jobs with UI state

Grounded AI usage in production-like systems

Tradeoffs between complexity and reliability

It is intentionally engineering-focused, not a polished SaaS product.

🔮 Possible Future Improvements

Shared meeting access (collaborators)

AI usage limits and model routing

Analytics dashboard

Streaming transcription

Team-level features

📌 Summary

MeetAI is not just a transcription demo — it is a practical example of how to build reliable, async AI systems using modern web architecture.
