'use client'

import { Filter, ChevronRight } from 'lucide-react'

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
    <div className="flex flex-col gap-10">
      {/* Category Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-900">
          <Filter className="w-4 h-4 text-yellow-600" />
          <h3 className="text-sm font-bold uppercase tracking-widest">Categories</h3>
        </div>
        
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFilterChange(cat.id)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                activeFilter === cat.id
                  ? 'bg-yellow-50 text-yellow-700'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {cat.label}
              {activeFilter === cat.id && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Job Type Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Job Type</h3>
        <div className="space-y-3 px-2">
          {jobTypes.map((type) => (
            <label 
              key={type} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:border-yellow-500 checked:bg-yellow-500 transition-all" 
                />
                <svg className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-600 group-hover:text-yellow-600 transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}