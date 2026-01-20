'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { CreditCard, ShieldCheck, User, Mail, Send, Loader2 } from 'lucide-react'

export default function DonationForm() {
  const [paymentMethod, setPaymentMethod] = useState('momo')
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(100)
  const [amount, setAmount] = useState(100)
  const [loading, setLoading] = useState(false)

  // Official Logo URLs
  const MTN_LOGO = "https://upload.wikimedia.org/wikipedia/commons/9/93/MTN_Logo.svg"
  const PAYPAL_LOGO = "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"

  return (
    <div className="space-y-10">
      {/* 1. Amount Selection - High Contrast */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">
          Select Contribution (SZL)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[100, 250, 500, 1000].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => {setSelectedAmount(amt); setAmount(amt)}}
              className={`py-4 rounded-2xl font-black text-sm transition-all border-2 ${
                selectedAmount === amt 
                  ? 'border-yellow-500 bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20' 
                  : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
              }`}
            >
              E{amt}
            </button>
          ))}
          <button 
            type="button"
            onClick={() => setSelectedAmount('custom')}
            className={`py-4 rounded-2xl font-black text-xs border-2 transition-all ${
              selectedAmount === 'custom' 
                ? 'border-yellow-500 bg-yellow-500 text-slate-900' 
                : 'border-slate-100 bg-slate-50 text-slate-500'
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      {/* 2. Payment Methods with Branded Logos */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">
          Payment Method
        </label>
        <div className="grid grid-cols-3 gap-4">
          {/* Card Option */}
          <button 
            type="button"
            onClick={() => setPaymentMethod('card')} 
            className={`flex flex-col items-center p-5 rounded-3xl border-2 transition-all ${
              paymentMethod === 'card' ? 'border-slate-900 bg-slate-900 text-white shadow-xl' : 'border-slate-100 bg-slate-50 text-slate-400'
            }`}
          >
            <CreditCard size={24} className={paymentMethod === 'card' ? 'text-yellow-500' : ''} />
            <span className="text-[9px] font-black mt-2 uppercase">Card</span>
          </button>

          {/* MoMo Option with Image Logo */}
          <button 
            type="button"
            onClick={() => setPaymentMethod('momo')} 
            className={`flex flex-col items-center p-5 rounded-3xl border-2 transition-all ${
              paymentMethod === 'momo' ? 'border-yellow-400 bg-yellow-400 shadow-xl' : 'border-slate-100 bg-slate-50'
            }`}
          >
            <img src={MTN_LOGO} alt="MTN MoMo" className="h-7 w-7 mb-1 object-contain" />
            <span className="text-[9px] font-black uppercase text-slate-900">MoMo</span>
          </button>

          {/* PayPal Option with Image Logo */}
          <button 
            type="button"
            onClick={() => setPaymentMethod('paypal')} 
            className={`flex flex-col items-center p-5 rounded-3xl border-2 transition-all ${
              paymentMethod === 'paypal' ? 'border-[#003087] bg-[#003087] text-white shadow-xl' : 'border-slate-100 bg-slate-50 text-slate-400'
            }`}
          >
            <img src={PAYPAL_LOGO} alt="PayPal" className="h-6 w-6 mb-1 brightness-0 invert object-contain" />
            <span className="text-[9px] font-black uppercase">PayPal</span>
          </button>
        </div>
      </div>

      {/* 3. Branded Interaction Card (Dark Theme) */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden min-h-[220px] flex flex-col justify-center border border-slate-800">
        <div className="absolute top-0 right-0 p-8 opacity-10"><ShieldCheck size={100} /></div>
        
        {paymentMethod === 'momo' && (
          <div className="relative z-10 text-center animate-in zoom-in duration-300">
             <img src={MTN_LOGO} alt="MTN" className="h-12 w-12 mx-auto mb-4" />
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Mobile Money Number</p>
             <input 
                type="tel"
                className="w-full max-w-xs mx-auto block bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-center text-2xl font-black text-yellow-400 outline-none focus:border-yellow-500 transition-all" 
                placeholder="76•• ••••" 
             />
          </div>
        )}

        {paymentMethod === 'card' && (
          <div className="relative z-10 space-y-4 animate-in slide-in-from-right-4">
             <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-6 py-4 text-lg font-bold tracking-widest outline-none focus:border-yellow-500 placeholder:text-slate-600" placeholder="CARD NUMBER" />
             <div className="grid grid-cols-2 gap-4">
               <input className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-4 text-sm font-bold outline-none" placeholder="MM/YY" />
               <input className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-4 text-sm font-bold outline-none" placeholder="CVC" />
             </div>
          </div>
        )}

        {paymentMethod === 'paypal' && (
          <div className="relative z-10 text-center animate-in zoom-in">
             <img src={PAYPAL_LOGO} alt="PayPal" className="h-10 w-10 mx-auto mb-4 brightness-0 invert" />
             <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Redirecting to Secure Checkout</p>
          </div>
        )}
      </div>

      {/* 4. Donor Information & Final Action */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-900 text-sm outline-none focus:border-slate-900 placeholder:text-slate-400" placeholder="Full Name (Optional)" />
          <input className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-900 text-sm outline-none focus:border-slate-900 placeholder:text-slate-400" placeholder="Email Address *" required />
        </div>
        <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 py-6 rounded-[2rem] font-black text-xl shadow-xl shadow-yellow-500/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
          {loading ? <Loader2 className="animate-spin" /> : <>Complete Contribution <Send size={20} /></>}
        </button>
      </div>
    </div>
  )
}