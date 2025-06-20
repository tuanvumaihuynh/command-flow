export interface DashboardConfig {
  homeLocationId: string
  kitchenLocationId: string
  directionToKitchen: 'FORWARD' | 'BACKWARD'
  robotId: string
  cargoWaitTime: number
  cargoLiftPosition: number
}
