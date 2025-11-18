# Project Tasks

**Description:** Overview of all tasks and features being developed for the WorldMap project.

**Main Branch:** `main`

**Date Started:** November 13, 2025

**Status Legend:** ❌ Not Started | 🔄 In Progress | ✅ Completed

---

## Active Tasks

### Chinese Flash Card Feature
**Status:** 🔄 In Progress  
**Description:** Building a Chinese Flash Card learning feature with full-stack implementation including backend APIs, Firebase integration, frontend UI, and comprehensive testing using gRPC and Protocol Buffers.  
**Feature Branch:** `FlashCard`  
**Language:** Chinese (Mandarin)  
**Progress:** Backend API ✅ Complete | Frontend Integration ✅ Complete | Testing ❌ Pending  
**Details:** See [tasks/CHINESE_FLASHCARD_TASK.md](tasks/CHINESE_FLASHCARD_TASK.md)

### French Flash Card Feature
**Status:** ❌ Not Started  
**Description:** Building a French Flash Card learning feature with full-stack implementation including backend APIs, Firebase integration, frontend UI, and comprehensive testing using gRPC and Protocol Buffers.  
**Feature Branch:** `FlashCard`  
**Language:** French  
**Dependencies:** Uses same infrastructure as Chinese flashcards (GrpcServer, FirestoreService, UI components)  
**Details:** See [tasks/FRENCH_FLASHCARD_TASK.md](tasks/FRENCH_FLASHCARD_TASK.md)

### Backend Java Setup
**Status:** ✅ Completed  
**Description:** Overhaul Java backend setup with modern architecture, dependency injection (Google Guice), service patterns, and scalable structure.  
**Details:** See [tasks/BACKEND_SETUP_TASK.md](tasks/BACKEND_SETUP_TASK.md)

### Firebase Direct Integration
**Status:** 🔄 In Progress
**Description:** Migrate flashcard features to communicate directly with Firebase/Firestore from the frontend, eliminating the backend server.
**Feature Branch:** `Migration_Firebase`
**Architecture:** Frontend → Firebase SDK → Firestore
**Benefits:** No backend to maintain, real-time updates, offline support, lowest cost (~$0-15/month), simplified development
**Progress:** Chinese Flashcard Service ✅ Complete | Security Rules ✅ Complete
**Applies To:** All flashcard languages (Chinese, French, future languages)
**Details:** See [tasks/FIREBASE_DIRECT_INTEGRATION_TASK.md](tasks/FIREBASE_DIRECT_INTEGRATION_TASK.md)

### ChatGPT Flashcard Generation
**Status:** ❌ Not Started
**Description:** Integrate OpenAI ChatGPT API to auto-generate complete Chinese flashcard data from partial user inputs using Firebase Cloud Functions.
**Feature Branch:** `ChatGPT_Integration`
**Architecture:** Frontend → Cloud Function → OpenAI API → Firestore
**Benefits:** Enhanced UX, auto-complete missing fields, learning aid, validation, secure API key management
**Cost:** ~$1-15/month (includes OpenAI + Cloud Functions)
**Dependencies:** Firebase Cloud Functions, OpenAI API account
**Details:** See [tasks/CHATGPT_FLASHCARD_GENERATION_TASK.md](tasks/CHATGPT_FLASHCARD_GENERATION_TASK.md)

---

## Task Management Guidelines

- Check this file for high-level task overview
- Navigate to specific task files in `tasks/` folder for detailed subtasks and requirements
- **Update task status in both TASK.md and specific task files to keep them in sync**
- Create new task files in `tasks/` folder for major features
- When a task file is updated, review and update TASK.md accordingly
- Use consistent status markers: ❌ Not Started | 🔄 In Progress | ✅ Completed
