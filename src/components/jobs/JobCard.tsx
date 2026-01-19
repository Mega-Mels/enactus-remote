'use client'

import Link from 'next/link'
import { Calendar, Users, ArrowRight, DollarSign, Briefcase } from 'lucide-react'

type JobCardProps = {
  id: string
  title: string
  company: string
  description: string
  category: string
  job_type: string
  salary_range: string
  application_count: number
  created_at: string
}

export default function JobCard({ 
  id, 
  title, 
  company, 
  description, 
  category, 
  job_type, 
  salary_range,
  application_count,
  created_at 
}: JobCardProps) {

  const getTypeColor = (type: string) => {
    switch(type.toLowerCase()) {
      case 'remote': return 'bg-indigo-50 text-indigo-700 border-indigo-100'
      case 'hybrid': return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'contract': return 'bg-amber-50 text-amber-700 border-amber-100'
      default: return 'bg-gray-50 text-gray-700 border-gray-100'
    }
  }

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const days = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return `${Math.floor(days / 7)}w ago`
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-yellow-200 transition-all duration-300 group flex flex-col justify-between h-full">
      <div>
        {/* Header: Company & Application Count */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-yellow-50 group-hover:border-yellow-100 transition-colors">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-tight">{company}</p>
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-yellow-600 transition-colors">
                {title}
              </h3>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
            application_count > 40 ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
          }`}>
            <Users className="w-3 h-3" />
            {application_count}
          </div>
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getTypeColor(job_type)}`}>
            {job_type}
          </span>
          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-gray-50 text-gray-600 border border-gray-100">
            {category}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Footer: Salary & Action */}
      <div className="pt-5 border-t border-gray-50 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-gray-900 font-bold text-sm">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            {salary_range}
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-[11px] font-medium">
            <Calendar className="w-3 h-3" />
            Posted {getDaysAgo(created_at)}
          </div>
        </div>
        
        <Link 
          href={`/opportunities/${id}`}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-900 text-white group-hover:bg-yellow-500 group-hover:text-black transition-all shadow-lg shadow-gray-200"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}