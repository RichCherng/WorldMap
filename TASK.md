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

### Cloud Functions Migration
**Status:** ❌ Not Started  
**Description:** Migrate Java gRPC backend to serverless Google Cloud Functions for improved scalability, reduced costs, and simplified deployment.  
**Feature Branch:** `cloud-functions`  
**Architecture:** Frontend → Cloud Functions (HTTP/HTTPS) → Firestore  
**Benefits:** Zero server management, auto-scaling, pay-per-use pricing (~$0.40/million requests, 2M free/month)  
**Applies To:** All flashcard languages (Chinese, French, future languages)  
**Details:** See [tasks/CLOUD_FUNCTIONS_MIGRATION_TASK.md](tasks/CLOUD_FUNCTIONS_MIGRATION_TASK.md)

---

## Task Management Guidelines

- Check this file for high-level task overview
- Navigate to specific task files in `tasks/` folder for detailed subtasks and requirements
- **Update task status in both TASK.md and specific task files to keep them in sync**
- Create new task files in `tasks/` folder for major features
- When a task file is updated, review and update TASK.md accordingly
- Use consistent status markers: ❌ Not Started | 🔄 In Progress | ✅ Completed
