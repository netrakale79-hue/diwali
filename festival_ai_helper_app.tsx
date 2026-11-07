import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Calendar, DollarSign, CheckCircle, ChevronRight, Plus, 
  Trash2, Brain, PieChart, Users, PartyPopper, Lightbulb, Bell, 
  ArrowLeft, RefreshCw, Flame, Heart, ShoppingBag, Gift, Award, Check
} from 'lucide-react';

export default function App() {
  // Navigation State: 1 = Festival Selection, 2 = Budget, 3 = Dashboard, 4 = Checklist
  const [currentStep, setCurrentStep] = useState(1);

  // App Master State
  const [selectedFestival, setSelectedFestival] = useState({
    id: 'diwali',
    name: 'Diwali',
    tagline: 'Festival of Lights',
    daysLeft: 10,
    icon: '🪔',
    color: 'from-amber-500 to-rose-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentColor: 'text-amber-600',
    theme: 'Warm Traditional Gold & Crimson'
  });

  const [totalBudget, setTotalBudget] = useState(15000); // Currency in ₹ or $ based on context
  const [currency, setCurrency] = useState('₹');

  // AI Calculated Budget Breakdown
  const [budgetBreakdown, setBudgetBreakdown] = useState({
    decor: 3750,    // 25%
    food: 4500,     // 30%
    gifts: 3000,    // 20%
    attire: 2250,   // 15%
    puja: 1500      // 10%
  });

  const [guestCount, setGuestCount] = useState(25);
  const [aiSuggestions, setAiSuggestions] = useState([
    { id: 1, text: "Buy eco-friendly clay diyas in bulk to save 20% on lighting.", category: "Budget Saver" },
    { id: 2, text: "Pre-order mithai 5 days early to avoid high peak holiday rates.", category: "Smart Planning" },
    { id: 3, text: "Plan a DIY Rangoli station for kids to keep them engaged during evening puja.", category: "Guest Activity" }
  ]);

  // Daily Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, day: 'Day 10 (Today)', title: 'Deep house cleaning & clutter removal', category: 'Decor', completed: true, aiGenerated: false },
    { id: 2, day: 'Day 8', title: 'Buy Brass lamps, eco-diyas & LED string lights', category: 'Decor', completed: true, aiGenerated: true },
    { id: 3, day: 'Day 6', title: 'Finalize Guest List & send digital Diwali invites', category: 'Guests', completed: false, aiGenerated: true },
    { id: 4, day: 'Day 5', title: 'Order sweets, dry fruit boxes & return gifts', category: 'Gifts', completed: false, aiGenerated: false },
    { id: 5, day: 'Day 3', title: 'Buy traditional attire & festive jewelry accessories', category: 'Attire', completed: false, aiGenerated: false },
    { id: 6, day: 'Day 2', title: 'Prepare Marigold garlands & fresh flower decorations', category: 'Decor', completed: false, aiGenerated: true },
    { id: 7, day: 'Day 1', title: 'Make fresh homemade snacks (Chakli, Karanji, Ladoos)', category: 'Food', completed: false, aiGenerated: false },
    { id: 8, day: 'Festival Day', title: 'Grand evening Rangoli, Lakshmi Puja & Family Feast', category: 'Puja', completed: false, aiGenerated: true }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskFilter, setTaskFilter] = useState('all');

  // Recalculate AI budget breakdown when total budget changes
  useEffect(() => {
    setBudgetBreakdown({
      decor: Math.round(totalBudget * 0.25),
      food: Math.round(totalBudget * 0.30),
      gifts: Math.round(totalBudget * 0.20),
      attire: Math.round(totalBudget * 0.15),
      puja: Math.round(totalBudget * 0.10)
    });
  }, [totalBudget]);

  // Preset Festivals List
  const festivalsList = [
    { id: 'diwali', name: 'Diwali', tagline: 'Festival of Lights & Joy', daysLeft: 10, icon: '🪔', color: 'from-amber-500 to-rose-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-400', accentColor: 'text-amber-600', theme: 'Royal Golden Glow & Rangoli Colors' },
    { id: 'holi', name: 'Holi', tagline: 'Festival of Colors & Spring', daysLeft: 45, icon: '🎨', color: 'from-pink-500 via-purple-500 to-cyan-500', bgColor: 'bg-pink-50', borderColor: 'border-pink-400', accentColor: 'text-pink-600', theme: 'Organic Gulaal Splash & Festive Gujiya Feast' },
    { id: 'christmas', name: 'Christmas', tagline: 'Season of Cheer & Giving', daysLeft: 60, icon: '🎄', color: 'from-emerald-600 to-red-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-400', accentColor: 'text-emerald-700', theme: 'Rustic Pine, Warm Lights & Gingerbread' },
    { id: 'eid', name: 'Eid al-Fitr', tagline: 'Feast of Gratitude & Peace', daysLeft: 120, icon: '🌙', color: 'from-teal-500 to-emerald-700', bgColor: 'bg-teal-50', borderColor: 'border-teal-400', accentColor: 'text-teal-700', theme: 'Crescent Moon Gold & Royal Emerald' },
    { id: 'navratri', name: 'Navratri', tagline: '9 Nights of Dance & Devotion', daysLeft: 30, icon: '💃', color: 'from-orange-500 to-purple-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-400', accentColor: 'text-orange-600', theme: '9 Vibrant Chaniya Choli Colors & Garba Beats' }
  ];

  // Helper Functions
  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      day: 'Day Prior',
      title: newTaskTitle,
      category: 'General',
      completed: false,
      aiGenerated: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const generateAiTasks = () => {
    const aiTasks = [
      { id: Date.now() + 1, day: 'Day 4', title: 'AI Suggestion: Setup festive playlist with top regional tracks', category: 'Music', completed: false, aiGenerated: true },
      { id: Date.now() + 2, day: 'Day 2', title: 'AI Suggestion: Prepare welcome drink batch (Kesari Thandai / Mulled Cider)', category: 'Food', completed: false, aiGenerated: true }
    ];
    setTasks([...tasks, ...aiTasks]);
  };

  const completedTasksCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedTasksCount / tasks.length) * 100) || 0;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col justify-between">
      {/* APP HEADER & NAVIGATION BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentStep(1)}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${selectedFestival.color} flex items-center justify-center text-xl shadow-lg shadow-amber-500/20`}>
              {selectedFestival.icon}
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight flex items-center gap-2">
                FestiveAI <span className="bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">Copilot</span>
              </h1>
              <p className="text-xs text-slate-400">Planning: <span className="text-amber-400 font-medium">{selectedFestival.name}</span></p>
            </div>
          </div>

          {/* Stepper Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-full border border-slate-700">
            {[
              { step: 1, label: '1. Select Festival', icon: PartyPopper },
              { step: 2, label: '2. AI Budget', icon: DollarSign },
              { step: 3, label: '3. Dashboard', icon: Brain },
              { step: 4, label: '4. Checklist', icon: CheckCircle }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentStep === item.step;
              return (
                <button
                  key={item.step}
                  onClick={() => setCurrentStep(item.step)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* AI Status Badge */}
          <div className="flex items-center gap-2 bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span className="hidden sm:inline font-medium">AI Agent Active</span>
          </div>
        </div>

        {/* Mobile Stepper Bar */}
        <div className="md:hidden flex justify-around border-t border-slate-800 bg-slate-900/95 py-2 px-1 text-xs">
          <button onClick={() => setCurrentStep(1)} className={`flex flex-col items-center gap-1 ${currentStep === 1 ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            <PartyPopper className="w-4 h-4" /> Select
          </button>
          <button onClick={() => setCurrentStep(2)} className={`flex flex-col items-center gap-1 ${currentStep === 2 ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            <DollarSign className="w-4 h-4" /> Budget
          </button>
          <button onClick={() => setCurrentStep(3)} className={`flex flex-col items-center gap-1 ${currentStep === 3 ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            <Brain className="w-4 h-4" /> Plan
          </button>
          <button onClick={() => setCurrentStep(4)} className={`flex flex-col items-center gap-1 ${currentStep === 4 ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            <CheckCircle className="w-4 h-4" /> Tasks
          </button>
        </div>
      </header>

      {/* MAIN SCREEN CONTAINERS */}
      <main className="max-w-6xl mx-auto w-full px-4 py-6 flex-grow">

        {/* SCREEN 1: FESTIVAL SELECTION */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            {/* AI Banner Header */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/60 via-slate-900 to-amber-950/60 border border-purple-500/30 p-6 md:p-8">
              <div className="relative z-10 space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> Step 1: Smart Choice Engine
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                  Which festival are we celebrating next?
                </h2>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  Our AI Copilot configures tailored timelines, budget recommendations, traditional rituals, and task schedules according to your chosen festival.
                </p>
              </div>
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Festival Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {festivalsList.map((fest) => {
                const isSelected = selectedFestival.id === fest.id;
                return (
                  <div
                    key={fest.id}
                    onClick={() => setSelectedFestival(fest)}
                    className={`relative cursor-pointer rounded-2xl p-5 transition-all duration-300 border ${
                      isSelected 
                        ? 'bg-slate-800 border-amber-400 ring-2 ring-amber-400/50 shadow-xl shadow-amber-500/10 scale-[1.02]' 
                        : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-4 right-4 bg-amber-400 text-slate-950 p-1 rounded-full">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${fest.color} flex items-center justify-center text-3xl shadow-lg shrink-0`}>
                        {fest.icon}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-xl text-white">{fest.name}</h3>
                        <p className="text-xs text-slate-400">{fest.tagline}</p>
                        <span className="inline-block mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-700/80 text-amber-300">
                          ⏳ {fest.daysLeft} Days Away
                        </span>
                      </div>
                    </div>

                    {/* AI Preview Feature Box inside Card */}
                    <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5 text-purple-400" />
                        AI Theme:
                      </span>
                      <span className="font-medium text-slate-200 text-right truncate max-w-[170px]">
                        {fest.theme.split('&')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Custom AI Festival Prompt Card */}
              <div className="rounded-2xl p-5 border border-dashed border-slate-700 bg-slate-800/30 flex flex-col justify-between hover:border-purple-500/50 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                    <Sparkles className="w-4 h-4" /> AI Custom Festival
                  </div>
                  <h3 className="font-bold text-base text-white">Celebrating a local or custom event?</h3>
                  <p className="text-xs text-slate-400">Type any festival name (e.g., Thanksgiving, Onam, Birthday Bash) and AI will build a custom blueprint.</p>
                </div>
                <button 
                  onClick={() => alert("AI Custom Festival Generator: Select Diwali to continue the interactive demo preview!")}
                  className="mt-4 w-full py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium text-xs rounded-xl flex items-center justify-center gap-1 transition-all"
                >
                  <Plus className="w-4 h-4" /> Generate Custom Plan
                </button>
              </div>
            </div>

            {/* AI Smart Suggestion Banner */}
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-200">AI Recommendation for {selectedFestival.name}</h4>
                  <p className="text-xs text-slate-300">
                    "Diwali requires high emphasis on Decor (lights/diyas) & Sweet distributions. Recommended prep start: 10 days in advance."
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all shrink-0"
              >
                Continue to Budget Setup <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: BUDGET INPUT SCREEN */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Screen Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Step 2: Smart Financial Estimator
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
                  Budgeting for {selectedFestival.name} {selectedFestival.icon}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">AI dynamically distributes your total funds based on past festive benchmark spending.</p>
              </div>

              {/* Currency Picker */}
              <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700 text-xs self-start sm:self-auto">
                {['₹', '$', '€'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      currency === curr ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Interactive Budget Input Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Budget Controller */}
              <div className="lg:col-span-5 bg-slate-800/60 rounded-3xl p-6 border border-slate-700 flex flex-col justify-between space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Set Total Festive Spending Budget
                  </label>
                  <div className="relative mb-4">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-amber-400">{currency}</span>
                    <input
                      type="number"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(Number(e.target.value) || 0)}
                      className="w-full bg-slate-900 border-2 border-slate-700 focus:border-amber-400 rounded-2xl py-3 pl-10 pr-4 text-2xl font-bold text-white outline-none transition-all"
                    />
                  </div>

                  {/* Range Slider */}
                  <input
                    type="range"
                    min="2000"
                    max="100000"
                    step="1000"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-700 h-2 rounded-lg cursor-pointer mb-6"
                  />

                  {/* Quick Preset Buttons */}
                  <div className="space-y-2">
                    <span className="text-xs text-slate-400 font-medium">Quick AI Preset Tiers:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Minimalist', val: 5000 },
                        { label: 'Standard', val: 15000 },
                        { label: 'Grand Feast', val: 35000 }
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          onClick={() => setTotalBudget(preset.val)}
                          className={`py-2 text-xs rounded-xl border transition-all ${
                            totalBudget === preset.val
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                              : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Guest Count Estimator */}
                <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-700/80 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-indigo-400" /> Expected Guest Count
                    </span>
                    <span className="font-extrabold text-indigo-300 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                      {guestCount} Guests
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-700 h-2 rounded-lg cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400">
                    💡 AI Estimate: Average food cost per guest is ~{currency}{Math.round(budgetBreakdown.food / (guestCount || 1))}.
                  </p>
                </div>
              </div>

              {/* Right Column: AI Auto-Allocation Cards */}
              <div className="lg:col-span-7 bg-slate-800/40 rounded-3xl p-6 border border-slate-700 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <h3 className="font-bold text-white text-lg">AI Smart Allocation Breakdown</h3>
                  </div>
                  <span className="text-xs text-purple-300 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-500/30 font-medium">
                    Auto-balanced for Diwali
                  </span>
                </div>

                {/* Category Sliders / Badges */}
                <div className="space-y-4">
                  {[
                    { label: 'Sweets, Snacks & Party Feast', key: 'food', pct: '30%', color: 'bg-emerald-500', icon: '🍲' },
                    { label: 'Diyas, Lights & Rangoli Decor', key: 'decor', pct: '25%', color: 'bg-amber-500', icon: '🪔' },
                    { label: 'Family Sweets & Guest Gifts', key: 'gifts', pct: '20%', color: 'bg-pink-500', icon: '🎁' },
                    { label: 'Festive Clothes & Jewelry', key: 'attire', pct: '15%', color: 'bg-indigo-500', icon: '👔' },
                    { label: 'Puja Samagri & Samagri Prep', key: 'puja', pct: '10%', color: 'bg-rose-500', icon: '🌺' }
                  ].map((cat) => (
                    <div key={cat.key} className="bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-200 flex items-center gap-2">
                          <span>{cat.icon}</span> {cat.label}
                        </span>
                        <span className="font-bold text-white">
                          {currency}{budgetBreakdown[cat.key]?.toLocaleString()}
                          <span className="text-xs text-slate-400 ml-1">({cat.pct})</span>
                        </span>
                      </div>
                      
                      {/* Visual Bar */}
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${cat.color} transition-all duration-500`}
                          style={{ width: cat.pct }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Festivals
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
              >
                Generate AI Planning Dashboard <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: AI PLANNING DASHBOARD */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-xl">
                  ⌛
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Countdown</p>
                  <h3 className="text-xl font-black text-white">{selectedFestival.daysLeft} Days to {selectedFestival.name}</h3>
                </div>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xl">
                  {currency}
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Budget Allocated</p>
                  <h3 className="text-xl font-black text-white">{currency}{totalBudget.toLocaleString()}</h3>
                </div>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center text-xl">
                  👥
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Expected Guests</p>
                  <h3 className="text-xl font-black text-white">{guestCount} Guests</h3>
                </div>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center text-xl">
                  ✅
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Prep Readiness</p>
                  <h3 className="text-xl font-black text-white">{progressPercent}% Ready</h3>
                </div>
              </div>
            </div>

            {/* AI Insights & Master Plan Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Side: AI Smart Suggestions & Tips */}
              <div className="lg:col-span-7 space-y-5">
                <div className="bg-gradient-to-br from-purple-950/40 via-slate-800/80 to-slate-900 border border-purple-500/30 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">AI Festive Assistant Insights</h3>
                        <p className="text-xs text-purple-300/80">Tailored recommendations based on your {selectedFestival.name} setup</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert("AI refresh: Analyzed local market prices and updated schedule optimizations!")}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs flex items-center gap-1 border border-slate-700 transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Re-sync
                    </button>
                  </div>

                  {/* AI Suggestions Stack */}
                  <div className="space-y-3">
                    {aiSuggestions.map((item) => (
                      <div key={item.id} className="bg-slate-900/90 rounded-2xl p-4 border border-purple-500/20 flex items-start gap-3">
                        <div className="p-1.5 bg-amber-500/20 rounded-lg text-amber-400 shrink-0 mt-0.5">
                          <Brain className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-500/30">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Menu & Tradition Generator Widget */}
                <div className="bg-slate-800/60 border border-slate-700 rounded-3xl p-6 space-y-4">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <span>🍲</span> AI Curated {selectedFestival.name} Menu Highlights
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    {[
                      { title: 'Welcome Drinks', detail: 'Saffron Badam Milk / Thandai' },
                      { title: 'Signature Main', detail: 'Paneer Butter Masala & Puri' },
                      { title: 'Sweets Box', detail: 'Motichoor Ladoo & Gulab Jamun' },
                      { title: 'Savory Snacks', detail: 'Crispy Chakli & Namak Pare' },
                      { title: 'Puja Prasad', detail: 'Panchamrit & Fresh Fruits' },
                      { title: 'Late Midnight Snack', detail: 'Cardamom Chai & Dryfruits' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 space-y-1">
                        <p className="text-amber-400 font-semibold">{item.title}</p>
                        <p className="text-slate-300">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Timeline Preview & Progress */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Readiness Card */}
                <div className="bg-slate-800/60 border border-slate-700 rounded-3xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-base">Preparation Progress</h3>
                    <span className="text-xs font-bold text-amber-400">{completedTasksCount} of {tasks.length} Done</span>
                  </div>

                  <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Upcoming Priority Tasks Snapshot */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Next Priority Checklist Items</p>
                    {tasks.filter(t => !t.completed).slice(0, 3).map((task) => (
                      <div key={task.id} className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-bold">{task.day}:</span>
                          <span className="text-slate-200 truncate max-w-[180px]">{task.title}</span>
                        </div>
                        {task.aiGenerated && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-500/30">
                            AI
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentStep(4)}
                    className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all mt-2"
                  >
                    Open Full Daily Task Checklist <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* AI Shopping List Shortcut */}
                <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <ShoppingBag className="w-4 h-4" /> Smart Shopping Master List
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    AI generated an itemized market list for clay diyas, incense, marigold flowers, dry fruits, and rangoli powders.
                  </p>
                  <button 
                    onClick={() => alert("Downloading AI Smart Shopping Checklist (PDF / WhatsApp Format)...")}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    Export Shopping List
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 4: DAILY TASK CHECKLIST */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Checklist Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Step 4: AI Execution Timeline
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
                  {selectedFestival.name} Prep Checklist {selectedFestival.icon}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">Step-by-step day-wise plan curated by AI to avoid last-minute rush.</p>
              </div>

              {/* Action Buttons */}
              <button
                onClick={generateAiTasks}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all self-start sm:self-auto"
              >
                <Sparkles className="w-4 h-4 text-purple-200 animate-spin" /> AI Breakdown + Tasks
              </button>
            </div>

            {/* Add Task Form & Filters */}
            <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700 space-y-4">
              <form onSubmit={addTask} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a custom festival prep task (e.g. Call decorator, Buy sweets)..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="flex-grow bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Task
                </button>
              </form>

              {/* Filters */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-700/60">
                <div className="flex items-center gap-1.5">
                  {['all', 'pending', 'completed', 'ai'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTaskFilter(filter)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                        taskFilter === filter
                          ? 'bg-slate-700 text-amber-400 border border-amber-500/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {filter === 'ai' ? '✨ AI Assisted' : filter}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-slate-400">
                  Total Completed: <span className="text-emerald-400 font-bold">{completedTasksCount}</span> / {tasks.length}
                </div>
              </div>
            </div>

            {/* Tasks Timeline List */}
            <div className="space-y-3">
              {tasks
                .filter(t => {
                  if (taskFilter === 'pending') return !t.completed;
                  if (taskFilter === 'completed') return t.completed;
                  if (taskFilter === 'ai') return t.aiGenerated;
                  return true;
                })
                .map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`group cursor-pointer rounded-2xl p-4 border transition-all flex items-center justify-between gap-4 ${
                      task.completed 
                        ? 'bg-slate-900/40 border-slate-800 text-slate-500' 
                        : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 flex-grow">
                      {/* Custom Checkbox */}
                      <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                        task.completed 
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                          : 'border-slate-600 group-hover:border-amber-400'
                      }`}>
                        {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            task.completed ? 'bg-slate-800 text-slate-500' : 'bg-slate-700 text-amber-400'
                          }`}>
                            {task.day}
                          </span>

                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            {task.category}
                          </span>

                          {task.aiGenerated && (
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/40 font-semibold">
                              <Sparkles className="w-2.5 h-2.5 text-purple-400" /> AI Task
                            </span>
                          )}
                        </div>

                        <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                          {task.title}
                        </p>
                      </div>
                    </div>

                    {/* Delete Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTasks(tasks.filter(t => t.id !== task.id));
                      }}
                      className="text-slate-600 hover:text-rose-400 p-2 rounded-lg hover:bg-slate-700/50 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <p>Festive AI Copilot • Powered by Smart Planning Models</p>
      </footer>
    </div>
  );
}