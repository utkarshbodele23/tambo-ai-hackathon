import { ProjectState } from '../store/projectStore';
import { executeGetProjectStats } from './mcpTools';

// We need a way to access the store outside of a React component
// or we can pass the store actions to this function. 
// For simplicity in a helper, let's accept the store state/actions as an argument.

export interface AIMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface AIResponse {
    message: string;
    suggestedView?: ProjectState['viewMode'];
    shouldUpdateState?: boolean;
}

/**
 * Heuristic-based "AI" that interprets prompts and manipulates the project state.
 */
export const processUserPrompt = (
    prompt: string,
    store: ProjectState
): AIResponse => {
    const p = prompt.toLowerCase();

    // --- Flow 1: Create Tasks / Project ---
    if (p.includes('create') && (p.includes('task') || p.includes('list'))) {
        if (store.tasks.length === 0) {
            // Demo Data: Startup Launch
            store.setProjectName("Startup Launch");

            store.addTask({
                title: "Finalize Pitch Deck",
                status: "in-progress",
                priority: "high",
                startDate: new Date().toISOString(),
                assignee: "Founder"
            });
            store.addTask({
                title: "Register Domain",
                status: "done",
                priority: "medium",
                assignee: "Tech Lead"
            });
            store.addTask({
                title: "Hire Developer",
                status: "todo",
                priority: "high",
                assignee: "HR"
            });
            store.addTask({
                title: "Design Logo",
                status: "todo",
                priority: "medium",
                assignee: "Designer"
            });

            store.setViewMode('list');

            return {
                message: "I've created a task list for your startup launch project. I've added some initial tasks like 'Finalize Pitch Deck' and 'Register Domain'.",
                suggestedView: 'list',
                shouldUpdateState: true
            };
        } else {
            // Generic add task logic constraint for demo
            store.addTask({
                title: "New Task from AI",
                status: "todo",
                priority: "medium"
            });
            return {
                message: "I've added a new task to your list.",
                shouldUpdateState: true
            };
        }
    }

    // --- Flow 2: Sprints (Board View) ---
    if (p.includes('sprint') || p.includes('board') || p.includes('agile')) {

        // If no sprints exist, create some
        if (store.sprints.length === 0) {
            const sprintId = store.addSprint({
                name: "Sprint 1: MVP",
                taskIds: [], // We will populate this
                startDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // +14 days
                status: 'active'
            });

            // Assign all current tasks to this sprint for the demo
            store.tasks.forEach(t => {
                store.addTaskToSprint(sprintId, t.id);
            });
        }

        store.setViewMode('board');

        return {
            message: "I've organized your tasks into Sprint 1 and switched to the Board view. You can now see the status of each item.",
            suggestedView: 'board',
            shouldUpdateState: true
        };
    }

    // --- Flow 3: Timeline ---
    if (p.includes('timeline') || p.includes('gantt') || p.includes('schedule')) {
        store.setViewMode('timeline');
        return {
            message: "Here is the timeline view of your project. This visualizes the start and end dates for your active tasks.",
            suggestedView: 'timeline',
            shouldUpdateState: true
        };
    }

    // --- Flow 4: Refinement / Priority ---
    if (p.includes('priority') || p.includes('important')) {
        // Mark all as high priority for demo effect
        store.tasks.forEach(t => {
            store.updateTask(t.id, { priority: 'high' });
        });

        return {
            message: "I've updated the priority of all tasks to High.",
            shouldUpdateState: true
        };
    }

    // --- Flow 5: MCP Tool - Project Insights ---
    if (p.includes('insight') || p.includes('stat') || p.includes('analytics')) {
        const result = executeGetProjectStats(store);

        // Store the structured data from the tool
        store.setInsights(result.data);
        store.setViewMode('insights');

        return {
            message: "I've analyzed your project state using the 'getProjectStats' MCP tool. Here are your key performance metrics.",
            suggestedView: 'insights',
            shouldUpdateState: true
        };
    }

    // --- Default Fallback ---
    return {
        message: "I'm not sure how to do that yet. Try asking me to 'Create a task list', 'Start a sprint', or 'Show timeline'.",
        shouldUpdateState: false
    };
};
