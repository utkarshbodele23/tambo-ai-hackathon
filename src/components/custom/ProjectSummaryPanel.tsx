import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { BarChart3, CheckSquare, Users } from 'lucide-react';

export const ProjectSummaryPanel = () => {
    const { metadata, tasks, sprints } = useProjectStore();

    const completed = tasks.filter(t => t.status === 'done').length;
    const progress = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

    return (
        <div className="w-full bg-indigo-900 text-white rounded-xl p-6 shadow-lg mb-8">
            <h1 className="text-3xl font-bold mb-2">{metadata.projectName}</h1>
            <p className="text-indigo-200 mb-6 max-w-2xl">{metadata.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/30 rounded-full">
                        <CheckSquare className="text-indigo-200 w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{completed}/{tasks.length}</div>
                        <div className="text-xs text-indigo-300 uppercase tracking-wider font-semibold">Tasks Completed</div>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4">
                    <div className="p-3 bg-pink-500/30 rounded-full">
                        <Users className="text-pink-200 w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{sprints.length}</div>
                        <div className="text-xs text-pink-300 uppercase tracking-wider font-semibold">Active Sprints</div>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/30 rounded-full">
                        <BarChart3 className="text-emerald-200 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between mb-1">
                            <span className="text-2xl font-bold">{progress}%</span>
                            <span className="text-xs text-emerald-300 self-center uppercase tracking-wider font-semibold">Progress</span>
                        </div>
                        <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
