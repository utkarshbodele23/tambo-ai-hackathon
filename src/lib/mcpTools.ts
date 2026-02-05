import { Tool, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { ProjectState, ProjectInsights } from '../store/projectStore';

// --- MCP Tool Definition ---

export const getProjectStatsTool: Tool = {
    name: "getProjectStats",
    description: "Calculate aggregate analytics for the current project state, including completion rates and sprint velocity.",
    inputSchema: {
        type: "object",
        properties: {},
    },
};

// --- Tool Implementation ---

/**
 * Executes the getProjectStats tool against the provided state.
 * Returns a standard CallToolResult as per MCP spec.
 */
export const executeGetProjectStats = (state: ProjectState): CallToolResult & { data: ProjectInsights } => {
    const totalTasks = state.tasks.length;
    const completedTasks = state.tasks.filter(t => t.status === 'done').length;
    const highPriorityTasks = state.tasks.filter(t => t.priority === 'high').length;
    const sprintCount = state.sprints.length;

    // Calculate average tasks per sprint
    let tasksPerSprint = 0;
    if (sprintCount > 0) {
        const totalSprintTasks = state.sprints.reduce((acc, s) => acc + s.taskIds.length, 0);
        tasksPerSprint = Math.round((totalSprintTasks / sprintCount) * 10) / 10;
    }

    const insights: ProjectInsights = {
        totalTasks,
        completedTasks,
        highPriorityTasks,
        sprintCount,
        tasksPerSprint,
        generatedAt: new Date().toISOString()
    };

    // Return formatted result compliant with MCP
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(insights, null, 2)
            }
        ],
        // We attach the raw data for easier UI consumption in this demo app
        // In a strict MCP client/server split, we'd parse the 'content' text.
        data: insights
    };
};
