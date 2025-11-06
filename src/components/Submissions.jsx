import { useMemo, useState } from 'react';
import { RefreshCw, Link, Filter } from 'lucide-react';

const statusOptions = [
  { value: 'accepted', label: 'Accepted' },
  { value: 'modified', label: 'Modified' },
  { value: 'problematic', label: 'Problematic' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'approved', label: 'Approved' },
];

export default function Submissions() {
  const baseRows = useMemo(
    () => [
      { id: 1, timestamp: '2025-11-05 10:21', nim: '11191001', submitter: 'Aulia', unitLabel: 'Kel. Sukamaju - Blok A1', status: 'accepted', area: 'Kecamatan A', link: 'https://central.example/submission/1' },
      { id: 2, timestamp: '2025-11-05 10:33', nim: '11191002', submitter: 'Bagas', unitLabel: 'Kel. Sukamaju - Blok A2', status: 'problematic', area: 'Kecamatan B', link: 'https://central.example/submission/2' },
      { id: 3, timestamp: '2025-11-05 10:58', nim: '11191003', submitter: 'Citra', unitLabel: 'Kel. Sukamaju - Blok A3', status: 'approved', area: 'Kecamatan A', link: 'https://central.example/submission/3' },
      { id: 4, timestamp: '2025-11-05 11:05', nim: '11191004', submitter: 'Dimas', unitLabel: 'Kel. Sukamaju - Blok A4', status: 'modified', area: 'Kecamatan C', link: 'https://central.example/submission/4' },
      { id: 5, timestamp: '2025-11-05 11:16', nim: '11191005', submitter: 'Eka', unitLabel: 'Kel. Sukamaju - Blok A5', status: 'rejected', area: 'Kecamatan B', link: 'https://central.example/submission/5' },
    ],
    []
  );

  const [statusFilter, setStatusFilter] = useState('');
  const [submitterFilter, setSubmitterFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');

  const filtered = useMemo(() => {
    return baseRows.filter((r) =>
      (statusFilter ? r.status === statusFilter : true) &&
      (submitterFilter ? r.submitter.toLowerCase().includes(submitterFilter.toLowerCase()) : true) &&
      (areaFilter ? r.area === areaFilter : true)
    );
  }, [baseRows, statusFilter, submitterFilter, areaFilter]);

  const handleStatusChange = (idx, value) => {
    // This would patch to backend later; for now local mutate
    filtered[idx].status = value;
  };

  const onRefresh = () => {
    // Hook up with backend later
  };

  const uniqueAreas = useMemo(() => Array.from(new Set(baseRows.map((r) => r.area))), [baseRows]);

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-3 text-slate-700 mb-3">
          <Filter size={18} /> <span className="font-semibold">Filters</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2">
              <option value="">All</option>
              {statusOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Submitter</label>
            <input value={submitterFilter} onChange={(e) => setSubmitterFilter(e.target.value)} placeholder="Type name…" className="w-full rounded-md border border-slate-300 bg-white px-3 py-2" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Work Area</label>
            <select value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2">
              <option value="">All Areas</option>
              {uniqueAreas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-slate-50">
          <h3 className="text-sm font-semibold text-slate-700">PKL 65 Polstat STIS Enumerator Data</h3>
          <button onClick={onRefresh} className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-slate-600">Timestamp</th>
                <th className="px-4 py-2 text-left text-slate-600">Sender NIM</th>
                <th className="px-4 py-2 text-left text-slate-600">Submitter</th>
                <th className="px-4 py-2 text-left text-slate-600">Unit Label</th>
                <th className="px-4 py-2 text-left text-slate-600">Status</th>
                <th className="px-4 py-2 text-left text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r, idx) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2 text-slate-800">{r.timestamp}</td>
                  <td className="px-4 py-2 text-slate-800">{r.nim}</td>
                  <td className="px-4 py-2 text-slate-800">{r.submitter}</td>
                  <td className="px-4 py-2 text-slate-800">{r.unitLabel}</td>
                  <td className="px-4 py-2">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(idx, e.target.value)}
                      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-800"
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <a href={r.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800">
                      <Link size={16} /> View in ODK
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
