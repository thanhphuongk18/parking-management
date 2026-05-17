import { ArrowDownLeft, ArrowUpRight, AlertTriangle, QrCode, Search } from 'lucide-react'
import { activeSessions, building, vehicleLabels } from '../data/mock'
import { Btn, Card, Input, PageHeader, Select, Table } from '../components/ui'

export type StaffView = 'checkin' | 'session' | 'checkout' | 'exceptions'

export const staffMenus = [
  { id: 'checkin' as const, label: 'Xe vào bãi', icon: ArrowDownLeft },
  { id: 'session' as const, label: 'Tạo lượt gửi', icon: QrCode },
  { id: 'checkout' as const, label: 'Xe ra bãi', icon: ArrowUpRight },
  { id: 'exceptions' as const, label: 'Ngoại lệ', icon: AlertTriangle },
]

export function StaffContent({ view }: { view: StaffView }) {
  if (view === 'checkin') {
    return (
      <>
        <PageHeader title="Xử lý xe vào bãi" subtitle="Kiểm tra điều kiện, quét biển, hướng dẫn tầng/khu" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="mb-4 font-medium text-white">Nhập / quét biển số</h3>
            <Input label="Biển số xe" placeholder="51A-12345" />
            <Select label="Loại phương tiện" options={Object.values(vehicleLabels)} />
            <Select label="Cổng vào" options={['Cổng A', 'Cổng B', 'Cổng VIP']} />
            <div className="mt-4 flex gap-2">
              <Btn className="flex items-center gap-2">
                <QrCode className="h-4 w-4" /> Quét QR
              </Btn>
              <Btn variant="secondary">Kiểm tra điều kiện</Btn>
            </div>
          </Card>
          <Card className="border-cyan-500/30 bg-cyan-950/20">
            <h3 className="font-medium text-cyan-300">Hướng dẫn đỗ</h3>
            <p className="mt-2 text-3xl font-bold text-white">Tầng B2 · Khu B</p>
            <p className="mt-1 text-sm text-slate-400">Ô tô · Còn 22 slot trống</p>
            <p className="mt-4 text-sm">{building.openHours}</p>
            <Btn className="mt-4 w-full">In thẻ / mã gửi xe</Btn>
          </Card>
        </div>
      </>
    )
  }

  if (view === 'session') {
    return (
      <>
        <PageHeader title="Tạo lượt gửi xe" subtitle="Parking session — thời gian vào, loại xe, cổng" />
        <Card className="max-w-xl">
          <div className="grid gap-3">
            <Input label="Biển số" placeholder="59H2-9988" />
            <Select label="Loại xe" options={Object.values(vehicleLabels)} />
            <Input label="Giờ vào" placeholder="10:35" />
            <Input label="Slot gán" placeholder="B1-07 (tự động)" />
            <Select label="Cổng" options={['Cổng A', 'Cổng B']} />
          </div>
          <Btn className="mt-4">Tạo lượt gửi</Btn>
        </Card>
        <h3 className="mb-3 mt-8 text-sm font-medium text-slate-400">Lượt đang hoạt động</h3>
        <Table
          headers={['Mã lượt', 'Biển số', 'Loại', 'Vào', 'Slot', 'Cổng', 'Phí tạm tính']}
          rows={activeSessions.map((s) => [
            s.id,
            s.plate,
            vehicleLabels[s.vehicleType],
            s.checkIn,
            s.slot,
            s.gate,
            `${s.estimatedFee.toLocaleString('vi-VN')}đ`,
          ])}
        />
      </>
    )
  }

  if (view === 'checkout') {
    return (
      <>
        <PageHeader title="Xử lý xe ra bãi" subtitle="Tìm lượt gửi, xác nhận giờ ra, thu phí" />
        <Card>
          <div className="flex flex-wrap gap-3">
            <Input label="Tìm biển số / mã thẻ" placeholder="51A hoặc SES..." className="min-w-[200px] flex-1" />
            <Btn className="flex items-center gap-2 self-end">
              <Search className="h-4 w-4" /> Tìm lượt
            </Btn>
          </div>
        </Card>
        {activeSessions[0] && (
          <Card className="mt-4 border-emerald-500/30">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-2xl font-bold text-white">{activeSessions[0].plate}</p>
                <p className="text-sm text-slate-400">
                  Vào {activeSessions[0].checkIn} · {activeSessions[0].slot} ·{' '}
                  {vehicleLabels[activeSessions[0].vehicleType]}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Phí cần thanh toán</p>
                <p className="text-3xl font-bold text-emerald-400">
                  {activeSessions[0].estimatedFee.toLocaleString('vi-VN')}đ
                </p>
                <Btn className="mt-2">Xác nhận thu phí & cho ra</Btn>
              </div>
            </div>
          </Card>
        )}
      </>
    )
  }

  if (view === 'exceptions') {
    return (
      <>
        <PageHeader title="Xử lý ngoại lệ" subtitle="Mất thẻ, sai thông tin, quá hạn, sai khu vực, cập nhật slot" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {['Mất thẻ xe', 'Sai biển số', 'Quá hạn gửi', 'Sai khu vực', 'Cập nhật slot'].map((t) => (
            <Card key={t} className="cursor-pointer hover:border-cyan-500/50">
              <AlertTriangle className="mb-2 h-5 w-5 text-amber-400" />
              <h3 className="font-medium text-white">{t}</h3>
              <p className="mt-1 text-xs text-slate-500">Mở form xử lý nhanh</p>
            </Card>
          ))}
        </div>
        <Card className="mt-6">
          <Select label="Cập nhật trạng thái slot" options={['Còn trống', 'Đang sử dụng', 'Bảo trì', 'Tạm khóa']} />
          <Input label="Mã slot" placeholder="B2-14" className="mt-3" />
          <Btn className="mt-3">Lưu</Btn>
        </Card>
      </>
    )
  }

  return null
}

