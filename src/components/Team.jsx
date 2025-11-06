import { useMemo } from 'react';
import { MapPin } from 'lucide-react';

function TeamCard({ name, nim, submitted, approved, location }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-slate-900 font-semibold">{name}</h4>
          <p className="text-xs text-slate-500">NIM: {nim}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Submitted</p>
          <p className="text-lg font-semibold text-slate-900">{submitted}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Approved</p>
          <p className="text-lg font-semibold text-emerald-600">{approved}</p>
        </div>
        <a
          href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
        >
          <MapPin size={16} /> Live Location
        </a>
      </div>
    </div>
  );
}

export default function Team() {
  const team = useMemo(
    () => [
      { name: 'Aulia', nim: '11191001', submitted: 35, approved: 22, location: { lat: -6.2, lng: 106.8 } },
      { name: 'Bagas', nim: '11191002', submitted: 31, approved: 18, location: { lat: -6.21, lng: 106.82 } },
      { name: 'Citra', nim: '11191003', submitted: 28, approved: 20, location: { lat: -6.22, lng: 106.83 } },
      { name: 'Dimas', nim: '11191004', submitted: 24, approved: 15, location: { lat: -6.23, lng: 106.84 } },
    ],
    []
  );

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {team.map((t) => (
          <TeamCard key={t.nim} {...t} />
        ))}
      </div>
    </div>
  );
}
