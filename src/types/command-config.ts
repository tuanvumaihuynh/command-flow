import type { CargoCloseInputs, CargoLiftInputs, CargoLowerInputs, CargoOpenInputs, MoveToInputs } from './raybot-command'

export interface MoveToInputConfig {
  motorSpeed: number
}
export interface MoveToInputConfig extends Omit<MoveToInputs, 'location' | 'direction'> { }
export interface CargoOpenInputConfig extends CargoOpenInputs { }
export interface CargoCloseInputConfig extends CargoCloseInputs { }
export interface CargoLiftInputConfig extends CargoLiftInputs { }
export interface CargoLowerInputConfig extends CargoLowerInputs { }

export interface CommandConfig {
  MOVE_TO: MoveToInputConfig
  CARGO_OPEN: CargoOpenInputConfig
  CARGO_CLOSE: CargoCloseInputConfig
  CARGO_LIFT: CargoLiftInputConfig
  CARGO_LOWER: CargoLowerInputConfig
}
