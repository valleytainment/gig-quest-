import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signInWithGoogle } from '../lib/firebase';
import { Button } from '../components/ui/button';
import { Mic2, Sparkles, ArrowRight } from 'lucide-react';

export const Landing = () => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return null;

  if (user) {
    return <Navigate to={isAdmin ? "/admin" : "/artist"} replace />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10 px-6 text-center">
        <div className="mb-8 transform -rotate-6">
          <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(242,125,38,0.4)]">
            <Mic2 className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>
        
        <h1 className="font-['Anton'] text-7xl md:text-9xl leading-[0.85] tracking-tight uppercase mb-6">
          Own The<br/><span className="text-primary">Stage</span>
        </h1>
        
        <p className="font-sans text-lg md:text-xl text-zinc-400 max-w-md mb-12 font-medium">
          The gamified platform for artists to book gigs, level up, and get discovered.
        </p>

        <Button 
          size="lg" 
          variant="gamified"
          onClick={signInWithGoogle}
          className="h-14 px-8 text-lg"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Apply to Perform
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      <footer className="z-10 p-6 text-center border-t border-white/10">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-600">
          GigQuest © {new Date().getFullYear()} // Artist Portal
        </p>
      </footer>
    </div>
  );
};
