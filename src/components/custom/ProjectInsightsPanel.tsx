import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { AreaChart, Activity, Zap, CheckCircle2, AlertTriangle } from 'lucide-react';


import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    color: string;
}

const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-gray-100 dark:border-neutral-700 shadow-sm flex flex-col items-center justify-center text-center">
        <div className={`p-3 rounded-full mb-3 ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{label}</div>
    </div>
);

export const ProjectInsightsPanel = () => {
    const { insights } = useProjectStore();

    if (!insights) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Activity className="w-12 h-12 mb-4 opacity-50" />
                <p>No insights generated yet.</p>
                <p className="text-sm">Ask AI to &quot;Show project stats&quot;.</p>
            </div>
        );
    }

    return (
        <div className="p-8 h-full overflow-y-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-purple-600 p-2 rounded-lg">
                    <AreaChart className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Project Insights</h2>
                    <p className="text-gray-500 text-sm">Real-time analytics via MCP Tool {`"getProjectStats"`}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={CheckCircle2}
                    label="Completion Rate"
                    value={`${insights.totalTasks > 0 ? Math.round((insights.completedTasks / insights.totalTasks) * 100) : 0}%`}
                    color="bg-green-500"
                />
                <StatCard
                    icon={AlertTriangle}
                    label="High Priority"
                    value={insights.highPriorityTasks}
                    color="bg-red-500"
                />
                <StatCard
                    icon={Zap}
                    label="Total Sprints"
                    value={insights.sprintCount}
                    color="bg-amber-500"
                />
                <StatCard
                    icon={Activity}
                    label="Velocity (Avg Load)"
                    value={insights.tasksPerSprint}
                    color="bg-blue-500"
                />
            </div>

            <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-6 border border-gray-200 dark:border-neutral-800">
                <h3 className="text-lg font-semibold mb-4">Raw MCP Response Data</h3>
                <pre className="bg-black/5 dark:bg-white/5 p-4 rounded-lg text-xs font-mono overflow-x-auto text-gray-600 dark:text-gray-300">
                    {JSON.stringify(insights, null, 2)}
                </pre>
            </div>

            <div className="mt-4 text-center text-xs text-gray-400">
                Generated at: {new Date(insights.generatedAt).toLocaleString()}
            </div>
        </div>
    );
};
