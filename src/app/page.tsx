'use client';

import React, { useState, useEffect } from 'react';
import { useProjectStore } from '../store/projectStore';
import { processUserPrompt } from '../lib/mockAI';
import { TaskList } from '../components/custom/TaskList';
import { SprintBoard } from '../components/custom/SprintBoard';
import { TimelineView } from '../components/custom/TimelineView';
import { ProjectSummaryPanel } from '../components/custom/ProjectSummaryPanel';
import { ProjectInsightsPanel } from '../components/custom/ProjectInsightsPanel';
import { Send, Sparkles } from 'lucide-react';

// Safe client-only hook to prevent hydration mismatch
const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  return mounted;
};

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const store = useProjectStore();
  const isMounted = useMounted();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setAiResponse(null);

    // Simulate AI delay for effect
    setTimeout(() => {
      const result = processUserPrompt(prompt, store);
      setAiResponse(result.message);
      setIsProcessing(false);
      setPrompt('');
    }, 800);
  };

  const renderActiveView = () => {
    switch (store.viewMode) {
      case 'insights': return <ProjectInsightsPanel />;
      case 'board': return <SprintBoard />;
      case 'timeline': return <TimelineView />;
      case 'list': default: return <TaskList />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-sans">

      {/* Top Navigation / Brand */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-black/50 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 rounded-lg p-1.5">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Tambo WorkOS</span>
          </div>
          <div className="text-xs font-mono text-gray-400 bg-gray-100 dark:bg-neutral-900 px-2 py-1 rounded">
            hackathon-mode: mock-ai
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-32 px-4 max-w-7xl mx-auto min-h-screen flex flex-col">

        {/* Project Context & Stats */}
        <div className="mb-8">
          {isMounted ? <ProjectSummaryPanel /> : <div className="h-48 bg-white/50 animate-pulse rounded-xl" />}
        </div>

        {/* Dynamic View Container */}
        <div className="flex-1 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden relative min-h-[500px]">
          {isMounted ? renderActiveView() : <div className="h-full w-full bg-white/50 animate-pulse" />}
        </div>

      </main>

      {/* Input Console - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black pt-20">
        <div className="max-w-3xl mx-auto w-full relative">

          {/* AI Response Toast */}
          {aiResponse && (
            <div className="absolute -top-16 left-0 right-0 mx-auto w-max max-w-xl bg-white dark:bg-neutral-800 border border-indigo-100 dark:border-indigo-900/30 shadow-xl rounded-full py-2 px-6 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium">{aiResponse}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative shadow-2xl rounded-2xl overflow-hidden ring-1 ring-gray-900/5 dark:ring-white/10">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to manage (e.g., 'Create a startup launch plan' or 'Show as timeline')..."
              className="w-full bg-white dark:bg-neutral-900 text-lg px-6 py-5 pr-16 focus:outline-none placeholder:text-gray-400"
              disabled={isProcessing}
            />
            <button
              type="submit"
              disabled={isProcessing || !prompt.trim()}
              className="absolute right-3 top-3 p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>

          <div className="flex justify-center gap-4 mt-4 mb-2">
            <button onClick={() => setPrompt("Create a task list for my startup launch")} className="text-xs text-gray-500 hover:text-indigo-600 transition-colors bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 px-3 py-1 rounded-full shadow-sm">
              &quot;Create a startup launch plan&quot;
            </button>
            <button onClick={() => setPrompt("Group these into Sprint 1 and show board")} className="text-xs text-gray-500 hover:text-indigo-600 transition-colors bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 px-3 py-1 rounded-full shadow-sm">
              &quot;Group into Sprint 1&quot;
            </button>
            <button onClick={() => setPrompt("Show me the timeline")} className="text-xs text-gray-500 hover:text-indigo-600 transition-colors bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 px-3 py-1 rounded-full shadow-sm">
              &quot;Show timeline&quot;
            </button>
            <button onClick={() => setPrompt("Show project insights")} className="text-xs text-gray-500 hover:text-purple-600 transition-colors bg-white dark:bg-neutral-900 border border-purple-200 dark:border-purple-900/40 px-3 py-1 rounded-full shadow-sm text-purple-600">
              ✨ &quot;Show project insights&quot;
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
