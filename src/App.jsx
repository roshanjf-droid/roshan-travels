import React, { useState, useEffect } from 'react';
import TravelMap from './components/TravelMap';

// Initial default trips if local storage is empty
const DEFAULT_TRIPS = [
  {
    id: 'vietnam-2026',
    title: 'Vietnam Exploration',
    dates: 'Jan – Feb 2026',
    status: 'Completed',
    location: 'Vietnam',
    description: 'Immersed in cultures, coastal landscapes, and vibrant street foods across Vietnam.',
    tags: 'Culture, Coast, Food',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    color: 'from-amber-500 to-red-600'
  },
  {
    id: 'sea-circuit-2026',
    title: 'Southeast Asia & Regional Circuit',
    dates: 'Mar – Apr 2026',
    status: 'Completed',
    location: 'Philippines • Malaysia • Macau • Colombo',
    description: 'Multi-country travel loop connecting island hops, city skylines, and heritage stops.',
    tags: 'Multi-Country, Islands, City',
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'mysore-2026',
    title: 'Mysore Getaway',
    dates: 'June 2026',
    status: 'Completed',
    location: 'Mysore, India',
    description: 'Short heritage escape exploring palace architecture and local weekend sights.',
    tags: 'Heritage, Weekend',
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f423b971?auto=format&fit=crop&w=800&q=80',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'maldives-2026',
    title: 'Hanoi, KL & The Maldives',
    dates: 'July 2026',
    status: 'Ongoing / Next',
    location: 'Hanoi • Kuala Lumpur • Maldives',
    description: 'Flight routes connecting dynamic transit hubs with a relaxing island retreat.',
    tags: 'Transit, Island, Beach',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'mauritius-2026',
    title: 'Mauritius Retreat',
    dates: 'Upcoming Plan',
    status: 'Upcoming',
    location: 'Mauritius',
    description: 'Extended multi-week stay to recharge surrounded by coastal turquoise waters.',
    tags: 'Long Stay, Relaxation',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    color: 'from-teal-400 to-emerald-600'
  }
];

export default function App() {
  // Load trips from LocalStorage if available, else use DEFAULT_TRIPS
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('roshan_travel_trips');
    return saved ? JSON.parse(saved) : DEFAULT_TRIPS;
  });

  const [filter, setFilter] = useState('All');
  const [isAdmin, setIsAdmin] = useState(false);

  // Form State for Adding a New Trip
  const [newTrip, setNewTrip] = useState({
    title: '',
    dates: '',
    status: 'Completed',
    location: '',
    description: '',
    tags: '',
    imageUrl: ''
  });

  // Save to LocalStorage whenever trips array updates
  useEffect(() => {
    localStorage.setItem('roshan_travel_trips', JSON.stringify(trips));
  }, [trips]);

  // Add Trip Handler
  const handleAddTrip = (e) => {
    e.preventDefault();
    if (!newTrip.title || !newTrip.location) return;

    const created = {
      ...newTrip,
      id: Date.now().toString(),
      color: 'from-teal-500 to-emerald-600'
    };

    setTrips([created, ...trips]);
    setNewTrip({
      title: '',
      dates: '',
      status: 'Completed',
      location: '',
      description: '',
      tags: '',
      imageUrl: ''
    });
  };

  // Delete Trip Handler
  const handleDeleteTrip = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setTrips(trips.filter(t => t.id !== id));
    }
  };

  // Reset to default data
  const handleResetData = () => {
    if (window.confirm('Reset all trip entries to default data?')) {
      setTrips(DEFAULT_TRIPS);
    }
  };

  const filteredTrips = trips.filter(trip => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return trip.status === 'Completed';
    if (filter === 'Upcoming') return trip.status === 'Upcoming' || trip.status === 'Ongoing / Next';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      
      {/* HEADER HERO */}
      <header className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border-b border-slate-800 py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto relative">
          
          {/* ADMIN TOGGLE BUTTON */}
          <div className="absolute top-0 right-0">
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                isAdmin
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {isAdmin ? '🔓 Edit Mode ACTIVE' : '🔒 Enable Edit Mode'}
            </button>
          </div>

          <span className="inline-block px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Personal Travel Log & Dashboard
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
            Roshan Joran Fernandes
          </h1>
          <p className="text-slate-400 text-base sm:text-lg font-light">
            Senior Aerospace Lead • Travel Enthusiast • Bengaluru, India
          </p>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto px-6 mt-8">

        {/* INTERACTIVE MAP */}
        <TravelMap />

        {/* ADMIN ADD ENTRY PANEL */}
        {isAdmin && (
          <div className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 mb-12 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                <span>➕</span> Add New Travel Entry
              </h3>
              <button
                onClick={handleResetData}
                className="text-xs text-rose-400 hover:underline"
              >
                Reset Default Data
              </button>
            </div>

            <form onSubmit={handleAddTrip} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Trip Title</label>
                <input
                  type="text"
                  placeholder="e.g. Bali Island Retreat"
                  value={newTrip.title}
                  onChange={e => setNewTrip({ ...newTrip, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Ubud, Indonesia"
                  value={newTrip.location}
                  onChange={e => setNewTrip({ ...newTrip, location: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Dates</label>
                <input
                  type="text"
                  placeholder="e.g. Sept 2026"
                  value={newTrip.dates}
                  onChange={e => setNewTrip({ ...newTrip, dates: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Status</label>
                <select
                  value={newTrip.status}
                  onChange={e => setNewTrip({ ...newTrip, status: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="Completed">Completed</option>
                  <option value="Ongoing / Next">Ongoing / Next</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newTrip.imageUrl}
                  onChange={e => setNewTrip({ ...newTrip, imageUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="Beach, Culture, Hiking"
                  value={newTrip.tags}
                  onChange={e => setNewTrip({ ...newTrip, tags: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">Description / Notes</label>
                <textarea
                  rows="3"
                  placeholder="Write trip memories and highlights..."
                  value={newTrip.description}
                  onChange={e => setNewTrip({ ...newTrip, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-2.5 rounded-lg transition-colors"
                >
                  Publish Entry
                </button>
              </div>
            </form>
          </div>
        )}

        {/* FILTER BAR */}
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
              className="group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col justify-between relative"
            >
              <div>
                {/* Optional Cover Image */}
                {trip.imageUrl ? (
                  <div className="h-44 w-full overflow-hidden relative">
                    <img
                      src={trip.imageUrl}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className={`h-2 w-full bg-gradient-to-r ${trip.color || 'from-teal-500 to-slate-700'}`} />
                )}

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

              <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {trip.tags && trip.tags.split(',').map(tag => (
                    <span
                      key={tag}
                      className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/50"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>

                {/* Delete Button in Admin Mode */}
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteTrip(trip.id)}
                    className="text-xs text-rose-400 hover:bg-rose-500/10 p-1.5 rounded-md transition-colors"
                  >
                    🗑️ Delete
                  </button>
                )}
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
        Personal Travel Log • Built Collaboratively
      </footer>
    </div>
  );
}