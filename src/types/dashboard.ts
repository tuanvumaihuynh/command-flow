export type Direction = 'FORWARD' | 'BACKWARD'

export interface DashboardConfig {
  homeLocationId: string
  kitchenLocationId: string
  directionToKitchen: Direction
  directionToHomeOnAbort: Direction
  robotId: string
  cargoWaitTime: number
  cargoLiftPosition: number
}
