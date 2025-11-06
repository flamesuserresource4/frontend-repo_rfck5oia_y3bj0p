import { useMemo, useState } from 'react';
import { RefreshCw, Link } from 'lucide-react';

const statusOptions = [
  { value: 'accepted', label: 'Accepted' },
  { value: 'modified', label: 'Modified' },
  { value: 'problematic', label: 'Problematic' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'approved', label: 'Approved' },
];

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-semibold ${accent || 'text-slate-900'}`}>{value}</p>
    </div>
  );
}

function LatestTable({ rows, onRefresh }) {
  const [localRows, setLocalRows] = useState(rows);

  const handleStatusChange = (idx, value) => {
    const updated = [...localRows];
    updated[idx] = { ...updated[idx], status: value };
    setLocalRows(updated);
  };

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-slate-50">
        <h3 className="text-sm font-semibold text-slate-700">Latest Submissions</h3>
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
            {localRows.map((r, idx) => (
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
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                  >
                    <Link size={16} /> View in ODK
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Dashboard() {
  // Mock data for the UI; real data should be fetched from backend/ODK Central later.
  const rows = useMemo(
    () => [
      { id: 1, timestamp: '2025-11-05 10:21', nim: '11191001', submitter: 'Aulia', unitLabel: 'Kel. Sukamaju - Blok A1', status: 'accepted', link: 'https://central.example/submission/1' },
      { id: 2, timestamp: '2025-11-05 10:33', nim: '11191002', submitter: 'Bagas', unitLabel: 'Kel. Sukamaju - Blok A2', status: 'problematic', link: 'https://central.example/submission/2' },
      { id: 3, timestamp: '2025-11-05 10:58', nim: '11191003', submitter: 'Citra', unitLabel: 'Kel. Sukamaju - Blok A3', status: 'approved', link: 'https://central.example/submission/3' },
    ],
    []
  );

  const totals = useMemo(() => ({
    remainingTime: '12d 6h',
    total: 124,
    accepted: 58,
    modified: 14,
    problematic: 9,
    rejected: 5,
    approved: 38,
  }), []);

  const onRefresh = () => {
    // Hook to reload from backend later
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-6">
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        <StatCard label="Remaining Enumeration Time" value={totals.remainingTime} accent="text-indigo-600" />
        <StatCard label="Total Submissions" value={totals.total} />
        <StatCard label="Number Accepted" value={totals.accepted} />
        <StatCard label="Number Modified" value={totals.modified} />
        <StatCard label="Number Problematic" value={totals.problematic} />
        <StatCard label="Number Rejected" value={totals.rejected} />
        <StatCard label="Total Approved" value={totals.approved} />
      </section>

      <LatestTable rows={rows} onRefresh={onRefresh} />
    </div>
  );
}
