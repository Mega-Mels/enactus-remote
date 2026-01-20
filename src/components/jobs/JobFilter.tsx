'use client'

import { Filter, ChevronRight, Check } from 'lucide-react'

type JobFilterProps = {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export default function JobFilter({ activeFilter, onFilterChange }: JobFilterProps) {
  const categories = [
    { id: 'all', label: 'All Positions' },
    { id: 'tech', label: 'Tech & IT' },
    { id: 'business', label: 'Business' },
    { id: 'creative', label: 'Creative' },
    { id: 'entry', label: 'Entry Level' },
  ]

  const jobTypes = ['Remote', 'Hybrid', 'Contract']

  return (
    <div className="space-y-12">
      {/* Category Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-slate-900 border-b border-slate-50 pb-4">
          <Filter className="w-4 h-4 text-yellow-500" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Categories</h3>
        </div>
        
        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFilterChange(cat.id)}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-black transition-all group ${
                activeFilter === cat.id
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="tracking-tight">{cat.label}</span>
              {activeFilter === cat.id ? (
                <ChevronRight className="w-4 h-4 text-yellow-500" />
              ) : (
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-slate-300" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Job Type Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-slate-900 border-b border-slate-50 pb-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Work Style</h3>
        </div>
        <div className="space-y-4 px-1">
          {jobTypes.map((type) => (
            <label 
              key={type} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-lg checked:border-yellow-500 checked:bg-yellow-500 transition-all cursor-pointer" 
                />
                <Check className="absolute w-3 h-3 text-slate-900 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none stroke-[4px]" />
              </div>
              <span className="text-xs font-black text-slate-500 group-hover:text-slate-900 transition-colors tracking-tight">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}