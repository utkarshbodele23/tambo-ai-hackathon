## Project Name

**Tambo WorkOS (Powered by Tambo UI)**

---

## 1. What this project is

This project is an AI-powered Task & Project Management dashboard that uses **Generative UI** to dynamically create, adapt, and transform the user interface based on natural language input. Instead of users manually configuring views (lists, boards, timelines), the AI interprets intent and automatically chooses the most appropriate UI components using **Tambo UI**. The application maintains project state across multiple interactions, enabling users to iteratively refine tasks, sprints, and visualizations through conversation.

---

## 2. The core problem it solves

Traditional project management tools:
- Force users into fixed UI patterns
- Require manual configuration (filters, views, boards)
- Do not adapt to changing intent mid-conversation

This project demonstrates how **Generative UI** can:

- Remove UI decision fatigue
- Adapt interfaces in real time
- Provide context-aware visualizations without manual setup

---

## 3. Why this is a Generative UI project

This project is **not** a chatbot with UI output.

It is a **stateful Generative UI system** where:

- The AI chooses *which UI components to render*
- The AI decides *how data should be visualized*
- The UI evolves across multiple turns
- The same data can appear in different UI forms without reloading or reconfiguration

---

## 4. Example user flows 

### Flow 1: Project creation

User:

> “Create a task list for my startup launch”
> 

AI:

- Creates tasks
- Displays them as a **TaskList component**

---

### Flow 2: View transformation

User:

> “Group these tasks into sprints”
> 

AI:

- Keeps the same tasks
- Introduces sprint structure
- Switches UI to **SprintBoard**

---

### Flow 3: Visualization change

User:

> “Show this as a timeline”
> 

AI:

- Preserves state
- Renders **TimelineView**
- Uses deadlines if available

---

### Flow 4: Iterative refinement

User:

> “Add deadlines and show workload for next week”
> 

AI:

- Updates task metadata
- Renders chart or timeline
- No hardcoded navigation

---

## 5. Project State 

The application maintains a persistent **ProjectState** that survives across conversation turns.

### Conceptual shape:

```
ProjectState
- tasks
- sprints
- viewMode
- metadata (dates, priority, ownership)

```

Key principle:

- UI is derived from state
- State is updated through natural language
- No UI logic is hardcoded

---

## 6. UI Components 

### Existing Tambo components (used dynamically)

- Cards
- Lists / Tables
- Charts
- Sections / Panels
- Buttons & Actions

---

### Custom components 

### 1. TaskList

Purpose:

- Display tasks as checklist or grouped list
- Supports completion state

### 2. SprintBoard

Purpose:

- Visualize tasks grouped by sprint or status
- Kanban-style layout

### 3. TimelineView

Purpose:

- Visualize tasks across time
- Simple Gantt-style representation

### 4. ProjectSummaryPanel

Purpose:

- Show current project context
- Number of tasks, sprints, active view

### 5. StateInspector 

Purpose:

- Display current ProjectState for transparency
- Helps judges understand system behavior

---

## 7. Use of MCP (Model Context Protocol)

MCP is used to:

- Define available UI components
- Enforce valid component usage
- Maintain consistency across multi-turn conversations
- Prevent hallucinated components or layouts

MCP ensures:

- The AI respects UI contracts
- State changes are intentional
- UI decisions remain predictable and debuggable

---

## 8. What is intentionally NOT included

To keep the project focused and hackathon-friendly, the following are excluded:

- User authentication
- Persistent databases
- Real backend APIs
- Paid services

All data is in-memory and focused on **demonstrating Generative UI**, not production infrastructure.

---

## 9. Technology stack 

- Tambo UI
- Tambo MCP
- Analytics Template (base)
- React + TypeScript
- AI-assisted development (Google Anti-Gravity + Charlie)

---

## 10. Success criteria 

The project is successful if:

- The UI changes dynamically based on user intent
- State persists across multiple prompts
- Multiple Tambo components are used meaningfully
- Custom components are registered and used
- The experience feels adaptive, not scripted

---

## 11. Demo mode 

The application includes:

- Suggested prompts
- Reset project option
- Predefined demo flows for quick evaluation

---

### End of spec