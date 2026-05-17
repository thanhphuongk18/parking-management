import type { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-slate-700/60 bg-slate-800/50 p-4 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  )
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function StatCard({
  label,
  value,
  sub,
  trend,
}: {
  label: string
  value: string | number
  sub?: string
  trend?: 'up' | 'down'
}) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      {sub && (
        <p className={`mt-1 text-xs ${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : 'text-slate-500'}`}>
          {sub}
        </p>
      )}
    </Card>
  )
}

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}

export function Btn({
  children,
  variant = 'primary',
  onClick,
  className = '',
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  onClick?: () => void
  className?: string
}) {
  const styles = {
    primary: 'bg-cyan-600 hover:bg-cyan-500 text-white',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white',
    ghost: 'bg-transparent hover:bg-slate-700/50 text-slate-300',
    danger: 'bg-rose-600/90 hover:bg-rose-500 text-white',
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export function Input({ label, placeholder, className = '' }: { label?: string; placeholder?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="mb-1 block text-xs text-slate-400">{label}</span>}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
      />
    </label>
  )
}

export function Select({ label, options }: { label?: string; options: string[] }) {
  return (
    <label className="block">
      {label && <span className="mb-1 block text-xs text-slate-400">{label}</span>}
      <select className="w-full rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none">
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

export function Table({ headers, rows }: { headers: string[]; rows: (string | ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700/60">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead className="bg-slate-800/80 text-xs uppercase text-slate-400">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-800/40">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-slate-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
