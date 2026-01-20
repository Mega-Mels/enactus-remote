import Link from 'next/link'
import Image from 'next/image'
import { Briefcase, GraduationCap, Globe, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section - Solid, High-Contrast Design */}
      <section className="relative bg-slate-900 text-white py-24 lg:py-32 overflow-hidden">
        {/* Subtle Background Pattern/Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-widest uppercase bg-yellow-500 text-slate-900 rounded-full">
            Eswatini's Premier Remote Work Portal
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight">
            Empowering the <br />
            <span className="text-yellow-400">Digital Generation</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Bridge the gap between local talent and global demand. Access world-class certifications and remote career opportunities from Eswatini.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link href="/opportunities" className="group flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-black transition-all shadow-xl shadow-yellow-500/20">
              Explore Jobs <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/learning" className="flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-black transition-all border border-slate-700">
              Start Learning
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Clean & Geometric */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-2">
            <p className="text-5xl font-black text-slate-900">500+</p>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Certified Students</p>
          </div>
          <div className="space-y-2">
            <p className="text-5xl font-black text-slate-900">50+</p>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Global Hiring Partners</p>
          </div>
          <div className="hidden md:block space-y-2">
            <p className="text-5xl font-black text-slate-900">E100k</p>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Community Investment</p>
          </div>
        </div>
      </section>

      {/* Features Section - Modern Grid with Professional Icons */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6">Built for the Global Economy</h2>
            <p className="text-slate-600 font-medium">We provide the infrastructure Swati youth need to thrive in a borderless workforce.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:border-yellow-500 transition-colors group">
              <div className="w-14 h-14 bg-slate-900 text-yellow-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Briefcase size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Remote Marketplace</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Curated high-ticket remote roles specifically vetted for accessibility and payment reliability in Eswatini.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:border-yellow-500 transition-colors group">
              <div className="w-14 h-14 bg-slate-900 text-yellow-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Elite Upskilling</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Partnered with global providers to offer certifications in High-Income Skills like Data, Tech, and Digital Marketing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:border-yellow-500 transition-colors group">
              <div className="w-14 h-14 bg-slate-900 text-yellow-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Global Network</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Connect directly with international mentors and build a professional network that transcends geographical borders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Bold & Solid */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full"></div>
          <h2 className="relative text-3xl md:text-5xl font-black text-white mb-8">
            Ready to accelerate your <br /> career path?
          </h2>
          <div className="relative flex flex-col items-center gap-6">
            <Link href="/signup" className="w-full sm:w-auto bg-yellow-500 text-slate-900 px-12 py-5 rounded-2xl font-black text-xl hover:bg-yellow-400 transition shadow-xl shadow-yellow-500/10">
              Create Your Free Account
            </Link>
            <div className="flex items-center gap-4 text-slate-400 text-sm font-bold">
               <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-yellow-500" /> Free Forever</span>
               <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-yellow-500" /> Exclusive Leads</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}