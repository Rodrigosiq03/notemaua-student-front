export enum STATE {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  INACTIVE = 'INACTIVE',
}

export function toEnum(value: string): STATE {
  switch (value) {
    case 'APPROVED':
      return STATE.APPROVED
    case 'PENDING':
      return STATE.PENDING
    case 'INACTIVE':
      return STATE.INACTIVE
    default:
      throw new Error('Invalid value')
  }
}