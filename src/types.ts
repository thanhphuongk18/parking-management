export type Role = 'manager' | 'staff' | 'user' | 'admin'

export type SlotStatus = 'empty' | 'occupied' | 'reserved' | 'maintenance' | 'locked'

export type VehicleType = 'oto' | 'xe_may' | 'xe_dap' | 'xe_tai'

export interface Building {
  id: string
  name: string
  address: string
  floors: number
  totalSlots: number
  openHours: string
}

export interface ParkingSlot {
  id: string
  code: string
  floor: number
  zone: string
  vehicleType: VehicleType
  status: SlotStatus
  plate?: string
}

export interface PricingRule {
  id: string
  vehicleType: VehicleType
  name: string
  hourly: number
  daily: number
  overnight: number
  peakMultiplier: number
}

export interface Session {
  id: string
  plate: string
  vehicleType: VehicleType
  checkIn: string
  slot: string
  gate: string
  estimatedFee: number
  status: 'active' | 'pending_exit' | 'overdue'
}

export interface ExceptionCase {
  id: string
  type: string
  plate: string
  description: string
  severity: 'low' | 'medium' | 'high'
  time: string
}
