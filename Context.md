### 🔄 Project Awareness & Context
- At the start of the conversation, always read `README.md` for context and project architecture.
- **For detailed architecture context, refer to `tech_doc/` directory** – technical documentation provides in-depth information about feature architecture, data flow, and implementation details.
- **Check `TASK.md` or task files in `tasks/` directory** before starting a new task. If the task isn't listed, add it with a brief description and today's date.
- Don't assume and only code with what defined in the Task.md
- When given a task, check if that task exists. If the task doesn't exists, help user create and define that task.
- Before executing, review the task with user. If the task need revision, ask user for help to define the task.
- **When reviewing and revising the approach or task, always edit the task file with the new details** – ensure the task definition stays up-to-date with any changes in scope, requirements, or approach.
- **Keep TASK.md and task files synchronized:**
    - When updating a task file (e.g., `tasks/CHINESE_FLASHCARD_TASK.md`), also update the corresponding entry in `TASK.md`
    - When marking a task as complete in a task file, update the status in `TASK.md`
    - When creating a new task file, add a summary entry in `TASK.md`
    - TASK.md provides high-level overview; task files provide detailed subtasks


### 🎯 Task Execution
- **Always use a specific branch for each task** – if no branch is specified or doesn't exist, ask the user to specify a branch name before starting work. Never work directly on the main branch.
- **Each task should be well-defined** with clear scope and requirements before implementation.
- **Do not code beyond what is asked** – stick strictly to the task definition and avoid adding extra features or functionality not explicitly requested.
- If a task seems ambiguous or incomplete, clarify with the user before proceeding.
- **For complex tasks with multiple steps:**
    1. Define tasks and subtasks directly in the appropriate task file (e.g., `tasks/BACKEND_SETUP_TASK.md`)
    2. Use nested subtasks with checkboxes (❌/🔄/✅) to track progress
    3. Present the plan to the user for review before starting implementation
    4. Update task status as work progresses in the task file
    5. Do NOT use the `manage_todo_list` tool - all todos should be in task files

### 🧱 Code Structure & Modularity
- **Never create a file longer than 500 lines of code.** If a file approaches this limit, refactor by splitting it into modules or helper files.
- **Organize code into clearly separated modules**, grouped by feature or responsibility.

### 🧪 Testing & Reliability
- **Always create Pytest unit tests for new features** (functions, classes, routes, etc).
- **Always create unit test for new feature in backend java**
- **After updating any logic**, check whether existing unit tests need to be updated. If so, do it and run the test

### ✅ Task Completion
- **Mark completed tasks in `TASK.md` or task files** immediately after finishing them.
- Add new sub-tasks or TODOs discovered during development to the appropriate task file
- **Update task status (❌/🔄/✅)** in the task file as you work through subtasks
- When all subtasks are complete, update the main task status from ❌ to ✅


### 📚 Documentation & Explainability
- **Update `README.md`** when new features are added, dependencies change, or setup steps are modified.
- **Comment non-obvious code** and ensure everything is understandable to a mid-level developer.
- When writing complex logic, **add an inline `# Reason:` comment** explaining the why, not just the what.
- **Create and maintain technical documentation for each feature** in the `tech_doc/` folder:
    - Each feature should have its own technical document
    - Include architecture, data flow, API endpoints, and implementation details
    - Update technical docs when features are modified or extended
    - Reference relevant code files with file paths and line numbers
    - **Each task should have an associated technical documentation reference** – link to the corresponding tech doc in the task file

### 🧠 AI Behavior Rules
- **Never assume missing context. Ask questions if uncertain.**
- **Never hallucinate libraries or functions** – only use known, verified Python packages.
- **Always confirm file paths and module names** exist before referencing them in code or tests.