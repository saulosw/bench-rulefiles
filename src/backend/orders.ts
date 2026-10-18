import { newId } from '../shared/ids.js'
import { sumCents } from '../shared/money.js'
import { clock } from './clock.js'
import { fail } from './http.js'
import { findOrder, saveOrder } from './store.js'
import type { Order, OrderLine } from './store.js'

export function placeOrder(userId: string, lines: OrderLine[]): Order {
  if (lines.length === 0) fail(400, 'empty-order', 'An order needs at least one line.')
  for (const line of lines) {
    if (!Number.isInteger(line.quantity) || line.quantity <= 0) {
      fail(400, 'invalid-quantity', `Invalid quantity for ${line.sku}.`)
    }
  }
  const order: Order = { id: newId('ord'), userId, lines, status: 'placed', placedAt: clock.now() }
  saveOrder(order)
  return order
}

export function orderTotal(order: Order): number {
  return sumCents(order.lines.map((line) => line.quantity * line.unitCents))
}

export function shipOrder(id: string): Order {
  const order = findOrder(id) ?? fail(404, 'order-not-found', `No order ${id}.`)
  if (order.status !== 'placed') fail(409, 'not-placed', `Order ${id} is ${order.status}.`)
  order.status = 'shipped'
  return order
}
