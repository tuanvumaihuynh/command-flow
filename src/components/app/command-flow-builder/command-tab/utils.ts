import type { Command } from '@/types/command-flow'

const commandLabels: Record<Command['type'], string> = {
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
}

export function getCommandLabel(command: Command) {
  return commandLabels[command.type]
}
