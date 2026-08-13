import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Plus, 
  Sparkles, 
  Trash2, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { BusinessPlanData } from '../types';

export interface ActionTask {
  id: string;
  title: string;
  category: 'Legal/Izin' | 'Finansial' | 'Produk' | 'Pemasaran' | 'Operasional';
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
  timeline: string;
  completed: boolean;
}

interface NextStepsTaskTrackerProps {
  plan: BusinessPlanData;
  theme?: 'warm-luxe' | 'dark-obsidian';
}

export const NextStepsTaskTracker: React.FC<NextStepsTaskTrackerProps> = ({
  plan,
  theme = 'warm-luxe',
}) => {
  const defaultTasks: ActionTask[] = [
    { id: 'task-1', title: `Urus NIB (Nomor Induk Berusaha) & Legalitas ${plan.businessName}`, category: 'Legal/Izin', priority: 'Tinggi', timeline: 'Minggu 1', completed: true },
    { id: 'task-2', title: `Buka Rekening Bank Usaha Khusus & Setup Pembukuan`, category: 'Finansial', priority: 'Tinggi', timeline: 'Minggu 2', completed: false },
    { id: 'task-3', title: `Finalisasi Vendor/Supplier Bahan Baku & Peralatan Utama`, category: 'Produk', priority: 'Tinggi', timeline: 'Minggu 3', completed: false },
    { id: 'task-4', title: `Daftarkan Google My Business (GMB) & Lokasi Maps`, category: 'Pemasaran', priority: 'Sedang', timeline: 'Bulan 1', completed: false },
    { id: 'task-5', title: `Rilis Iklan Soft Launching & Program Promo Perdana`, category: 'Pemasaran', priority: 'Sedang', timeline: 'Bulan 1', completed: false }
  ];

  const [tasks, setTasks] = useState<ActionTask[]>(defaultTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<ActionTask['category']>('Operasional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: ActionTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      priority: 'Sedang',
      timeline: 'Bulan ini',
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
  };

  const generateAiNextSteps = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/suggest-field', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fieldType: 'all',
          businessName: plan.businessName,
          industry: plan.industry,
          description: plan.executiveSummary,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiTasks: ActionTask[] = [
          { id: `ai-1-${Date.now()}`, title: `Urus sertifikasi & perizinan spesifik industri ${plan.industry}`, category: 'Legal/Izin', priority: 'Tinggi', timeline: 'Bulan 1', completed: false },
          { id: `ai-2-${Date.now()}`, title: `Persiapkan materi proposal pengajuan pinjaman/investor untuk ${plan.businessName}`, category: 'Finansial', priority: 'Tinggi', timeline: 'Bulan 1', completed: false },
          { id: `ai-3-${Date.now()}`, title: `Bangun Landing Page SEO & Akun Media Sosial Resmi`, category: 'Pemasaran', priority: 'Sedang', timeline: 'Bulan 2', completed: false },
        ];
        setTasks(prev => [...aiTasks, ...prev]);
      }
    } catch (err) {
      console.error('Failed to generate AI next steps:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-[6px_6px_0px_0px_#0f172a] space-y-4 text-slate-900">
      
      {/* Header & Progress */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#fef08a] border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_0px_#0f172a]">
            <CheckSquare className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">Task Tracker Next Steps</h3>
            <p className="text-[11px] font-bold text-slate-600">Panduan eksekusi taktis pasca-proposal</p>
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-xs font-black px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 rounded-lg shadow-[1.5px_1.5px_0px_0px_#0f172a] cursor-pointer"
        >
          {isCollapsed ? 'Buka Panel' : 'Sembunyikan'}
        </button>
      </div>

      {!isCollapsed && (
        <div className="space-y-4 animate-fadeIn">
          
          {/* Progress Bar & AI Suggest Button */}
          <div className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-3 space-y-2 shadow-[2px_2px_0px_0px_#0f172a]">
            <div className="flex justify-between items-center text-xs font-black">
              <span>Progres Eksekusi Usaha: {completedCount}/{tasks.length} Selesai</span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-slate-900">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-200 border border-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <button
              onClick={generateAiNextSteps}
              disabled={isGenerating}
              className="w-full mt-2 py-2 px-3 bg-[#bfdbfe] hover:bg-[#93c5fd] text-slate-900 border-2 border-slate-900 rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] flex items-center justify-center gap-2 transition cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            >
              <Sparkles className={`w-3.5 h-3.5 text-blue-900 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'AI Menyusun Tugas...' : 'AI Auto-Suggest Actionable Next Steps'}</span>
            </button>
          </div>

          {/* Add Task Form */}
          <form onSubmit={handleAddTask} className="flex gap-2">
            <input
              type="text"
              placeholder="Tambah tugas aksi baru..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 bg-white border-2 border-slate-900 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none shadow-[2px_2px_0px_0px_#0f172a]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#fef08a] hover:bg-[#fde047] text-slate-900 border-2 border-slate-900 rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          {/* Tasks List */}
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className={`p-3 rounded-2xl border-2 border-slate-900 flex items-start justify-between gap-2 transition ${
                  task.completed 
                    ? 'bg-slate-100 opacity-75 line-through shadow-none' 
                    : 'bg-white shadow-[2px_2px_0px_0px_#0f172a]'
                }`}
              >
                <div className="flex items-start gap-2.5 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 text-slate-900 hover:text-emerald-600 cursor-pointer shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-700" />
                    )}
                  </button>

                  <div>
                    <span className={`text-xs font-bold block ${task.completed ? 'text-slate-500' : 'text-slate-900'}`}>
                      {task.title}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded border border-slate-900 bg-slate-100">
                        {task.category}
                      </span>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border border-slate-900 ${
                        task.priority === 'Tinggi' ? 'bg-rose-200 text-rose-900' : 'bg-amber-200 text-amber-900'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {task.timeline}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                  title="Hapus Tugas"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
