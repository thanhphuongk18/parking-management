import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Brain, Building2, Layers, MapPin, Sparkles, Wallet } from 'lucide-react'
import {
  aiSuggestions,
  building,
  exceptions,
  floorsByVehicle,
  pricingRules,
  reportData,
  slotStatusColors,
  slotStatusLabels,
  slots,
  vehicleLabels,
} from '../data/mock'
import { Badge, Btn, Card, Input, PageHeader, Select, StatCard, Table } from '../components/ui'

export const managerMenus = [
  { id: 'dashboard', label: 'Tổng quan', icon: Building2 },
  { id: 'building', label: 'Tòa nhà gửi xe', icon: Building2 },
  { id: 'vehicles', label: 'Loại phương tiện', icon: MapPin },
  { id: 'floors', label: 'Phân tầng', icon: Layers },
  { id: 'slots', label: 'Slot & trạng thái', icon: MapPin },
  { id: 'pricing', label: 'Bảng giá & chính sách', icon: Wallet },
  { id: 'reports', label: 'Báo cáo', icon: Wallet },
  { id: 'advanced', label: 'Quản lý nâng cao', icon: Sparkles },
  { id: 'ai', label: 'AI tối ưu', icon: Brain },
]

export function ManagerContent({ view }) {
  const empty = slots.filter((s) => s.status === 'empty').length
  const occupied = slots.filter((s) => s.status === 'occupied').length

  if (view === 'dashboard') {
    return (
      <>
        <PageHeader title="Tổng quan bãi xe" subtitle={building.name} action={<Btn>+ Thêm tòa nhà</Btn>} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Tổng slot" value={building.totalSlots} sub="420 slot đăng ký" />
          <StatCard label="Đang sử dụng" value={occupied} sub={`${Math.round((occupied / slots.length) * 100)}% lấp đầy`} trend="up" />
          <StatCard label="Còn trống" value={empty} sub="Cập nhật realtime" />
          <StatCard label="Doanh thu hôm nay" value="18,3 tr" sub="+12% so với hôm qua" trend="up" />
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card>
            <h3 className="mb-4 font-medium text-white">Lượt xe vào/ra theo giờ</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reportData.inOut}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="hour" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #475569' }} />
                  <Line type="monotone" dataKey="in" name="Vào" stroke="#22d3ee" strokeWidth={2} />
                  <Line type="monotone" dataKey="out" name="Ra" stroke="#a78bfa" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h3 className="mb-4 font-medium text-white">Tỷ lệ lấp đầy theo loại xe (%)</h3>
            <div className="space-y-3">
              {Object.entries(reportData.occupancy).map(([k, v]) => (
                <div key={k}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{vehicleLabels[k]}</span>
                    <span className="text-cyan-400">{v}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400" style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </>
    )
  }

  if (view === 'building') {
    return (
      <>
        <PageHeader title="Quản lý tòa nhà gửi xe" subtitle="Thông tin cơ sở, giờ hoạt động, cấu hình cổng" />
        <Card className="max-w-2xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Tên tòa nhà" placeholder={building.name} />
            <Input label="Địa chỉ" placeholder={building.address} />
            <Input label="Số tầng hầm" placeholder={String(building.floors)} />
            <Input label="Giờ hoạt động" placeholder={building.openHours} />
            <Input label="Tổng slot" placeholder={String(building.totalSlots)} />
            <Select label="Trạng thái" options={['Đang hoạt động', 'Bảo trì một phần', 'Tạm đóng']} />
          </div>
          <div className="mt-4 flex gap-2">
            <Btn>Lưu thay đổi</Btn>
            <Btn variant="secondary">Cấu hình cổng vào/ra</Btn>
          </div>
        </Card>
      </>
    )
  }

  if (view === 'vehicles') {
    return (
      <>
        <PageHeader title="Loại phương tiện" subtitle="Định nghĩa loại xe được phục vụ trong bãi" action={<Btn>+ Thêm loại</Btn>} />
        <Table
          headers={['Loại xe', 'Mã', 'Tầng cho phép', 'Slot tối đa', 'Ghi chú']}
          rows={Object.entries(vehicleLabels).map(([k, label]) => [
            label,
            k,
            k === 'xe_tai' ? 'B4' : k === 'xe_may' || k === 'xe_dap' ? 'B1' : 'B2, B3',
            k === 'oto' ? '250' : k === 'xe_may' ? '120' : k === 'xe_dap' ? '40' : '50',
            'Đang hoạt động',
          ])}
        />
      </>
    )
  }

  if (view === 'floors') {
    return (
      <>
        <PageHeader title="Phân tầng theo loại xe" subtitle="Gán loại phương tiện cho từng tầng/khu" />
        <div className="grid gap-4 md:grid-cols-2">
          {floorsByVehicle.map((f) => (
            <Card key={f.floor}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-cyan-400">{f.floor}</h3>
                <Badge className="border-cyan-500/40 bg-cyan-500/10 text-cyan-300">
                  {f.free} slot trống / {f.slots}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                Loại xe: {f.types.map((t) => vehicleLabels[t]).join(', ')}
              </p>
              <Btn className="mt-4" variant="secondary">
                Chỉnh sửa phân bổ
              </Btn>
            </Card>
          ))}
        </div>
      </>
    )
  }

  if (view === 'slots') {
    const filter = ['Tất cả', 'Trống', 'Đang dùng', 'Đặt trước', 'Bảo trì', 'Khóa']
    return (
      <>
        <PageHeader title="Quản lý slot đỗ xe" subtitle="Theo dõi trạng thái từng vị trí" action={<Btn>Cập nhật hàng loạt</Btn>} />
        <div className="mb-4 flex flex-wrap gap-2">
          {filter.map((f) => (
            <button
              key={f}
              type="button"
              className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-500 hover:text-cyan-300"
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
          {slots.slice(0, 96).map((s) => (
            <div
              key={s.id}
              title={`${s.code} – ${slotStatusLabels[s.status]}`}
              className={`flex aspect-square flex-col items-center justify-center rounded-lg border text-[10px] ${slotStatusColors[s.status]}`}
            >
              <span className="font-mono font-semibold">{s.code}</span>
              {s.plate && <span className="mt-0.5 truncate text-[8px] opacity-80">{s.plate}</span>}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          {Object.entries(slotStatusLabels).map(([k, label]) => (
            <span key={k} className={`rounded border px-2 py-1 ${slotStatusColors[k]}`}>
              {label}
            </span>
          ))}
        </div>
      </>
    )
  }

  if (view === 'pricing') {
    return (
      <>
        <PageHeader title="Bảng giá & chính sách" subtitle="Quy định tính phí, khung giờ cao điểm" action={<Btn>+ Chính sách mới</Btn>} />
        <Table
          headers={['Loại xe', 'Theo giờ', 'Theo ngày', 'Qua đêm', 'Hệ số cao điểm', '']}
          rows={pricingRules.map((p) => [
            p.name,
            `${p.hourly.toLocaleString('vi-VN')}đ`,
            `${p.daily.toLocaleString('vi-VN')}đ`,
            `${p.overnight.toLocaleString('vi-VN')}đ`,
            `×${p.peakMultiplier}`,
            <Btn key={p.id} variant="ghost">
              Sửa
            </Btn>,
          ])}
        />
        <Card className="mt-4">
          <h3 className="font-medium text-white">Chính sách bổ sung</h3>
          <ul className="mt-2 list-inside list-disc text-sm text-slate-400">
            <li>Miễn phí 15 phút đầu cho ô tô</li>
            <li>Cao điểm: 07:00–09:00, 17:00–19:00 (Thứ 2–Thứ 6)</li>
            <li>Phụ thu qua đêm sau 23:00</li>
          </ul>
        </Card>
      </>
    )
  }

  if (view === 'reports') {
    return (
      <>
        <PageHeader title="Báo cáo vận hành" subtitle="Lượt xe, doanh thu, lấp đầy, giờ cao điểm" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h3 className="mb-3 font-medium">Doanh thu theo ngày (triệu VNĐ)</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportData.revenue}>
                  <CartesianGrid stroke="#334155" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h3 className="mb-3 font-medium">Khung giờ cao điểm</h3>
            {reportData.peakHours.map((p) => (
              <div key={p.slot} className="mb-3 rounded-lg bg-slate-900/50 p-3">
                <p className="font-medium text-cyan-300">{p.slot}</p>
                <p className="text-sm text-slate-400">Ô tô: {p.oto}% · Xe máy: {p.xe_may}% lấp đầy</p>
              </div>
            ))}
          </Card>
        </div>
      </>
    )
  }

  if (view === 'advanced') {
    return (
      <>
        <PageHeader title="Quản lý nâng cao" subtitle="Mất vé, sai biển, quá giờ, sai khu vực, chưa thanh toán" />
        <Table
          headers={['Loại', 'Biển số', 'Mô tả', 'Mức độ', 'Thời gian', '']}
          rows={exceptions.map((e) => [
            e.type,
            e.plate,
            e.description,
            <Badge
              key={e.id}
              className={
                e.severity === 'high'
                  ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                  : e.severity === 'medium'
                    ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                    : 'border-slate-500/40 bg-slate-500/10 text-slate-300'
              }
            >
              {e.severity === 'high' ? 'Cao' : e.severity === 'medium' ? 'Trung bình' : 'Thấp'}
            </Badge>,
            e.time,
            <Btn variant="ghost">Xử lý</Btn>,
          ])}
        />
      </>
    )
  }

  if (view === 'ai') {
    return (
      <>
        <PageHeader
          title="AI tối ưu phân bổ chỗ đỗ"
          subtitle="Giảm thời gian tìm chỗ, tăng tỷ lệ sử dụng bãi"
          action={<Btn>Chạy phân tích</Btn>}
        />
        <div className="space-y-4">
          {aiSuggestions.map((s, i) => (
            <Card key={i} className="border-cyan-500/20">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-cyan-500/20 p-2">
                  <Brain className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">{s.title}</h3>
                  <p className="mt-1 text-sm text-emerald-400">{s.impact}</p>
                  <p className="mt-2 text-sm text-slate-400">{s.reason}</p>
                  <div className="mt-3 flex gap-2">
                    <Btn>Áp dụng</Btn>
                    <Btn variant="ghost">Bỏ qua</Btn>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </>
    )
  }

  return null
}


