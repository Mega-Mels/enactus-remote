'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { useEffect, useState } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { User, LogOut } from 'lucide-react'

export default function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="Enactus Remote Logo"
              width={80}
              height={40}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">Home</Link>
          <Link href="/opportunities" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">Jobs</Link>
          <Link href="/learning" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">Academy</Link>
          <Link href="/donate" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">Donate</Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="h-10 w-10 animate-pulse bg-slate-100 rounded-full" />
          ) : user ? (
            <div className="flex items-center gap-2">
              {/* PROFILE BUTTON - Link renamed to "Profile" */}
              <Link
                href="/dashboard"
                className="group flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-200"
                title="View Profile"
              >
                <div className="hidden lg:block text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">View</p>
                  <p className="text-xs font-bold text-slate-700 truncate max-w-[120px]">
                    Profile
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:bg-yellow-500 group-hover:text-slate-900 transition-colors">
                  <User size={18} />
                </div>
              </Link>
              
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900">
                Log In
              </Link>
              <Link href="/signup" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}