import { newId } from '../shared/ids.js'
import { sumCents } from '../shared/money.js'
import { clock } from './clock.js'
import { fail } from './http.js'
import { findPromo } from './promos.js'
import { findOrder, saveOrder } from './store.js'
import type { Order, OrderLine } from './store.js'

export function placeOrder(userId: string, lines: OrderLine[]): Order {
  if (lines.length === 0) fail(400, 'empty-order', 'An order needs at least one line.')
  for (const line of lines) {
    if (!Number.isInteger(line.quantity) || line.quantity <= 0) {
      fail(400, 'invalid-quantity', `Invalid quantity for ${line.sku}.`)
    }
  }
  const order: Order = {
    id: newId('ord'),
    userId,
    lines,
    status: 'placed',
    placedAt: clock.now(),
    discountCents: 0,
  }
  saveOrder(order)
  return order
}

export function orderSubtotal(order: Order): number {
  return sumCents(order.lines.map((line) => line.quantity * line.unitCents))
}

export function orderTotal(order: Order): number {
  return orderSubtotal(order) - order.discountCents
}

export function applyPromo(id: string, code: string): Order {
  const order = findOrder(id) ?? fail(404, 'order-not-found', `No order ${id}.`)
  if (order.status !== 'placed') fail(409, 'not-placed', `Order ${id} is ${order.status}.`)
  const promo = findPromo(code) ?? fail(404, 'promo-not-found', `No promo code ${code.trim()}.`)
  if (promo.expiresAt <= clock.now()) fail(410, 'promo-expired', `${promo.code} has expired.`)
  order.promoCode = promo.code
  order.discountCents = Math.floor((orderSubtotal(order) * promo.percentOff) / 100)
  return order
}

export function shipOrder(id: string): Order {
  const order = findOrder(id) ?? fail(404, 'order-not-found', `No order ${id}.`)
  if (order.status !== 'placed') fail(409, 'not-placed', `Order ${id} is ${order.status}.`)
  order.status = 'shipped'
  return order
}
