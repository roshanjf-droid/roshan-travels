import React, { useState } from 'react';
// 1. IMPORT THE TRAVEL MAP HERE
import TravelMap from './components/TravelMap';

const TRIPS = [
  {
    id: 'vietnam-2026',
    title: 'Vietnam Exploration',
    dates: 'Jan – Feb 2026',
    status: 'Completed',
    category: 'International',
    location: 'Vietnam',
    description: 'Immersed in cultures, coastal landscapes, and vibrant street foods across Vietnam.',
    tags: ['Culture', 'Coast', 'Food'],
    color: 'from-amber-500 to-red-600'
  },
  {
    id: 'sea-circuit-2026',
    title: 'Southeast Asia & Regional Circuit',
    dates: 'Mar – Apr 2026',
    status: 'Completed',
    category: 'International',
    location: 'Philippines • Malaysia • Macau • Colombo',
    description: 'Multi-country travel loop connecting island hops, city skylines, and heritage stops.',
    tags: ['Multi-Country', 'Islands', 'City'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'mysore-2026',
    title: 'Mysore Getaway',
    dates: 'June 2026',
    status: 'Completed',
    category: 'Domestic',
    location: 'Mysore, India',
    description: 'Short heritage escape exploring palace architecture and local weekend sights.',
    tags: ['Heritage', 'Weekend'],
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'maldives-2026',
    title: 'Hanoi, KL & The Maldives',
    dates: 'July 2026',
    status: 'Ongoing / Next',
    category: 'International',
    location: 'Hanoi • Kuala Lumpur • Maldives',
    description: 'Flight routes connecting dynamic transit hubs with a relaxing island retreat.',
    tags: ['Transit', 'Island', 'Beach'],
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'mauritius-2026',
    title: 'Mauritius Retreat',
    dates: 'Upcoming Plan',
    status: 'Upcoming',
    category: 'International',
    location: 'Mauritius',
    description: 'Extended multi-week stay to recharge surrounded by coastal turquoise waters.',
    tags: ['Long Stay', 'Relaxation'],
    color: 'from-teal-400 to-emerald-600'
  },
  {
    id: 'nepal-bucketlist',
    title: 'Nepal & Pokhara Trails',
    dates: 'Future Bucket List',
    status: 'Upcoming',
    category: 'International',
    location: 'Nepal • Pokhara',
    description: 'Future mountain valley exploration and trekking routes around Pokhara.',
    tags: ['Himalayas', 'Trekking', 'Nature'],
    color: 'from-purple-500 to-indigo-600'
  }
];

export default function App() {
  const [filter, setFilter] = useState('All');

  const filteredTrips = TRIPS.filter(trip => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return trip.status === 'Completed';
    if (filter === 'Upcoming') return trip.status === 'Upcoming' || trip.status === 'Ongoing / Next';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* HEADER HERO */}
      <header className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border-b border-slate-800 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Personal Travel Log & Dashboard
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            Roshan Joran Fernandes
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl font-light">
            Senior Aerospace Lead • Travel Enthusiast • Bengaluru, India
          </p>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto px-6 mt-10">
        
        {/* 2. INTERACTIVE TRAVEL MAP COMES IN RIGHT HERE */}
        <TravelMap />

        {/* FILTER BUTTONS */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>✈️</span> Travel Timeline
          </h2>
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            {['All', 'Completed', 'Upcoming'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  filter === tab
                    ? 'bg-teal-500 text-slate-950 shadow-md font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* TRIP CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredTrips.map(trip => (
            <div
              key={trip.id}
              className="group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className={`h-2 w-full bg-gradient-to-r ${trip.color}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      {trip.dates}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        trip.status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {trip.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">
                    {trip.title}
                  </h3>
                  <p className="text-xs text-teal-400/90 font-medium mb-3">
                    📍 {trip.location}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {trip.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex flex-wrap gap-1.5">
                {trip.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ROUTINES & LIFESTYLE HIGHLIGHTS */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🌿</span> Life & Routine Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/80">
              <h3 className="text-lg font-semibold text-teal-400 mb-2">Morning Routine & Fitness</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Enjoying late-morning walks through <strong>Cubbon Park</strong> tuned into audiobooks, alongside full-court tennis sessions.
              </p>
            </div>
            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/80">
              <h3 className="text-lg font-semibold text-teal-400 mb-2">Culinary Experiments</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Exploring quick, healthy air-fryer recipes—balancing home routines with extended multi-week regional travels.
              </p>
            </div>
          </div>
        </div>

      </main>

      <footer className="text-center text-slate-600 text-xs mt-16">
        Designed & Built Collaboratively • Roshan Joran Fernandes
      </footer>
    </div>
  );
}