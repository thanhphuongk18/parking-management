export const building = {
  id: 'b1',
  name: 'Tòa SkyPark – Bãi xe B1',
  address: '123 Nguyễn Huệ, Q.1, TP.HCM',
  floors: 5,
  totalSlots: 420,
  openHours: '06:00 – 23:00',
}

export const vehicleLabels = {
  oto: 'Ô tô',
  xe_may: 'Xe máy',
  xe_dap: 'Xe đạp',
  xe_tai: 'Xe tải',
}

export const slotStatusLabels = {
  empty: 'Còn trống',
  occupied: 'Đang sử dụng',
  reserved: 'Đã đặt trước',
  maintenance: 'Bảo trì',
  locked: 'Tạm khóa',
}

export const slotStatusColors = {
  empty: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  occupied: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  reserved: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  maintenance: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  locked: 'bg-slate-500/20 text-slate-400 border-slate-500/40',
}

export const floorsByVehicle = [
  { floor: 'B1', types: ['xe_may', 'xe_dap'], slots: 120, free: 34 },
  { floor: 'B2', types: ['oto'], slots: 150, free: 22 },
  { floor: 'B3', types: ['oto'], slots: 100, free: 8 },
  { floor: 'B4', types: ['xe_tai'], slots: 50, free: 12 },
]

export const pricingRules = [
  { id: 'p1', vehicleType: 'oto', name: 'Ô tô tiêu chuẩn', hourly: 15000, daily: 120000, overnight: 80000, peakMultiplier: 1.5 },
  { id: 'p2', vehicleType: 'xe_may', name: 'Xe máy', hourly: 5000, daily: 35000, overnight: 25000, peakMultiplier: 1.3 },
  { id: 'p3', vehicleType: 'xe_dap', name: 'Xe đạp', hourly: 2000, daily: 12000, overnight: 8000, peakMultiplier: 1.2 },
  { id: 'p4', vehicleType: 'xe_tai', name: 'Xe tải', hourly: 25000, daily: 200000, overnight: 150000, peakMultiplier: 1.8 },
]

function genSlots() {
  const statuses = ['empty', 'occupied', 'reserved', 'maintenance', 'locked']
  const slots = []
  let n = 1
  for (const f of [1, 2, 3, 4]) {
    for (let i = 0; i < 24; i++) {
      const status = statuses[i % 5]
      slots.push({
        id: `s${n}`,
        code: `B${f}-${String(n % 100).padStart(2, '0')}`,
        floor: f,
        zone: f <= 1 ? 'A' : f === 4 ? 'T' : 'B',
        vehicleType: f === 1 ? 'xe_may' : f === 4 ? 'xe_tai' : 'oto',
        status,
        plate: status === 'occupied' ? `51A-${10000 + n}` : undefined,
      })
      n++
    }
  }
  return slots
}

export const slots = genSlots()

export const activeSessions = [
  { id: 'ses1', plate: '51A-12345', vehicleType: 'oto', checkIn: '08:32', slot: 'B2-14', gate: 'Cổng A', estimatedFee: 45000, status: 'active' },
  { id: 'ses2', plate: '59H2-9988', vehicleType: 'xe_may', checkIn: '09:15', slot: 'B1-07', gate: 'Cổng B', estimatedFee: 15000, status: 'active' },
  { id: 'ses3', plate: '30K-7777', vehicleType: 'oto', checkIn: '06:00', slot: 'B3-02', gate: 'Cổng A', estimatedFee: 120000, status: 'overdue' },
]

export const exceptions = [
  { id: 'e1', type: 'Mất vé', plate: '51G-8899', description: 'Khách không tìm thấy thẻ gửi', severity: 'high', time: '10:22' },
  { id: 'e2', type: 'Sai biển số', plate: '51A-0001', description: 'Biển nhập khác biển trên thẻ', severity: 'medium', time: '09:48' },
  { id: 'e3', type: 'Quá giờ', plate: '30K-7777', description: 'Gửi quá 8h, chưa thanh toán', severity: 'high', time: '09:30' },
  { id: 'e4', type: 'Sai khu vực', plate: '59C1-2222', description: 'Xe máy đỗ tầng ô tô', severity: 'medium', time: '08:55' },
  { id: 'e5', type: 'Chưa thanh toán', plate: '51F-3344', description: 'Ra cổng nhưng chưa thu phí', severity: 'low', time: '08:12' },
]

export const reportData = {
  inOut: [
    { hour: '06', in: 12, out: 2 },
    { hour: '08', in: 45, out: 18 },
    { hour: '10', in: 38, out: 32 },
    { hour: '12', in: 52, out: 41 },
    { hour: '14', in: 28, out: 35 },
    { hour: '16', in: 40, out: 38 },
    { hour: '18', in: 55, out: 48 },
    { hour: '20', in: 22, out: 30 },
  ],
  revenue: [
    { day: 'T2', amount: 12.5 },
    { day: 'T3', amount: 14.2 },
    { day: 'T4', amount: 11.8 },
    { day: 'T5', amount: 15.6 },
    { day: 'T6', amount: 18.3 },
    { day: 'T7', amount: 22.1 },
    { day: 'CN', amount: 19.4 },
  ],
  occupancy: { oto: 87, xe_may: 72, xe_dap: 45, xe_tai: 76 },
  peakHours: [
    { slot: '07-09', oto: 92, xe_may: 85 },
    { slot: '17-19', oto: 95, xe_may: 88 },
  ],
}

export const aiSuggestions = [
  { title: 'Chuyển 12 slot B2 sang xe máy', impact: '+8% tỷ lệ lấp đầy', reason: 'Tầng B1 đạt 95% lúc cao điểm, B2 ô tô còn 22 slot trống' },
  { title: 'Mở cổng B cho xe máy 17h–19h', impact: '-15% thời gian chờ', reason: 'Dự báo 120 lượt xe máy/giờ vào cao điểm chiều' },
  { title: 'Khóa tạm B3-01 → B3-05', impact: 'Giảm sai khu vực', reason: '5 sự cố gửi sai khu trong 7 ngày qua' },
]
