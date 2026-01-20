'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'

type ProfileFormProps = {
  profile: any
  userId?: string // The '?' makes it optional, fixing the error
}

export default function ProfileForm({ profile, userId }: ProfileFormProps) {
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [phone, setPhone] = useState(profile?.phone || '')
  const [location, setLocation] = useState(profile?.location || '')
  const [skills, setSkills] = useState(profile?.skills?.join(', ') || '')
  const [resumeUrl, setResumeUrl] = useState(profile?.resume_url || '')
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      setError(null)

      if (!e.target.files || e.target.files.length === 0) {
        return
      }

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}-${Math.random()}.${fileExt}`
      const filePath = `resumes/${fileName}`

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath)

      setResumeUrl(data.publicUrl)
      
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Convert skills string to array
      const skillsArray = skills
        .split(',')
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone,
          location,
          skills: skillsArray,
          resume_url: resumeUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id)

      if (updateError) throw updateError

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
          ✅ Profile updated successfully!
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email (Read Only) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            disabled
            value={profile?.email || ''}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            placeholder="Your full name"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            placeholder="+268 7636 8299"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            placeholder="Mbabane, Eswatini"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Skills
          </label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            placeholder="e.g., JavaScript, Python, Data Analysis"
          />
          <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Resume / CV
          </label>
          
          {resumeUrl && (
            <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
              <span className="text-sm text-green-700">✓ Resume uploaded</span>
              <a 
                href={resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                View →
              </a>
            </div>
          )}

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            disabled={uploading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            {uploading ? 'Uploading...' : 'PDF, DOC, or DOCX (max 5MB)'}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full py-4 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

      {/* Account Info */}
      <div className="mt-8 pt-8 border-t">
        <h3 className="font-bold mb-4">Account Information</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Status:</strong> <span className="text-green-600 font-semibold">Active</span></p>
          <p><strong>Member since:</strong> {new Date(profile?.created_at).toLocaleDateString()}</p>
          <p><strong>Role:</strong> {profile?.role || 'User'}</p>
        </div>
      </div>
    </div>
  )
}