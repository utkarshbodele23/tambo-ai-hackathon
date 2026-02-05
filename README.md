# Tambo WorkOS – Generative UI Project Management Dashboard

**Tambo WorkOS** is a next-generation project management dashboard where the user interface *is* the AI's response. Instead of manually navigating menus or configuring views, you simply tell the system what you want, and it dynamically builds the interface to match your intent.

---

## 1. Project Overview

This project demonstrates **Generative UI**: the concept that an AI shouldn't just talk about work, instead it should *do* the work by selecting and configuring the right interface tools for the job.

In Tambo WorkOS, the AI is not a chatbot that outputs text. It acts as an **Interface Controller**. It listens to your intent (e.g., "Plan a sprint") and responds by:
1.  Updating the project state.
2.  Selecting the best UI component to visualize that state (List, Board, Timeline, or Analysis).

**The AI controls the pixels, not just the chat bubbles.**

---

## 2. Why This Project?

Traditional project management tools force you to do the "heavy lifting":
*   You have to find the "Create Task" button.
*   You have to configure the columns on a Kanban board.
*   You have to switch context to see a timeline.

**Tambo WorkOS solves this by making the UI adaptive.**
*   **Problem**: "I'm overwhelmed by buttons and menus."
*   **Solution**: Just say "Show me a timeline of high-priority tasks," and the AI renders exactly that view—instantly.

---

## 3. Key Features

*   **⚡ AI-Orchestrated Management**: Create tasks, plans, and schedules using natural language.
*   **🎨 Dynamic UI Switching**: seamless transitions between **Task Lists**, **Kanban Boards**, **Timelines**, and **Insights Panels** based on context.
*   **🔗 MCP-Powered Insights**: Uses the **Model Context Protocol (MCP)** to fetch and visualize real-time project analytics.

---

## 4. How Generative UI Works

The system follows a simple loop:

1.  **Input**: You type a prompt (e.g., *"Group these tasks into Sprint 1"*).
2.  **Intent Recognition**: The AI interprets this as a `GROUP_TASKS` intent.
3.  **State Mutation**: The application state updates (tasks are modified, sprint is created).
4.  **UI Reconfiguration**: The AI decides that `SprintBoard` is the best component for this new state and renders it immediately.

You don't "navigate" to the Sprint Board; the AI brings the Sprint Board to *you*.

---

## 5. Model Context Protocol (MCP) Usage

This project uses the **Model Context Protocol (MCP)** to give the AI structured access to application data in a safe, standardized way.

*   **What is MCP?**: It's an open standard that lets AI models "connect" to data sources and tools.
*   **How its used in this project**: By implementing an MCP Tool called `getProjectStats`.
*   **The Workflow**:
    1.  User asks for "Project Insights".
    2.  The AI calls the `getProjectStats` tool.
    3.  The tool calculates metrics (Velocity, Completion Rate, etc.) from the state.
    4.  The system renders a **ProjectInsightsPanel** to visualize the returned data.

*Note: This implementation uses the MCP SDK client-side for demonstration purposes, running entirely in your browser.*

---

## 6. Architecture Overview

*   **Frontend**: React (Next.js) + Tambo UI components.
*   **State Management**: **Zustand** acts as the single source of truth for all project data.
*   **Mock AI Engine**: A heuristic-based controller that ensures demo inputs work perfectly every time.
*   **MCP Integration**: Leveraging `@modelcontextprotocol/sdk` for clean tool definitions.

---

## 7. Demo Flows

Try these prompts to see the Generative UI in action:

1.  **"Create a task list for my startup launch"**
    *   *Result*: Initializes a new project with sample tasks and shows the **List View**.

2.  **"Group these into Sprint 1 and show board"**
    *   *Result*: Organizes tasks into a sprint column and switches to the **Kanban Board**.

3.  **"Show timeline"**
    *   *Result*: Visualizes your schedule on a **Timeline Gantt View**.

4.  **"Show project insights"** (or click the ✨ button)
    *   *Result*: Calls the **MCP Tool** to analyze your progress and displays the **Insights Dashboard**.

---

## 8. How to Run Locally

### Prerequisites
*   Node.js (v18+ recommended)
*   npm

### Steps
1.  **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd tambo-ai-hackathon
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open your browser**:
    Navigate to [http://localhost:3000](http://localhost:3000)

---

## 9. Hackathon Notes

*   **Why Mock AI?**: To guarantee a flawless presentation during the hackathon judging, I used a deterministic "Mock AI" engine. This ensures the UI responds instantly and accurately without API latency or hallucinations.
*   **No Paid APIs**: The project is self-contained and free to run.
*   **In-Memory Data**: Refreshing the page will reset the project state (StateInspector is available in code but hidden for simplicity).

---

## 10. Future Enhancements

*   **Real LLM Integration**: Connect to Gemini/Claude/OpenAI for non-deterministic prompts.
*   **Persistent Storage**: Save projects to a database.
*   **More MCP Tools**: Add tools for calendar integration, GitHub issue syncing, and slack notifications.

---

*Built with ❤️ for the The UI Strikes Back Hackathon.*
