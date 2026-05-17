import { useMemo, useState } from 'react'
import {
  Car,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  Shield,
  UserCircle,
  Users,
  X,
} from 'lucide-react'
import type { Role } from './types'
import { building } from './data/mock'
import { AdminContent, adminMenus, type AdminView } from './content/Admin'
import { ManagerContent, managerMenus } from './content/Manager'
import { StaffContent, staffMenus, type StaffView } from './content/Staff'
import { UserContent, userMenus, type UserView } from './content/User'

const roles: { id: Role; label: string; desc: string; icon: typeof Shield }[] = [
  { id: 'manager', label: 'Parking Manager', desc: 'Vận hành & báo cáo', icon: LayoutDashboard },
  { id: 'staff', label: 'Parking Staff', desc: 'Xe vào/ra & ngoại lệ', icon: Users },
  { id: 'user', label: 'Driver / User', desc: 'Gửi xe & thanh toán', icon: Car },
  { id: 'admin', label: 'System Admin', desc: 'Tài khoản & cấu hình', icon: Shield },
]

type MenuId = string

function App() {
  const [role, setRole] = useState<Role>('manager')
  const [menuId, setMenuId] = useState<MenuId>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menus = useMemo(() => {
    if (role === 'manager') return managerMenus.map((m) => ({ id: m.id, label: m.label, icon: m.icon }))
    if (role === 'staff') return staffMenus.map((m) => ({ id: m.id, label: m.label, icon: m.icon }))
    if (role === 'user') return userMenus.map((m) => ({ id: m.id, label: m.label, icon: m.icon }))
    return adminMenus.map((m) => ({ id: m.id, label: m.label, icon: m.icon }))
  }, [role])

  const defaultMenu = role === 'manager' ? 'dashboard' : menus[0]?.id ?? 'dashboard'

  const activeMenu = menus.some((m) => m.id === menuId) ? menuId : defaultMenu

  const switchRole = (r: Role) => {
    setRole(r)
    setMenuId(r === 'manager' ? 'dashboard' : r === 'staff' ? 'checkin' : r === 'user' ? 'info' : 'accounts')
  }

  const content = () => {
    if (role === 'manager') return <ManagerContent view={activeMenu as (typeof managerMenus)[0]['id']} />
    if (role === 'staff') return <StaffContent view={activeMenu as StaffView} />
    if (role === 'user') return <UserContent view={activeMenu as UserView} />
    return <AdminContent view={activeMenu as AdminView} />
  }

  const roleMeta = roles.find((r) => r.id === role)!

  return (
    <div className="flex h-full min-h-screen bg-[#0b1220]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-800 bg-slate-900/95 backdrop-blur transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-600">
            <Car className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">SkyPark</p>
            <p className="text-[10px] text-slate-500">Parking Management</p>
          </div>
          <button type="button" className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Đóng menu">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        <div className="border-b border-slate-800 p-3">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">Vai trò</p>
          <div className="space-y-1">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => switchRole(r.id)}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs transition ${
                  role === r.id ? 'bg-cyan-600/20 text-cyan-300 ring-1 ring-cyan-500/40' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <r.icon className="h-4 w-4 shrink-0" />
                <span>
                  <span className="block font-medium">{r.label}</span>
                  <span className="text-[10px] opacity-70">{r.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">Menu</p>
          <ul className="space-y-0.5">
            {menus.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => setMenuId(m.id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    activeMenu === m.id ? 'bg-slate-800 text-cyan-300' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <m.icon className="h-4 w-4 shrink-0" />
                  {m.label}
                  {activeMenu === m.id && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-slate-800 p-3 text-xs text-slate-500">
          <p className="truncate font-medium text-slate-300">{building.name}</p>
          <button type="button" className="mt-2 flex items-center gap-1 text-slate-500 hover:text-slate-300">
            <LogOut className="h-3 w-3" /> Đăng xuất
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          aria-label="Overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-slate-800 bg-slate-900/80 px-4 backdrop-blur">
          <button type="button" className="lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Mở menu">
            <Menu className="h-5 w-5 text-slate-300" />
          </button>
          <div className="flex-1">
            <p className="text-sm text-slate-400">
              {roleMeta.label} · <span className="text-slate-200">{menus.find((m) => m.id === activeMenu)?.label}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-sm">
            <UserCircle className="h-4 w-4 text-cyan-400" />
            <span className="hidden sm:inline text-slate-300">demo@skypark.vn</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">{content()}</main>
      </div>
    </div>
  )
}


export default App
