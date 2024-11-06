export type Device = {
  ip: string
  title: string
  lastActiveDate: string
  deviceId: string
}

export type GetDevices = {
  status: string
  code: number
  data: Device[]
}
