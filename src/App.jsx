import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [points, setPoints] = useState(120);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col font-sans select-none pb-20">
      {/* Top Header Bar */}
      <header className="bg-[#121824]/80 backdrop-blur-md sticky top-0 z-30 px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-lg shadow-lg shadow-cyan-500/20">
            B
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight tracking-wide">BrainSprint</h1>
            <p className="text-[10px] text-cyan-400 font-medium">Master Build v11.0</p>
          </div>
        </div>

        {/* User Points Badge */}
        <div className="flex items-center bg-gray-900/80 border border-gray-800 px-3 py-1.5 rounded-full space-x-1.5 shadow-inner">
          <span className="text-amber-400 text-sm">⚡</span>
          <span className="font-bold text-sm text-amber-300">{points}</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        {activeTab === 'home' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-gradient-to-r from-cyan-900/40 via-blue-900/30 to-indigo-900/40 border border-cyan-500/30 p-5 rounded-2xl shadow-xl">
              <h2 className="text-xl font-black text-cyan-300 mb-1">Welcome to BrainSprint!</h2>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Your ultimate interactive learning hub. Complete challenges, earn points, and level up your mastery everyday.
              </p>
              <button 
                onClick={() => setPoints(p => p + 10)}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/30 active:scale-95 transition-transform"
              >
                Claim Daily Bonus (+10 Pts)
              </button>
            </div>

            <div className="bg-[#151C28] border border-gray-800 p-4 rounded-2xl">
              <h3 className="font-bold text-sm text-gray-200 mb-2">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800/60">
                  <p className="text-[10px] text-gray-400">Current Level</p>
                  <p className="text-lg font-black text-cyan-400">Level 2</p>
                </div>
                <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800/60">
                  <p className="text-[10px] text-gray-400">Challenges Done</p>
                  <p className="text-lg font-black text-amber-400">8 / 12</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="space-y-3 animate-fadeIn">
            <h2 className="text-lg font-bold text-gray-200">Learning Modules</h2>
            <div className="bg-[#151C28] border border-gray-800 p-4 rounded-xl">
              <p className="text-sm font-semibold text-cyan-300">Module 1: React Basics</p>
              <p className="text-xs text-gray-400 mt-1">Master components, states, and mobile layout design.</p>
            </div>
            <div className="bg-[#151C28] border border-gray-800 p-4 rounded-xl">
              <p className="text-sm font-semibold text-cyan-300">Module 2: Tailwind Styling</p>
              <p className="text-xs text-gray-400 mt-1">Create sleek, responsive UIs with modern utility classes.</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4 animate-fadeIn text-center pt-6">
            <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full mx-auto flex items-center justify-center text-3xl font-black shadow-xl shadow-cyan-500/20">
              U
            </div>
            <div>
              <h2 className="text-lg font-bold">Learner Profile</h2>
              <p className="text-xs text-gray-400">Active Contributor</p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#121824]/95 backdrop-blur-md border-t border-gray-800 py-2 px-6 flex justify-around items-center z-30 max-w-md mx-auto">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'home' ? 'text-cyan-400' : 'text-gray-400'}`}
        >
          <span className="text-lg">🏠</span>
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button 
          onClick={() => setActiveTab('learn')}
          className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'learn' ? 'text-cyan-400' : 'text-gray-400'}`}
        >
          <span className="text-lg">📚</span>
          <span className="text-[10px] font-medium">Learn</span>
        </button>

        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'profile' ? 'text-cyan-400' : 'text-gray-400'}`}
        >
          <span className="text-lg">👤</span>
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </nav>
    </div>
  );
}

