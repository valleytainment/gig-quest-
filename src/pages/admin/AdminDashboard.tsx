/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟨 MODULE │ gig-quest/src/pages/admin/AdminDashboard.tsx
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @layer          ROUTE
 * @responsibility Admin mission control — events, applications review, legacy submissions
 * @depends-on     firebase, audit, messageTemplates, AuthContext
 * @consumers      App.tsx route "/admin/*"
 * @safe-mode      Requires adminRoles bootstrap; real-time Firestore listeners
 *
 * STRUCTURAL INTENT
 * Primary admin ops surface. Application approve/waitlist/reject writes audit logs.
 * ═══════════════════════════════════════════════════════════════════════════════
 */
import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { logAuditAction } from '../../lib/audit';
import { renderTemplate } from '../../lib/messageTemplates';
import type { ApplicationStatus } from '../../types/applications';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { CalendarPlus, ClipboardList, Mail, Check, X, Search, Plus, Play, ChevronDown, Filter, MoreHorizontal, Calendar } from 'lucide-react';
import { EmptyState } from '../../components/feedback/EmptyState';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [users, setUsers] = useState<Record<string, any>>({});
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'application_approved' | 'application_rejected' | 'application_waitlisted'>('application_approved');

  useEffect(() => {
    if (!user) return;

    const eventsQuery = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const unsubEvents = onSnapshot(eventsQuery, (snapshot) => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'events'));

    const subsQuery = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
    const unsubSubs = onSnapshot(subsQuery, (snapshot) => {
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'submissions'));

    const appsQuery = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
    const unsubApps = onSnapshot(appsQuery, (snapshot) => {
      setApplications(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'applications'));

    const usersQuery = query(collection(db, 'users'));
    const unsubUsers = onSnapshot(usersQuery, (snapshot) => {
      const userMap: Record<string, any> = {};
      snapshot.docs.forEach(doc => {
        userMap[doc.id] = doc.data();
      });
      setUsers(userMap);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'users'));

    return () => {
      unsubEvents();
      unsubSubs();
      unsubApps();
      unsubUsers();
    };
  }, [user]);

  const handleUpdateApplication = async (applicationId: string, status: ApplicationStatus) => {
    if (!user) return;
    const before = applications.find((a) => a.id === applicationId);
    try {
      await updateDoc(doc(db, 'applications', applicationId), {
        status,
        updatedAt: serverTimestamp(),
        reviewedAt: serverTimestamp(),
        reviewedBy: user.uid,
      });
      await logAuditAction({
        actorId: user.uid,
        action: `application_${status}`,
        entityType: 'application',
        entityId: applicationId,
        before,
        after: { status },
      });
      toast.success(`Application marked ${status}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `applications/${applicationId}`);
      toast.error('Failed to update application');
    }
  };

  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);
    try {
      await addDoc(collection(db, 'events'), {
        title: formData.get('title'),
        description: formData.get('description'),
        date: new Date(formData.get('date') as string),
        location: formData.get('location'),
        capacity: Number(formData.get('capacity')) || 20,
        status: 'open',
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      });
      await logAuditAction({
        actorId: user.uid,
        action: 'event_create',
        entityType: 'event',
        entityId: 'new',
        after: { title: formData.get('title') },
      });
      toast.success('Event created successfully');
      setIsCreateOpen(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'events');
      toast.error('Failed to create event');
    }
  };

  const pendingCount = applications.filter(s => s.status === 'new' || s.status === 'reviewing').length;
  const approvedCount = applications.filter(s => s.status === 'approved').length;
  const rejectedCount = applications.filter(s => s.status === 'rejected').length;
  const totalSlots = events.reduce((sum, e) => sum + (e.capacity || 20), 0);
  const filledSlots = applications.filter(s => s.status === 'approved').length;
  const slotsRemaining = Math.max(0, totalSlots - filledSlots);
  const templatePreview = renderTemplate(selectedTemplate, {
    stageName: 'Artist Name',
    eventTitle: 'Sample Event',
    eventDate: 'TBD',
    eventLocation: 'TBD',
  });

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
      
      {/* Top Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="elite-card-gold rounded-xl p-5 flex items-center gap-5 cursor-pointer hover:brightness-110 transition-all" onClick={() => setIsCreateOpen(true)}>
          <div className="w-14 h-14 rounded bg-black/50 border border-[#D4AF37]/30 flex items-center justify-center shadow-inner">
            <CalendarPlus className="w-7 h-7 text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide">Create Event</h3>
            <p className="mt-1 text-xs text-zinc-500">Launch a new quest with capacity and lineup slots</p>
          </div>
        </div>

        <div className="elite-card-blue rounded-xl p-5 flex items-center gap-5 cursor-pointer hover:brightness-110 transition-all">
          <div className="w-14 h-14 rounded bg-black/50 border border-[#4A85C5]/30 flex items-center justify-center shadow-inner">
            <ClipboardList className="w-7 h-7 text-[#4A85C5]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide">View Applications</h3>
            <p className="mt-1 text-xs text-zinc-500">{pendingCount} awaiting review</p>
          </div>
        </div>

        <div className="elite-card-bronze rounded-xl p-5 flex items-center gap-5 cursor-pointer hover:brightness-110 transition-all">
          <div className="w-14 h-14 rounded bg-black/50 border border-[#D47837]/30 flex items-center justify-center shadow-inner">
            <Mail className="w-7 h-7 text-[#D47837]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide">Send Email</h3>
            <p className="mt-1 text-xs text-zinc-500">Template preview in sidebar</p>
          </div>
        </div>
      </div>

      {/* Alert Bar */}
      <div className="elite-panel mb-8 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <Check className="text-green-500 w-6 h-6" />
            <span className="text-white font-medium text-lg">New Applications</span>
            <span className="text-green-500 font-bold text-2xl">{pendingCount}</span>
            <span className="text-gray-400 text-sm">Awaiting Review</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-[#2A3441]"></div>
          <div className="flex items-center gap-3">
            <X className="text-[#D4AF37] w-6 h-6" />
            <span className="text-white font-medium text-lg">Slots Left</span>
            <span className="text-[#D4AF37] font-bold text-2xl">{slotsRemaining}</span>
            <span className="text-gray-400 text-sm">Remaining Slots</span>
          </div>
        </div>
        <button className="elite-btn-blue px-5 py-2.5 rounded text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> View Applications
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Content: Events Table */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Your Events</h2>
            <div className="flex gap-3">
              <button className="elite-btn-dark px-4 py-2 rounded text-sm flex items-center gap-2">
                <Filter className="w-4 h-4" /> All Upcoming Events <ChevronDown className="w-4 h-4" />
              </button>
              <button className="elite-btn-dark px-4 py-2 rounded text-sm flex items-center gap-2">
                <MoreHorizontal className="w-4 h-4" /> More Filters <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="elite-panel overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-[#2A3441] text-gray-400 text-sm">
                  <th className="p-5 font-medium">Event</th>
                  <th className="p-5 font-medium">Date</th>
                  <th className="p-5 font-medium">Venue / Location</th>
                  <th className="p-5 font-medium text-center">Performers</th>
                  <th className="p-5 font-medium text-center">Slots Left</th>
                  <th className="p-5 font-medium text-center">Status</th>
                  <th className="p-5 font-medium text-right"></th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => {
                  const approvedForEvent = applications.filter(s => s.eventId === event.id && s.status === 'approved').length;
                  const maxSlots = event.capacity || 20;
                  const slotsLeft = Math.max(0, maxSlots - approvedForEvent);
                  const isClosed = event.status === 'closed' || slotsLeft <= 0;

                  return (
                    <tr key={event.id} className="border-b border-[#2A3441]/50 hover:bg-white/5 transition-colors">
                      <td className="p-5 font-bold text-white text-base">{event.title}</td>
                      <td className="p-5 text-gray-300">{event.date ? format(event.date.toDate(), 'MMM d, yyyy') : 'TBD'}</td>
                      <td className="p-5 text-gray-300">{event.location}</td>
                      <td className="p-5 text-center text-gray-300 font-mono">
                        {approvedForEvent} / {maxSlots}
                      </td>
                      <td className="p-5 text-center text-gray-300 font-mono flex items-center justify-center gap-2">
                        {slotsLeft} / {maxSlots}
                        <div className={`w-2 h-2 rounded-full ${isClosed ? 'bg-red-500' : 'bg-green-500'}`}></div>
                      </td>
                      <td className="p-5 text-center">
                        <span className={`text-xs font-bold px-3 py-1.5 rounded border ${isClosed ? 'border-red-500/30 text-red-500 bg-red-500/10' : 'border-green-500/30 text-green-500 bg-green-500/10'}`}>
                          {isClosed ? 'CLOSED' : 'OPEN'}
                        </span>
                      </td>
                      <td className="p-5 text-right space-x-2">
                        <button className="elite-btn-dark px-4 py-1.5 rounded text-xs font-medium">View</button>
                        <button className="elite-btn-dark px-4 py-1.5 rounded text-xs font-medium">Edit</button>
                      </td>
                    </tr>
                  );
                })}
                {events.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">No events found. Create one above.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="p-5 border-t border-[#2A3441] flex justify-center">
              <button className="elite-btn-blue px-6 py-2 rounded text-sm font-medium flex items-center gap-2" onClick={() => setIsCreateOpen(true)}>
                <Plus className="w-4 h-4" /> Create Event
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* Applications Overview */}
          <div className="elite-panel p-6">
            <h3 className="text-white font-bold text-lg mb-5">Applications Overview</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm border-b border-[#2A3441] pb-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <Search className="w-4 h-4"/> 
                  <span className="text-white font-bold text-lg">{applications.length}</span> 
                  Total Applications
                </div>
              </div>
              <div className="flex items-center justify-between text-sm bg-white/5 p-3 rounded border border-[#2A3441]">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-4 h-4 bg-[#D4AF37]/20 rounded flex items-center justify-center border border-[#D4AF37]/50">
                    <Plus className="w-3 h-3 text-[#D4AF37]" />
                  </div>
                  <span className="text-white font-bold text-lg">{pendingCount}</span> 
                  Awaiting Review
                </div>
              </div>
              <div className="flex items-center justify-between text-sm border-b border-[#2A3441] pb-3 pt-2">
                <div className="flex items-center gap-3 text-gray-400">
                  <Check className="w-4 h-4 text-green-500"/> 
                  <span className="text-white font-bold text-lg">{approvedCount}</span> 
                  Approved
                </div>
              </div>
              <div className="flex items-center justify-between text-sm pt-2">
                <div className="flex items-center gap-3 text-gray-400">
                  <Play className="w-4 h-4 text-red-500 rotate-90"/> 
                  <span className="text-white font-bold text-lg">{rejectedCount}</span> 
                  Declined
                </div>
              </div>
            </div>
          </div>

          {/* Application Review */}
          <div className="elite-panel p-6 max-h-[420px] overflow-y-auto">
            <h3 className="text-white font-bold text-lg mb-4">Review Queue</h3>
            <div className="space-y-3">
              {applications.slice(0, 8).map((app) => (
                <div key={app.id} className="rounded border border-[#2A3441] bg-black/20 p-3 text-sm">
                  <p className="font-semibold text-white">{app.artistSnapshot?.stageName || 'Artist'}</p>
                  <p className="text-gray-400 text-xs">{app.artistSnapshot?.email}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#D4AF37]">{app.status}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <button className="elite-btn-dark px-2 py-1 text-[10px] rounded" onClick={() => handleUpdateApplication(app.id, 'approved')}>Approve</button>
                    <button className="elite-btn-dark px-2 py-1 text-[10px] rounded" onClick={() => handleUpdateApplication(app.id, 'waitlisted')}>Waitlist</button>
                    <button className="elite-btn-dark px-2 py-1 text-[10px] rounded" onClick={() => handleUpdateApplication(app.id, 'rejected')}>Reject</button>
                  </div>
                </div>
              ))}
              {applications.length === 0 && (
                <EmptyState
                  icon={ClipboardList}
                  title="Review queue empty"
                  description="Applications from the landing page and artist portal will appear here."
                />
              )}
            </div>
          </div>

          {/* Message Templates */}
          <div className="elite-panel p-6">
            <h3 className="text-white font-bold text-lg mb-4">Message Templates</h3>
            <select
              className="w-full rounded bg-[#0B0E14] border border-[#2A3441] px-3 py-2 text-sm text-white mb-3"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value as typeof selectedTemplate)}
            >
              <option value="application_approved">Approval</option>
              <option value="application_waitlisted">Waitlist</option>
              <option value="application_rejected">Rejection</option>
            </select>
            <p className="text-xs text-gray-400 font-mono whitespace-pre-wrap">{templatePreview.body}</p>
          </div>

          {/* Quick Actions */}
          <div className="elite-panel p-6">
            <h3 className="text-white font-bold text-lg mb-5">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full elite-btn-dark px-4 py-3 rounded text-sm font-medium flex items-center gap-3 justify-start">
                <ClipboardList className="w-4 h-4 text-gray-400" /> Review Applications
              </button>
              <button className="w-full elite-btn-dark px-4 py-3 rounded text-sm font-medium flex items-center gap-3 justify-start">
                <Mail className="w-4 h-4 text-gray-400" /> Send Email Blast
              </button>
              <button className="w-full elite-btn-dark px-4 py-3 rounded text-sm font-medium flex items-center gap-3 justify-start">
                <CalendarPlus className="w-4 h-4 text-gray-400" /> Manage Events
              </button>
              <button className="w-full elite-btn-blue px-4 py-3 rounded text-sm font-medium mt-4">
                View Reports
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Create Event Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-[#111520] border-[#2A3441] text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Create Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateEvent} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-mono uppercase text-gray-400">Title</Label>
              <Input id="title" name="title" required className="bg-[#0B0E14] border-[#2A3441] text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs font-mono uppercase text-gray-400">Description</Label>
              <Input id="description" name="description" required className="bg-[#0B0E14] border-[#2A3441] text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-xs font-mono uppercase text-gray-400">Date & Time</Label>
                <Input id="date" name="date" type="datetime-local" required className="bg-[#0B0E14] border-[#2A3441] text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-xs font-mono uppercase text-gray-400">Location</Label>
                <Input id="location" name="location" required className="bg-[#0B0E14] border-[#2A3441] text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity" className="text-xs font-mono uppercase text-gray-400">Capacity</Label>
              <Input id="capacity" name="capacity" type="number" min={1} defaultValue={20} required className="bg-[#0B0E14] border-[#2A3441] text-white" />
            </div>
            <div className="flex gap-3 pt-4">
              <button type="button" className="flex-1 elite-btn-dark py-2 rounded" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="flex-[2] elite-btn-gold py-2 rounded font-bold">
                Deploy Event
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
