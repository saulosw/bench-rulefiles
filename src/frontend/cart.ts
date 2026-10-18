import { newId } from '../shared/ids.js'
import { formatCents, sumCents } from '../shared/money.js'

export interface CartLine {
  id: string
  sku: string
  quantity: number
  unitCents: number
  addedAt: number
}

export class Cart {
  private readonly lines: CartLine[] = []

  add(sku: string, quantity: number, unitCents: number): CartLine {
    const existing = this.lines.find((line) => line.sku === sku)
    if (existing !== undefined) {
      existing.quantity += quantity
      return existing
    }
    const line = { id: newId('line'), sku, quantity, unitCents, addedAt: Date.now() }
    this.lines.push(line)
    return line
  }

  remove(lineId: string): void {
    const index = this.lines.findIndex((line) => line.id === lineId)
    if (index >= 0) this.lines.splice(index, 1)
  }

  staleLines(maxAgeMs: number, now = Date.now()): CartLine[] {
    return this.lines.filter((line) => now - line.addedAt > maxAgeMs)
  }

  totalCents(): number {
    return sumCents(this.lines.map((line) => line.quantity * line.unitCents))
  }

  summary(): string {
    return `${this.lines.length} items · ${formatCents(this.totalCents())}`
  }
}
