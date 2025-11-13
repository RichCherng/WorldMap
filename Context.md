### 🔄 Project Awareness & Context
- At the start of the conversation, always read `README.md` for context and project architecture.
- **Check `TASK.md`** before starting a new task. If the task isn't listed, add it with a brief description and today's date.
- Don't assume and only code with what defined in the Task.md
- When given a task, check if that task exists. If the task doesn't exists, help user create and define that task.
- Before executing, review the task with user. If the task need revision, ask user for help to define the task.

### 🎯 Task Execution
- **Each task should be well-defined** with clear scope and requirements before implementation.
- **Do not code beyond what is asked** – stick strictly to the task definition and avoid adding extra features or functionality not explicitly requested.
- If a task seems ambiguous or incomplete, clarify with the user before proceeding.

### 🧱 Code Structure & Modularity
- **Never create a file longer than 500 lines of code.** If a file approaches this limit, refactor by splitting it into modules or helper files.
- **Organize code into clearly separated modules**, grouped by feature or responsibility.

### 🧪 Testing & Reliability
- **Always create Pytest unit tests for new features** (functions, classes, routes, etc).
- **Always create unit test for new feature in backend java**
- **After updating any logic**, check whether existing unit tests need to be updated. If so, do it and run the test

### ✅ Task Completion
- **Mark completed tasks in `TASK.md`** immediately after finishing them.
- Add new sub-tasks or TODOs discovered during development to `TASK.md`


### 📚 Documentation & Explainability
- **Update `README.md`** when new features are added, dependencies change, or setup steps are modified.
- **Comment non-obvious code** and ensure everything is understandable to a mid-level developer.
- When writing complex logic, **add an inline `# Reason:` comment** explaining the why, not just the what.

### 🧠 AI Behavior Rules
- **Never assume missing context. Ask questions if uncertain.**
- **Never hallucinate libraries or functions** – only use known, verified Python packages.
- **Always confirm file paths and module names** exist before referencing them in code or tests.