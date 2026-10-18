let sequence = 0

export function newId(prefix: string): string {
  sequence = (sequence + 1) % 1_679_616
  const time = Date.now().toString(36).padStart(9, '0')
  return `${prefix}_${time}${sequence.toString(36).padStart(4, '0')}`
}
