import React, { useState } from 'react';
import { X, Plane, Sparkles, Key, Mail, Lock, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  onDirectDemoMode: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onDirectDemoMode,
}) => {
  const [email, setEmail] = useState('engineer@uyaree.aero');
  const [password, setPassword] = useState('••••••••••••');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl glow-cyan">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 mx-auto mb-3">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Plane className="w-6 h-6 text-cyan-400 -rotate-45" />
            </div>
          </div>
          <h2 className="text-2xl font-bold font-mono text-slate-100">Access UYAREE Console</h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">Aerospace Maintenance & Simulation Login</p>
        </div>

        {/* PROMINENT DEMO MODE BUTTON FOR JUDGES */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 border border-cyan-500/50 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-cyan-300 font-bold mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400 fill-current" />
            <span>HACKATHON / JUDGE ENTRY</span>
          </div>
          <button
            onClick={() => {
              onDirectDemoMode();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-[1.02]"
          >
            Enter Demo Mode (No Setup Required)
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-[10px] font-mono text-slate-500 uppercase">Or Sign In With Credentials</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-slate-300 mb-1">Engineering Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="engineer@uyaree.aero"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-slate-300">Password</label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[10px] text-cyan-400 hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-700"
          >
            <span>Log In to Mission Control</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
