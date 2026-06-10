import React from 'react';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../lib/firebase';
import { LogOut, LayoutDashboard, Calendar, Mail, Settings, Box, Compass, Trophy, ClipboardList, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const Layout = () => {
  const { user, profile, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="gq-shell flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#d4af37]/25 border-t-[#d4af37]" />
          <p className="font-mono text-sm uppercase tracking-widest text-gray-400">Loading system</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect artists away from admin routes
  if (!isAdmin && location.pathname.startsWith('/admin')) {
    return <Navigate to="/artist" replace />;
  }

  // Redirect admins away from artist routes
  if (isAdmin && location.pathname.startsWith('/artist')) {
    return <Navigate to="/admin" replace />;
  }

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: Box },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Applications', path: '/admin/applications', icon: ClipboardList },
    { name: 'Emails', path: '/admin/emails', icon: Mail },
  ];

  const artistLinks = [
    { name: 'My Quests', path: '/artist', icon: LayoutDashboard },
    { name: 'Discover Gigs', path: '/artist/discover', icon: Compass },
    { name: 'Leaderboard', path: '/artist/leaderboard', icon: Trophy },
  ];

  const navLinks = isAdmin ? adminLinks : artistLinks;

  return (
    <div className="min-h-screen bg-[#0B0E14] text-gray-100 font-sans flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-[#0B0E14] border-b border-[#2A3441] flex items-center justify-between px-6 shrink-0 z-20 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-b from-[#D4AF37] to-[#8A6B2C] rounded flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
            <Box className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold text-lg tracking-widest text-white hidden sm:block">
            <span className="text-[#D4AF37]">ELITE</span> PERFORM <span className="font-normal text-gray-400 text-sm ml-1">{isAdmin ? 'MANAGER' : 'ARTIST'}</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`pb-1 border-b-2 transition-colors ${location.pathname === link.path ? 'text-white border-[#D4AF37]' : 'border-transparent hover:text-white'}`}
            >
              {link.name}
            </Link>
          ))}
          <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-1">Settings <span className="text-[10px]">▼</span></span>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 bg-[#111520] border border-[#2A3441] rounded-full pl-2 pr-4 py-1 shadow-inner">
            <Avatar className="w-7 h-7 border border-[#2A3441]">
              <AvatarImage src={profile?.photoURL || ''} />
              <AvatarFallback className="bg-[#1A2130] text-xs text-gray-400">{profile?.displayName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-300 font-medium">{profile?.displayName} <span className="text-[10px] ml-1 text-gray-500">▼</span></span>
          </div>
          <button onClick={logout} className="text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-20 bg-[#0B0E14] border-r border-[#2A3441] hidden md:flex flex-col items-center py-6 gap-6 shrink-0 z-10">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path}
                to={link.path} 
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${isActive ? 'text-[#D4AF37] bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-medium text-center leading-tight">{link.name.split(' ')[0]}</span>
              </Link>
            );
          })}
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg text-gray-500 hover:text-gray-300 cursor-pointer transition-all mt-auto">
            <Settings className="w-6 h-6" />
            <span className="text-[10px] font-medium">Settings</span>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto elite-bg relative">
          <Outlet />
        </main>
      </div>

      {/* Mobile Navigation (Bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B0E14]/95 backdrop-blur-md border-t border-[#2A3441] p-4 flex justify-around items-center z-50 pb-safe">
        {navLinks.slice(0, 2).map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link 
              key={link.path}
              to={link.path} 
              className={`flex flex-col items-center gap-1 ${isActive ? 'text-[#D4AF37]' : 'text-gray-500'}`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium uppercase tracking-wider">{link.name.split(' ')[0]}</span>
            </Link>
          );
        })}
        <div className="flex flex-col items-center gap-1 text-gray-500">
          <Avatar className="w-6 h-6 border border-[#2A3441]">
            <AvatarImage src={profile?.photoURL || ''} />
            <AvatarFallback className="bg-[#1A2130] text-[8px]">{profile?.displayName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <span className="text-[10px] font-medium uppercase tracking-wider">Profile</span>
        </div>
      </nav>
    </div>
  );
};
