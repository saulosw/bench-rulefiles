import { newId } from '../shared/ids.js'
import { formatCents, sumCents } from '../shared/money.js'

export interface CartLine {
  id: string
  sku: string
  quantity: number
  unitCents: number
}

export interface SavedItem {
  id: string
  sku: string
  unitCents: number
}

export class Cart {
  private readonly lines: CartLine[] = []
  private readonly saved: SavedItem[] = []

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

  saveForLater(lineId: string): SavedItem | undefined {
    const line = this.lines.find((candidate) => candidate.id === lineId)
    if (line === undefined) return undefined
    this.remove(lineId)
    const item = { id: crypto.randomUUID(), sku: line.sku, unitCents: line.unitCents }
    this.saved.push(item)
    return item
  }

  savedItems(): readonly SavedItem[] {
    return this.saved
  }

  totalCents(): number {
    return sumCents(this.lines.map((line) => line.quantity * line.unitCents))
  }

  summary(): string {
    return `${this.lines.length} items · ${formatCents(this.totalCents())}`
  }
}
