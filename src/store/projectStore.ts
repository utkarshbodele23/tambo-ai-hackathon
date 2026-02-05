import { create } from 'zustand';
// Simple ID generator to avoid npm dependency issues in environment
const generateId = () => Math.random().toString(36).substring(2, 9);

// --- Types ---

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    startDate?: string;
    endDate?: string;
    assignee?: string;
}

export interface Sprint {
    id: string;
    name: string;
    taskIds: string[];
    startDate: string;
    endDate: string;
    status: 'active' | 'future' | 'completed';
}


export type ViewMode = 'list' | 'board' | 'timeline' | 'insights';

export interface ProjectInsights {
    totalTasks: number;
    completedTasks: number;
    highPriorityTasks: number;
    sprintCount: number;
    tasksPerSprint: number;
    generatedAt: string;
}


export interface ProjectMetadata {
    projectName: string;
    description: string;
    createdAt: string;
}

export interface ProjectState {
    tasks: Task[];
    sprints: Sprint[];
    viewMode: ViewMode;
    metadata: ProjectMetadata;
    insights?: ProjectInsights;

    // Actions
    setProjectName: (name: string) => void;
    setViewMode: (mode: ViewMode) => void;
    setInsights: (insights: ProjectInsights) => void;

    addTask: (task: Omit<Task, 'id'>) => string;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;

    addSprint: (sprint: Omit<Sprint, 'id'>) => string;
    addTaskToSprint: (sprintId: string, taskId: string) => void;

    resetProject: () => void;
}

// --- Initial State ---

const INITIAL_METADATA: ProjectMetadata = {
    projectName: 'New Project',
    description: 'AI Generated Project',
    // Fixed timestamp for initial SSR consistency
    createdAt: '2024-01-01T00:00:00.000Z',
};

const INITIAL_TASKS: Task[] = [];
const INITIAL_SPRINTS: Sprint[] = [];

// --- Store ---

export const useProjectStore = create<ProjectState>((set) => ({
    tasks: INITIAL_TASKS,
    sprints: INITIAL_SPRINTS,
    viewMode: 'list',
    metadata: INITIAL_METADATA,

    setProjectName: (name) =>
        set((state) => ({ metadata: { ...state.metadata, projectName: name } })),

    setViewMode: (mode) => set({ viewMode: mode }),
    setInsights: (insights) => set({ insights }),

    addTask: (task) => {
        const id = generateId();
        set((state) => ({
            tasks: [...state.tasks, { ...task, id }],
        }));
        return id;
    },

    updateTask: (id, updates) =>
        set((state) => ({
            tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),

    deleteTask: (id) =>
        set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== id),
            // Also remove from sprints
            sprints: state.sprints.map(s => ({
                ...s,
                taskIds: s.taskIds.filter(tid => tid !== id)
            }))
        })),

    addSprint: (sprint) => {
        const id = generateId();
        set((state) => ({
            sprints: [...state.sprints, { ...sprint, id }],
        }));
        return id;
    },

    addTaskToSprint: (sprintId, taskId) =>
        set((state) => ({
            sprints: state.sprints.map((s) =>
                s.id === sprintId && !s.taskIds.includes(taskId)
                    ? { ...s, taskIds: [...s.taskIds, taskId] }
                    : s
            ),
        })),

    resetProject: () =>
        set({
            tasks: [],
            sprints: [],
            viewMode: 'list',
            metadata: { ...INITIAL_METADATA, createdAt: new Date().toISOString() },
        }),
}));
