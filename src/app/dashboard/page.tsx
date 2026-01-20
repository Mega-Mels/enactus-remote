import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/dashboard/ProfileForm'
import { Settings, ShieldCheck } from 'lucide-react'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-slate-100 py-16">
      {/* max-w-3xl keeps the form centered and prevents it from filling the screen */}
      <div className="mx-auto px-4 max-w-3xl">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-yellow-500 mb-3">
              <Settings size={12} />
              <span className="text-[10px] font-black uppercase tracking-widest">Account</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
              My <span className="text-yellow-500">Profile.</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span className="text-[10px] font-black text-slate-900 uppercase">Verified</span>
          </div>
        </div>

        {/* The Form Container */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-900/5 border border-slate-200 overflow-hidden">
          <div className="h-1.5 w-full bg-yellow-500"></div>
          <div className="p-8 md:p-10">
            <ProfileForm profile={profile} />
          </div>
        </div>
      </div>
    </div>
  )
}