import type { CommandType } from '@/types/raybot-command'

const commandLabels: Record<CommandType, string> = {
  MOVE_TO: 'Move To Location',
  CARGO_CHECK_QR: 'Check QR',
  STOP_MOVEMENT: 'Stop Movement',
  MOVE_FORWARD: 'Move Forward',
  MOVE_BACKWARD: 'Move Backward',
  CARGO_OPEN: 'Open Cargo',
  CARGO_CLOSE: 'Close Cargo',
  CARGO_LIFT: 'Lift Cargo',
  CARGO_LOWER: 'Lower Cargo',
  SCAN_LOCATION: 'Scan Location',
  WAIT: 'Wait',
}

export function getCommandLabel(commandType: CommandType) {
  return commandLabels[commandType]
}
