'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import { ExternalLink, Bookmark, BookmarkCheck, Loader2, AlertCircle } from 'lucide-react'

type ApplicationFormProps = {
  jobId: string
  jobTitle: string
  externalUrl?: string // The link to the actual job
}

export default function ApplicationForm({ jobId, jobTitle, externalUrl }: ApplicationFormProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [hasSaved, setHasSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  const handleSaveJob = async () => {
    setIsSaving(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Sign in to save this job')

      const { error: saveError } = await supabase
        .from('saved_jobs')
        .insert({ job_id: jobId, user_id: user.id })

      if (saveError) {
        if (saveError.code === '23505') { // Unique violation (already saved)
          setHasSaved(true)
        } else {
          throw saveError
        }
      } else {
        setHasSaved(true)
      }
      
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Take Action</h3>
        <p className="text-sm text-slate-900 font-bold leading-tight">Apply for {jobTitle}</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-[10px] text-red-700 font-black uppercase">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      <div className="space-y-3">
        {/* PRIMARY ACTION: EXTERNAL LINK */}
        <a 
          href={externalUrl || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-yellow-500 text-slate-900 py-4 rounded-2xl font-black text-lg hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/20 active:scale-[0.98]"
        >
          Apply Now <ExternalLink className="ml-2 w-5 h-5" />
        </a>

        {/* SECONDARY ACTION: SAVE JOB */}
        <button
          onClick={handleSaveJob}
          disabled={isSaving || hasSaved}
          className={`flex items-center justify-center w-full py-4 rounded-2xl font-black transition-all border-2 ${
            hasSaved 
            ? 'bg-emerald-50 border-emerald-100 text-emerald-600 cursor-default' 
            : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50 active:scale-[0.98]'
          }`}
        >
          {isSaving ? (
            <Loader2 className="animate-spin mr-2" size={20} />
          ) : hasSaved ? (
            <><BookmarkCheck className="mr-2" size={20} /> Job Saved</>
          ) : (
            <><Bookmark className="mr-2" size={20} /> Save for Later</>
          )}
        </button>
      </div>

      <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-tight leading-relaxed">
        Clicking apply will open the employer's <br /> portal in a new tab.
      </p>
    </div>
  )
}