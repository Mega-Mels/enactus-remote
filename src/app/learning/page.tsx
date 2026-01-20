'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import CourseCard from '@/components/courses/CourseCard'
import { Sparkles, GraduationCap, Search, Filter } from 'lucide-react'
import { requireUser } from '@/lib/auth'


type Course = {
  id: string
  title: string
  description: string
  category: string
  thumbnail_url: string | null
  is_external: boolean
  is_certified: boolean
  enrollment_count: number
  resource_url: string | null
}

export default function LearningPage() {
  
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const supabase = createClient()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCourses(data || [])
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', 'Technical', 'Business', 'Soft Skills', 'Data Analytics']

  const filteredCourses = activeCategory === 'all'
    ? courses
    : courses.filter(c => c.category === activeCategory)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* High-Contrast Hero Header */}
      <div className="bg-slate-900 pt-16 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 mb-4">
            <Sparkles size={12} />
            <span className="text-[9px] font-black uppercase tracking-widest">Global Certifications</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
            Enactus <span className="text-yellow-500">Remote Academy</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto font-medium">
            Master high-income digital skills and earn credentials recognized by global hiring partners.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter - Compact & Professional */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-lg text-yellow-500">
              <Filter size={16} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Filter by Stream
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-xl text-xs font-black transition-all tracking-tight ${
                  activeCategory === category
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {category === 'all' ? 'All Modules' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 animate-pulse rounded-[2rem] bg-slate-200 border border-slate-100" />
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-6 text-slate-300">
               <GraduationCap size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">No modules found</h3>
            <p className="text-slate-500 font-medium">We're currently updating this stream with new content.</p>
            <button 
              onClick={() => setActiveCategory('all')}
              className="mt-6 text-yellow-600 font-black text-sm hover:underline"
            >
              Back to all courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        )}

        {/* Professional Stats Footer */}
        {!loading && (
          <footer className="mt-20 border-t border-slate-200 pt-10 text-center">
            <div className="inline-flex items-center gap-6 px-8 py-3 bg-white rounded-full border border-slate-200 shadow-sm">
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900 leading-none">{courses.length}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Modules</span>
              </div>
              <div className="w-px h-6 bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900 leading-none">
                  {courses.reduce((sum, c) => sum + c.enrollment_count, 0).toLocaleString()}
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Learners</span>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}