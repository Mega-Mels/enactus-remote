'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import { 
  User, Phone, MapPin, Sparkles, FileUp, 
  CheckCircle2, Loader2, Lock, Mail, Eye, X 
} from 'lucide-react'

type ProfileFormProps = {
  profile: any
  userId?: string 
}

export default function ProfileForm({ profile, userId }: ProfileFormProps) {
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [phone, setPhone] = useState(profile?.phone || '')
  const [location, setLocation] = useState(profile?.location || '')
  const [skills, setSkills] = useState<string[]>(profile?.skills || [])
  const [customSkill, setCustomSkill] = useState('')
  const [resumeUrl, setResumeUrl] = useState(profile?.resume_url || '')
  const [loading, setLoading] = useState(false)
  
  const supabase = createClient()
  const router = useRouter()

  const skillOptions = ['React', 'Next.js', 'TypeScript', 'Python', 'SQL', 'ASP.NET', 'Java']

  const toggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s: string) => s !== skill))
    } else {
      setSkills([...skills, skill])
    }
  }

  const addCustomSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && customSkill.trim()) {
      e.preventDefault()
      if (!skills.includes(customSkill.trim())) {
        setSkills([...skills, customSkill.trim()])
      }
      setCustomSkill('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('profiles').update({
      full_name: fullName,
      phone,
      location,
      skills: skills,
      updated_at: new Date().toISOString()
    }).eq('id', profile.id)

    if (!error) router.refresh()
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-200 space-y-10">
        
        {/* Section 1: Personal Identity */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-8 bg-yellow-500 rounded-full"></div>
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Personal Identification</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity *</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-600 transition-colors" size={16} />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-slate-900 outline-none font-bold text-slate-900 text-xs transition-all"
                  placeholder="Legal Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-600 transition-colors" size={16} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-slate-900 outline-none font-bold text-slate-900 text-xs transition-all"
                  placeholder="+268 ...."
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Geographic Location</label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-600 transition-colors" size={16} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-slate-900 outline-none font-bold text-slate-900 text-xs transition-all"
                placeholder="City, Country"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Skill Matrix */}
        <div className="space-y-6 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-8 bg-yellow-500 rounded-full"></div>
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Skill Matrix & Competencies</h3>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {skills.map((skill: string) => (
              <button key={skill} type="button" onClick={() => toggleSkill(skill)} className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-tight hover:bg-red-900 transition-all border border-slate-800">
                {skill} <X size={12} className="text-yellow-500" />
              </button>
            ))}
          </div>

          <div className="relative group">
            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-500" size={16} />
            <input
              type="text"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={addCustomSkill}
              placeholder="Type custom skill and press Enter..."
              className="w-full pl-11 pr-4 py-3 bg-white border-2 border-slate-200 rounded-2xl focus:border-slate-900 outline-none font-bold text-slate-900 text-xs"
            />
          </div>

          <div className="p-5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem]">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Add Suggestions</p>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => (
                <button key={skill} type="button" onClick={() => toggleSkill(skill)} disabled={skills.includes(skill)} className={`px-3 py-1.5 border-2 rounded-xl text-[10px] font-black transition-all ${skills.includes(skill) ? 'bg-slate-200 text-slate-400 border-transparent opacity-50' : 'bg-white border-slate-200 text-slate-600 hover:border-yellow-500 hover:text-yellow-600'}`}>
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Professional Vault */}
        <div className="p-8 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <FileUp size={16} className="text-yellow-500" /> Professional CV Vault
          </label>
          <input type="file" className="block w-full text-[10px] text-slate-400 file:mr-6 file:py-3 file:px-8 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-yellow-500 file:text-slate-900 cursor-pointer" />
        </div>

        <button type="submit" disabled={loading} className="w-full py-5 bg-slate-950 text-white font-black text-sm uppercase tracking-[0.4em] rounded-2xl hover:bg-slate-800 transition-all shadow-2xl flex items-center justify-center gap-4">
          {loading ? <Loader2 className="animate-spin text-yellow-500" size={20} /> : 'Sync Profile Data'}
        </button>
      </form>
    </div>
  )
}