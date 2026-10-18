export type Flag = 'express-checkout' | 'gift-wrap'

interface Rollout {
  enabled: boolean
  percent: number
}

const rollout: Record<Flag, Rollout> = loadRollout()

export function isEnabled(flag: Flag, userId?: string): boolean {
  const { enabled, percent } = rollout[flag]
  if (!enabled) return false
  if (percent >= 100 || userId === undefined) return percent >= 100
  return bucket(userId) < percent
}

function loadRollout(): Record<Flag, Rollout> {
  return {
    'express-checkout': { enabled: true, percent: 20 },
    'gift-wrap': { enabled: false, percent: 0 },
  }
}

function bucket(userId: string): number {
  let hash = 0
  for (const char of userId) hash = (hash * 31 + char.charCodeAt(0)) % 100
  return hash
}
