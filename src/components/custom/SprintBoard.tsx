import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { MoreHorizontal, Plus } from 'lucide-react';

export const SprintBoard = () => {
    const { tasks, sprints } = useProjectStore();

    // For demo simplicity, we just look at the active sprint or fallback to all tasks
    const activeSprint = sprints.find(s => s.status === 'active') || { name: 'Backlog', taskIds: [] as string[] };

    // Filter tasks that belong to this sprint or just all if no sprint logic fully wired for demo
    const sprintTasks = activeSprint.taskIds.length > 0
        ? tasks.filter(t => activeSprint.taskIds.includes(t.id))
        : tasks;

    const columns = [
        { id: 'todo', title: 'To Do', color: 'bg-gray-500' },
        { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500' },
        { id: 'done', title: 'Done', color: 'bg-green-500' }
    ];

    const getTasksByStatus = (status: string) => sprintTasks.filter(t => t.status === status);

    return (
        <div className="h-full w-full overflow-x-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">{activeSprint.name || 'Board'}</h2>
                    <p className="text-gray-500 text-sm">Sprint Goal: Deliver MVP features</p>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    <Plus size={16} /> Add Card
                </button>
            </div>

            <div className="flex gap-6 min-w-[1000px] h-[calc(100vh-200px)]">
                {columns.map(col => (
                    <div key={col.id} className="flex-1 bg-gray-50 dark:bg-neutral-900 rounded-xl p-4 flex flex-col gap-4 min-w-[300px]">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${col.color}`} />
                                <h3 className="font-semibold text-gray-700 dark:text-gray-200">{col.title}</h3>
                                <span className="text-xs text-gray-400 font-mono bg-white dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                                    {getTasksByStatus(col.id).length}
                                </span>
                            </div>
                            <MoreHorizontal size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3">
                            {getTasksByStatus(col.id).map(task => (
                                <div key={task.id} className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-md cursor-grab active:cursor-grabbing group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${task.priority === 'high' ? 'bg-red-100 text-red-600' :
                                            task.priority === 'medium' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                            }`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                    <h4 className="font-medium text-sm mb-2 text-gray-800 dark:text-gray-200">{task.title}</h4>
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                                        {task.assignee ? (
                                            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[10px] text-white font-bold" title={task.assignee}>
                                                {task.assignee.substring(0, 2)}
                                            </div>
                                        ) : <div />}
                                        <span className="text-xs text-gray-400">#{task.id.substring(0, 4)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
