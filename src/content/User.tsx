import { Calendar, Car, CreditCard, MapPinned, MessageSquare, Ticket } from 'lucide-react'
import { activeSessions, building, floorsByVehicle, pricingRules, vehicleLabels } from '../data/mock'
import { Badge, Btn, Card, Input, PageHeader, Select, StatCard } from '../components/ui'

export type UserView = 'info' | 'park' | 'reserve' | 'track' | 'pay' | 'feedback'

export const userMenus = [
  { id: 'info' as const, label: 'Thông tin bãi', icon: MapPinned },
  { id: 'park' as const, label: 'Gửi xe', icon: Car },
  { id: 'reserve' as const, label: 'Đặt chỗ trước', icon: Calendar },
  { id: 'track' as const, label: 'Theo dõi lượt', icon: Ticket },
  { id: 'pay' as const, label: 'Thanh toán', icon: CreditCard },
  { id: 'feedback' as const, label: 'Phản hồi', icon: MessageSquare },
]

export function UserContent({ view }: { view: UserView }) {
  const session = activeSessions[1]

  if (view === 'info') {
    const free = floorsByVehicle.reduce((a, f) => a + f.free, 0)
    return (
      <>
        <PageHeader title="Thông tin bãi xe" subtitle={building.address} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Giờ hoạt động" value={building.openHours} />
          <StatCard label="Slot trống" value={free} sub="Cập nhật realtime" />
          <StatCard label="Loại xe" value="4" sub="Ô tô, xe máy, xe đạp, xe tải" />
          <StatCard label="Tầng" value={building.floors} sub="B1 – B4" />
        </div>
        <Card className="mt-6">
          <h3 className="font-medium text-white">Bảng giá tham khảo</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {pricingRules.map((p) => (
              <li key={p.id} className="flex justify-between border-b border-slate-700/50 py-2">
                <span>{p.name}</span>
                <span className="text-cyan-400">{p.hourly.toLocaleString('vi-VN')}đ/giờ</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="mt-4">
          <h3 className="font-medium text-white">Quy định</h3>
          <ul className="mt-2 list-inside list-disc text-sm text-slate-400">
            <li>Miễn phí 15 phút đầu (ô tô)</li>
            <li>Không gửi xe cháy nổ, hàng cấm</li>
            <li>Xuất trình mã/thẻ khi ra bãi</li>
          </ul>
        </Card>
      </>
    )
  }

  if (view === 'park') {
    return (
      <>
        <PageHeader title="Gửi xe theo lượt" subtitle="Nhận thẻ/mã khi vào, thanh toán khi ra" />
        <Card className="max-w-md text-center">
          <Car className="mx-auto h-12 w-12 text-cyan-400" />
          <p className="mt-4 text-slate-400">Đưa xe tới cổng và quét mã tại kiosk hoặc giao cho nhân viên</p>
          <Btn className="mt-6 w-full">Hiển thị mã QR của tôi</Btn>
        </Card>
      </>
    )
  }

  if (view === 'reserve') {
    return (
      <>
        <PageHeader title="Đặt chỗ trước" subtitle="Chọn loại xe, thời gian và khu vực còn trống" />
        <Card className="max-w-lg">
          <Select label="Loại phương tiện" options={Object.values(vehicleLabels)} />
          <Input label="Ngày gửi" placeholder="17/05/2026" className="mt-3" />
          <Input label="Giờ dự kiến vào" placeholder="08:00" className="mt-3" />
          <Select label="Khu vực" options={['B1 – Xe máy (34 trống)', 'B2 – Ô tô (22 trống)', 'B4 – Xe tải (12 trống)']} />
          <Btn className="mt-4 w-full">Xác nhận đặt chỗ</Btn>
        </Card>
      </>
    )
  }

  if (view === 'track' && session) {
    return (
      <>
        <PageHeader title="Lượt gửi xe hiện tại" subtitle={`Mã: ${session.id}`} />
        <Card className="border-cyan-500/30 bg-gradient-to-br from-slate-800 to-cyan-950/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">{session.plate}</p>
              <Badge className="mt-2 border-cyan-500/40 bg-cyan-500/10 text-cyan-300">Đang gửi</Badge>
            </div>
            <Ticket className="h-10 w-10 text-cyan-500/50" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500">Giờ vào</p>
              <p className="font-medium text-white">{session.checkIn}</p>
            </div>
            <div>
              <p className="text-slate-500">Loại xe</p>
              <p className="font-medium text-white">{vehicleLabels[session.vehicleType]}</p>
            </div>
            <div>
              <p className="text-slate-500">Khu vực</p>
              <p className="font-medium text-white">{session.slot}</p>
            </div>
            <div>
              <p className="text-slate-500">Phí tạm tính</p>
              <p className="font-medium text-emerald-400">{session.estimatedFee.toLocaleString('vi-VN')}đ</p>
            </div>
          </div>
        </Card>
      </>
    )
  }

  if (view === 'pay') {
    return (
      <>
        <PageHeader title="Thanh toán phí gửi xe" subtitle="Phí chính + dịch vụ bổ sung (nếu có)" />
        <Card>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Phí gửi xe</span>
            <span>15.000đ</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-slate-400">Rửa xe (tùy chọn)</span>
            <span>50.000đ</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-slate-600 pt-4 text-lg font-semibold">
            <span>Tổng</span>
            <span className="text-cyan-400">65.000đ</span>
          </div>
          <Select label="Phương thức" options={['Tiền mặt', 'Thẻ', 'Ví MoMo', 'VNPay']} />
          <Btn className="mt-4 w-full">Thanh toán</Btn>
        </Card>
      </>
    )
  }

  if (view === 'feedback') {
    return (
      <>
        <PageHeader title="Gửi phản hồi" subtitle="Mất thẻ, sai phí, khó tìm xe, slot bị chiếm..." />
        <Card className="max-w-lg">
          <Select
            label="Loại vấn đề"
            options={['Mất thẻ xe', 'Sai phí', 'Khó tìm xe', 'Slot bị chiếm', 'Khác']}
          />
          <label className="mt-3 block">
            <span className="mb-1 block text-xs text-slate-400">Mô tả</span>
            <textarea
              className="w-full rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-sm text-white"
              rows={4}
              placeholder="Mô tả chi tiết..."
            />
          </label>
          <Btn className="mt-4">Gửi phản hồi</Btn>
        </Card>
      </>
    )
  }

  return null
}

