import { newId } from '../shared/ids.js'
import { formatCents, sumCents } from '../shared/money.js'

export interface CartLine {
  id: string
  sku: string
  quantity: number
  unitCents: number
}

export class Cart {
  private readonly lines: CartLine[] = []

  add(sku: string, quantity: number, unitCents: number): CartLine {
    const existing = this.lines.find((line) => line.sku === sku)
    if (existing !== undefined) {
      existing.quantity += quantity
      return existing
    }
    const line = { id: newId('line'), sku, quantity, unitCents }
    this.lines.push(line)
    return line
  }

  remove(lineId: string): void {
    const index = this.lines.findIndex((line) => line.id === lineId)
    if (index >= 0) this.lines.splice(index, 1)
  }

  setQuantity(lineId: string, quantity: number): CartLine | undefined {
    const line = this.lines.find((candidate) => candidate.id === lineId)
    if (line === undefined) return undefined
    if (quantity <= 0) {
      this.remove(lineId)
      return undefined
    }
    line.quantity = quantity
    return line
  }

  totalCents(): number {
    return sumCents(this.lines.map((line) => line.quantity * line.unitCents))
  }

  summary(): string {
    return `${this.lines.length} items · ${formatCents(this.totalCents())}`
  }
}
