'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import JobCard from '@/components/jobs/JobCard'
import JobFilter from '@/components/jobs/JobFilter'
import { Search, MapPin, Briefcase } from 'lucide-react' // Using lucide icons for a premium feel

type Job = {
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

export default function OpportunitiesPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchJobs()
  }, [])

  // Combined Search and Category Filtering
  useEffect(() => {
    let result = jobs
    if (activeFilter !== 'all') {
      result = result.filter(job => job.category.toLowerCase() === activeFilter.toLowerCase())
    }
    if (searchQuery) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    setFilteredJobs(result)
  }, [activeFilter, searchQuery, jobs])

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setJobs(data || [])
      setFilteredJobs(data || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Premium Hero Header */}
      <div className="bg-gray-900 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Find Your Next <span className="text-yellow-500">Remote Career</span>
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Connecting Eswatini's top talent with global digital opportunities.
          </p>

          {/* Search Bar UI */}
          <div className="mt-10 max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
            <div className="flex-grow flex items-center px-4 border-r border-gray-100">
              <Search className="text-gray-400 w-5 h-5 mr-3" />
              <input 
                type="text"
                placeholder="Job title or company..."
                className="w-full py-3 outline-none text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-xl transition-all">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <JobFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">Job Type</h4>
                <div className="space-y-3">
                  {['Remote', 'Hybrid', 'Contract'].map((type) => (
                    <label key={type} className="flex items-center gap-3 text-gray-600 cursor-pointer hover:text-yellow-600">
                      <input type="checkbox" className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500" />
                      <span className="text-sm font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <main className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500 font-medium">
                Showing <span className="text-gray-900 font-bold">{filteredJobs.length}</span> opportunities
              </p>
              <select className="bg-transparent border-none text-sm font-bold text-gray-700 focus:ring-0 cursor-pointer">
                <option>Newest First</option>
                <option>Salary: High to Low</option>
              </select>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-40 bg-white border border-gray-100 animate-pulse rounded-2xl" />
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="text-gray-300 w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs match your search</h3>
                <p className="text-gray-500 mb-8">Try adjusting your filters or search terms.</p>
                <button
                  onClick={() => {setActiveFilter('all'); setSearchQuery('')}}
                  className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-4 pb-20">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}