import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/dashboard/ProfileForm'

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
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
          My Profile
        </h1>
        <p className="text-slate-600 mb-8 font-medium">
          Update your information and manage your account
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {/* Removed userId prop as it is already inside the profile object */}
          <ProfileForm profile={profile} />
        </div>
      </div>
    </div>
  )
}