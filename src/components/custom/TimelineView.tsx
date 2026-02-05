import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { Calendar } from 'lucide-react';

export const TimelineView = () => {
    const { tasks } = useProjectStore();

    // Sort tasks by start date or fallback
    const sortedTasks = [...tasks].sort((a, b) => {
        return (a.startDate || '').localeCompare(b.startDate || '');
    });

    const today = new Date();
    // Generate next 14 days
    const days = Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(today.getDate() + i);
        return d;
    });

    return (
        <div className="p-6 overflow-hidden flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Calendar className="w-6 h-6" /> Timeline
                    </h2>
                    <p className="text-gray-500">Project schedule for next 2 weeks</p>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto border border-gray-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900 flex flex-col">
                {/* Header Row */}
                <div className="flex border-b border-gray-200 dark:border-neutral-700">
                    <div className="w-64 p-4 border-r border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-950 font-semibold text-sm text-gray-600 sticky left-0 z-10 shrink-0">
                        Task Name
                    </div>
                    <div className="flex-1 flex min-w-max">
                        {days.map(date => (
                            <div key={date.toISOString()} className="w-24 p-2 border-r border-gray-100 dark:border-neutral-800 text-center">
                                <div className="text-xs text-gray-400 font-medium uppercase">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                <div className="text-sm font-bold text-gray-700 dark:text-gray-300">{date.getDate()}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Task Rows */}
                <div className="overflow-y-auto flex-1">
                    {sortedTasks.map(task => (
                        <div key={task.id} className="flex border-b border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors">
                            <div className="w-64 p-3 border-r border-gray-200 dark:border-neutral-700 sticky left-0 bg-white dark:bg-neutral-900 z-10 shrink-0 flex items-center">
                                <span className="text-sm font-medium truncate">{task.title}</span>
                            </div>
                            <div className="flex-1 flex min-w-max relative py-2">
                                {/* Grid lines background */}
                                {days.map(date => (
                                    <div key={date.toISOString()} className="w-24 border-r border-gray-50 dark:border-neutral-800/50 h-full absolute top-0"
                                        style={{ left: (days.indexOf(date) * 6) + 'rem' }} />
                                ))}

                                {/* Task Bar (Mock positioning for demo) */}
                                <div className="absolute h-8 rounded-md bg-blue-500/90 shadow text-xs text-blue-50 flex items-center px-2 truncate cursor-pointer hover:bg-blue-600 transition-colors"
                                    style={{
                                        // Randomizing length/pos for demo if no dates, or parsing real dates
                                        left: '2rem',
                                        width: '12rem',
                                        top: '0.5rem'
                                    }}>
                                    {task.title}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Empty State filler */}
                    {sortedTasks.length === 0 && (
                        <div className="p-10 text-center text-gray-400 italic">
                            No active tasks to display on timeline.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
