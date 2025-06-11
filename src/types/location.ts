export interface Location {
  id: string
  name: string
  rfidTag: string // rfid tag
  speedGoToHome: number // speed to go to home in cm/s
  speedGoToKitchen: number // speed to go to kitchen in cm/s
  speedDelivery: number // speed to deliver in cm/s
  lowerPosition: number // lower position in cm
  directionToHome: 'FORWARD' | 'BACKWARD'
  directionToLocation: 'FORWARD' | 'BACKWARD'
  createdAt: string
  updatedAt: string
}
