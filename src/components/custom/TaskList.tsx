import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';

export const TaskList = () => {
    const { tasks } = useProjectStore();

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
            case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
            default: return <Circle className="w-4 h-4 text-green-500" />;
        }
    };

    const statusColor = (status: string) => {
        switch (status) {
            case 'done': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Tasks ({tasks.length})</h2>
            </div>

            <div className="space-y-2">
                {tasks.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 border-2 border-dashed rounded-lg">
                        No tasks yet. Ask AI to &quot;Create a task list&quot;.
                    </div>
                ) : tasks.map((task) => (
                    <div
                        key={task.id}
                        className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow"
                    >
                        <div className="flex-shrink-0">
                            {task.status === 'done' ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                            ) : (
                                <Circle className="w-6 h-6 text-gray-400" />
                            )}
                        </div>

                        <div className="flex-grow min-w-0">
                            <h3 className={`font-medium truncate ${task.status === 'done' ? 'line-through text-gray-400' : ''}`}>
                                {task.title}
                            </h3>
                            <div className="flex gap-2 text-sm text-gray-500 items-center mt-1">
                                {task.assignee && (
                                    <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">
                                        {task.assignee}
                                    </span>
                                )}
                                <span>{getPriorityIcon(task.priority)}</span>
                                <span className="capitalize">{task.priority} Priority</span>
                            </div>
                        </div>

                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(task.status)}`}>
                            {task.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
