export interface Promo {
  code: string
  percentOff: number
  expiresAt: number
}

const promos = new Map<string, Promo>(
  [
    { code: 'WELCOME10', percentOff: 10, expiresAt: Date.UTC(2027, 0, 1) },
    { code: 'SPRING25', percentOff: 25, expiresAt: Date.UTC(2027, 5, 1) },
    { code: 'STAFF60', percentOff: 60, expiresAt: Date.UTC(2027, 11, 31) },
  ].map((promo) => [promo.code, promo]),
)

export function findPromo(code: string): Promo | undefined {
  return promos.get(code.trim().toUpperCase())
}
