import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, MapPin, Plus, X, Bell, Video, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { logActivity } from "../lib/firebase";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  location: string;
  isOnline: boolean;
  reminderSet: boolean;
}

export default function Calendar() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem("personal_events");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("personal_events", JSON.stringify(events));
  }, [events]);

  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    type: "Practice",
    location: "",
    isOnline: true,
    reminderSet: false,
  });
  const [activeReminders, setActiveReminders] = useState<Event[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      // Format local date as YYYY-MM-DD
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const currentDate = `${year}-${month}-${day}`;
      
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      const triggered = events.filter(ev => 
        ev.reminderSet && 
        ev.date === currentDate && 
        ev.time === currentTime
      );

      if (triggered.length > 0) {
        setActiveReminders(prev => {
          const newReminders = [...prev];
          triggered.forEach(t => {
            if (!newReminders.find(r => r.id === t.id)) {
              newReminders.push(t);
              // Trigger real browser notification
              if ("Notification" in window && Notification.permission === "granted") {
                new Notification("A2BRIDGE Reminder", {
                  body: `It's time for: ${t.title}`,
                  icon: "/favicon.ico" // Optional, if you have one
                });
              }
            }
          });
          return newReminders;
        });
      }
    }, 10000); // check every 10 seconds

    return () => clearInterval(interval);
  }, [events]);

  const dismissReminder = (id: string) => {
    setActiveReminders(prev => prev.filter(r => r.id !== id));
    setEvents(events.map(ev => ev.id === id ? { ...ev, reminderSet: false } : ev));
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.time) return;

    setEvents([
      ...events,
      {
        id: Date.now().toString(),
        ...newEvent,
      },
    ].sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()));

    if (user) {
      try {
        await logActivity(user.uid, `Added Event: ${newEvent.title}`, `Scheduled a new ${newEvent.type.toLowerCase()} event.`, 'event_added');
      } catch (error) {
        console.error("Failed to log activity:", error);
      }
    }

    setNewEvent({
      title: "",
      date: "",
      time: "",
      type: "Practice",
      location: "",
      isOnline: true,
      reminderSet: false,
    });
    setIsAddingEvent(false);
  };

  const toggleReminder = async (id: string) => {
    const event = events.find(e => e.id === id);
    if (event && !event.reminderSet) {
      if ("Notification" in window) {
        if (Notification.permission !== "granted" && Notification.permission !== "denied") {
          await Notification.requestPermission();
        }
        if (Notification.permission === "denied") {
          alert("Please enable notifications in your browser settings to receive reminders.");
        }
      }
    }
    setEvents(events.map(ev => ev.id === id ? { ...ev, reminderSet: !ev.reminderSet } : ev));
  };

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Event Calendar
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
            Keep track of your personal coding schedule. Add your own events, contests, and deadlines to stay organized.
          </p>
        </div>
        <button 
          onClick={() => setIsAddingEvent(true)}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </motion.div>

      <AnimatePresence>
        {isAddingEvent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative">
              <button 
                onClick={() => setIsAddingEvent(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Create New Event</h2>
              
              <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Event Name</label>
                  <input 
                    type="text" 
                    required
                    value={newEvent.title}
                    onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. Weekly LeetCode Grind"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date</label>
                    <input 
                      type="date" 
                      required
                      value={newEvent.date}
                      onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Time</label>
                    <input 
                      type="time" 
                      required
                      value={newEvent.time}
                      onChange={e => setNewEvent({...newEvent, time: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Location / Link</label>
                  <input 
                    type="text" 
                    value={newEvent.location}
                    onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. Zoom Link or Library"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Event Type</label>
                    <select 
                      value={newEvent.type}
                      onChange={e => setNewEvent({...newEvent, type: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    >
                      <option value="Practice">Practice</option>
                      <option value="Contest">Contest</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Meeting">Meeting</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Format</label>
                    <div className="flex bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden p-1">
                      <button
                        type="button"
                        onClick={() => setNewEvent({...newEvent, isOnline: true})}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${newEvent.isOnline ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                      >
                        <Video className="w-4 h-4" /> Online
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewEvent({...newEvent, isOnline: false})}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${!newEvent.isOnline ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                      >
                        <Users className="w-4 h-4" /> In-person
                      </button>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        checked={newEvent.reminderSet}
                        onChange={e => setNewEvent({...newEvent, reminderSet: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"></div>
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Bell className="w-4 h-4" /> Set Reminder
                    </span>
                  </label>
                  
                  <button 
                    type="submit"
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                  >
                    Save Event
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-teal-500" />
            Upcoming Events
          </h2>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {events.length === 0 ? (
            <div className="p-10 text-center text-slate-500 dark:text-slate-400">
              No upcoming events. Add one above!
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col sm:flex-row gap-6">
                <div className="sm:w-48 flex-shrink-0">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{formatDate(event.date)}</p>
                  <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mt-1">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{event.title}</h3>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                      {event.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      {event.isOnline ? <Video className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                      {event.isOnline ? "Online" : "In-person"}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:w-32 flex items-center sm:justify-end">
                  <button 
                    onClick={() => toggleReminder(event.id)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      event.reminderSet 
                        ? 'bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400' 
                        : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Bell className={`w-4 h-4 ${event.reminderSet ? 'fill-current' : ''}`} />
                    {event.reminderSet ? 'Reminder On' : 'Set Reminder'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Reminder Toasts */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        <AnimatePresence>
          {activeReminders.map(reminder => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-slate-800 border-l-4 border-teal-500 p-4 rounded-xl shadow-2xl flex items-start gap-4 max-w-sm"
            >
              <div className="bg-teal-100 dark:bg-teal-500/20 p-2 rounded-full text-teal-600 dark:text-teal-400 flex-shrink-0">
                <Bell className="w-6 h-6 animate-bounce" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 dark:text-white font-bold text-lg">Reminder: {reminder.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  Your {reminder.type.toLowerCase()} is starting now!
                </p>
                {reminder.location && (
                  <p className="text-slate-500 dark:text-slate-500 text-xs mt-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {reminder.location}
                  </p>
                )}
              </div>
              <button 
                onClick={() => dismissReminder(reminder.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
