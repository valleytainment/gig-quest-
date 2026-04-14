import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { MapPin, Calendar, Star, Trophy, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export const ArtistDashboard = () => {
  const { user, profile } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const eventsQuery = query(collection(db, 'events'), where('status', '==', 'open'), orderBy('date', 'asc'));
    const unsubEvents = onSnapshot(eventsQuery, (snapshot) => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'events'));

    const subsQuery = query(collection(db, 'submissions'), where('artistId', '==', user.uid));
    const unsubSubs = onSnapshot(subsQuery, (snapshot) => {
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'submissions'));

    return () => {
      unsubEvents();
      unsubSubs();
    };
  }, [user]);

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !selectedEventId) return;
    
    const formData = new FormData(e.currentTarget);
    
    try {
      await addDoc(collection(db, 'submissions'), {
        eventId: selectedEventId,
        artistId: user.uid,
        status: 'pending',
        portfolioUrl: formData.get('portfolioUrl') || '',
        message: formData.get('message') || '',
        createdAt: serverTimestamp(),
      });
      toast.success('Application submitted! +10 XP');
      setSelectedEventId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'submissions');
      toast.error('Failed to submit application');
    }
  };

  const getSubmissionStatus = (eventId: string) => {
    return submissions.find(s => s.eventId === eventId);
  };

  const xpProgress = ((profile?.xp || 0) % 100) / 100 * 100;

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-8 pb-24 md:pb-8">
      {/* Gamified Header */}
      <div className="elite-card-gold rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-full bg-[#0B0E14] border-4 border-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <span className="font-['Anton'] text-4xl text-[#D4AF37]">{profile?.level || 1}</span>
          </div>
          
          <div className="flex-1 text-center md:text-left w-full">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Trophy className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white">Level {profile?.level || 1} Artist</h2>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono uppercase text-gray-300">
                <span>XP Progress</span>
                <span>{profile?.xp || 0} / {((profile?.level || 1) * 100)}</span>
              </div>
              <div className="h-3 bg-[#0B0E14] rounded-full overflow-hidden border border-[#4A3B1C]">
                <div 
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#8A6B2C] transition-all duration-1000 ease-out relative"
                  style={{ width: `${xpProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open Gigs */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-6 h-6 text-[#D4AF37]" />
          <h3 className="text-2xl font-['Anton'] uppercase tracking-wide text-white">Available Quests</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <div className="col-span-full p-8 text-center border border-dashed border-[#2A3441] rounded-xl text-gray-500 font-mono uppercase text-sm">
              No open gigs right now. Check back later!
            </div>
          ) : (
            events.map(event => {
              const sub = getSubmissionStatus(event.id);
              return (
                <div key={event.id} className="elite-panel flex flex-col h-full overflow-hidden group hover:border-[#D4AF37]/50 transition-colors">
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-lg leading-tight text-white">{event.title}</h4>
                      <span className="bg-[#0B0E14] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold px-2 py-1 rounded shrink-0">
                        +50 XP
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-6 line-clamp-2 flex-1">{event.description}</p>
                    
                    <div className="space-y-2 text-xs font-mono text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#D4AF37]" />
                        {event.date ? format(event.date.toDate(), 'MMM d, yyyy • h:mm a') : 'TBD'}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        {event.location}
                      </div>
                    </div>

                    {sub ? (
                      <div className={`flex items-center justify-center gap-2 py-3 rounded font-bold uppercase tracking-wider text-sm border ${
                        sub.status === 'approved' ? 'bg-green-500/10 text-green-500 border-green-500/30' :
                        sub.status === 'waitlisted' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' :
                        sub.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/30' :
                        'bg-[#0B0E14] text-gray-400 border-[#2A3441]'
                      }`}>
                        {sub.status === 'approved' && <CheckCircle2 className="w-4 h-4" />}
                        {sub.status === 'rejected' && <XCircle className="w-4 h-4" />}
                        {sub.status === 'waitlisted' && <AlertCircle className="w-4 h-4" />}
                        {sub.status === 'pending' && <Clock className="w-4 h-4" />}
                        {sub.status === 'pending' ? 'View Status' : sub.status}
                      </div>
                    ) : (
                      <Dialog open={selectedEventId === event.id} onOpenChange={(open) => setSelectedEventId(open ? event.id : null)}>
                        <DialogTrigger asChild>
                          <button className="w-full elite-btn-gold py-3 rounded font-bold uppercase tracking-wider text-sm">
                            Secure Your Stage Time
                          </button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#111520] border-[#2A3441] text-gray-100">
                          <DialogHeader>
                            <DialogTitle className="font-['Anton'] text-2xl tracking-wide uppercase text-[#D4AF37]">Enter the Lineup</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleApply} className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="portfolioUrl" className="text-xs font-mono uppercase text-gray-400">Portfolio / Demo Link</Label>
                              <Input id="portfolioUrl" name="portfolioUrl" type="url" placeholder="https://..." className="bg-[#0B0E14] border-[#2A3441] text-white" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="message" className="text-xs font-mono uppercase text-gray-400">Pitch (Optional)</Label>
                              <Input id="message" name="message" placeholder="Why should we pick you?" className="bg-[#0B0E14] border-[#2A3441] text-white" />
                            </div>
                            <div className="flex gap-3 pt-4">
                              <button type="button" className="flex-1 elite-btn-dark py-2 rounded" onClick={() => setSelectedEventId(null)}>
                                Back
                              </button>
                              <button type="submit" className="flex-[2] elite-btn-gold py-2 rounded font-bold">
                                Submit Application
                              </button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
