import { KeyRound, Settings, Users } from 'lucide-react'
import { Badge, Btn, Card, Input, PageHeader, Select, Table } from '../components/ui'

export type AdminView = 'accounts' | 'roles' | 'config'

export const adminMenus = [
  { id: 'accounts' as const, label: 'Tài khoản', icon: Users },
  { id: 'roles' as const, label: 'Phân quyền', icon: KeyRound },
  { id: 'config' as const, label: 'Cấu hình hệ thống', icon: Settings },
]

const users = [
  { name: 'Nguyễn Văn A', email: 'manager@skypark.vn', role: 'Parking Manager', status: 'Hoạt động' },
  { name: 'Trần Thị B', email: 'staff01@skypark.vn', role: 'Parking Staff', status: 'Hoạt động' },
  { name: 'Lê Văn C', email: 'admin@skypark.vn', role: 'System Admin', status: 'Hoạt động' },
  { name: 'Phạm D', email: 'driver@email.com', role: 'Driver', status: 'Khóa' },
]

const permissions = [
  { module: 'Quản lý tòa nhà', manager: true, staff: false, user: false, admin: true },
  { module: 'Slot & trạng thái', manager: true, staff: true, user: false, admin: true },
  { module: 'Xe vào / ra', manager: true, staff: true, user: false, admin: true },
  { module: 'Báo cáo', manager: true, staff: false, user: false, admin: true },
  { module: 'Đặt chỗ / thanh toán', manager: true, staff: true, user: true, admin: true },
  { module: 'AI tối ưu', manager: true, staff: false, user: false, admin: true },
]

export function AdminContent({ view }: { view: AdminView }) {
  if (view === 'accounts') {
    return (
      <>
        <PageHeader title="Quản lý tài khoản" subtitle="Người dùng hệ thống" action={<Btn>+ Thêm tài khoản</Btn>} />
        <Table
          headers={['Họ tên', 'Email', 'Vai trò', 'Trạng thái', '']}
          rows={users.map((u) => [
            u.name,
            u.email,
            u.role,
            <Badge
              key={u.email}
              className={
                u.status === 'Hoạt động'
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                  : 'border-rose-500/40 bg-rose-500/10 text-rose-300'
              }
            >
              {u.status}
            </Badge>,
            <Btn variant="ghost">Sửa</Btn>,
          ])}
        />
      </>
    )
  }

  if (view === 'roles') {
    return (
      <>
        <PageHeader title="Phân quyền" subtitle="Ma trận quyền theo vai trò" />
        <div className="overflow-x-auto rounded-xl border border-slate-700/60">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/80 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">Module</th>
                <th className="px-4 py-3">Manager</th>
                <th className="px-4 py-3">Staff</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {permissions.map((p) => (
                <tr key={p.module} className="hover:bg-slate-800/40">
                  <td className="px-4 py-3 text-slate-200">{p.module}</td>
                  {[p.manager, p.staff, p.user, p.admin].map((ok, i) => (
                    <td key={i} className="px-4 py-3">
                      {ok ? <span className="text-emerald-400">✓</span> : <span className="text-slate-600">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )
  }

  if (view === 'config') {
    return (
      <>
        <PageHeader title="Cấu hình hệ thống" subtitle="Tham số chung, tích hợp, thông báo" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h3 className="font-medium text-white">Chung</h3>
            <Input label="Tên hệ thống" placeholder="SkyPark Parking" className="mt-3" />
            <Input label="Múi giờ" placeholder="Asia/Ho_Chi_Minh" className="mt-3" />
            <Select label="Ngôn ngữ mặc định" options={['Tiếng Việt', 'English']} />
          </Card>
          <Card>
            <h3 className="font-medium text-white">Tích hợp thanh toán</h3>
            <Input label="VNPay Merchant" placeholder="••••••" className="mt-3" />
            <Input label="MoMo Partner" placeholder="••••••" className="mt-3" />
            <Btn className="mt-3" variant="secondary">
              Kiểm tra kết nối
            </Btn>
          </Card>
          <Card>
            <h3 className="font-medium text-white">AI & tối ưu</h3>
            <label className="mt-3 flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" defaultChecked className="rounded border-slate-600" />
              Bật gợi ý phân bổ slot tự động
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" defaultChecked className="rounded border-slate-600" />
              Dự báo giờ cao điểm
            </label>
          </Card>
          <Card>
            <h3 className="font-medium text-white">Thông báo</h3>
            <label className="mt-3 flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" defaultChecked className="rounded border-slate-600" />
              Email cảnh báo slot đầy
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" className="rounded border-slate-600" />
              SMS cho khách đặt chỗ
            </label>
          </Card>
        </div>
        <Btn className="mt-4">Lưu cấu hình</Btn>
      </>
    )
  }

  return null
}
