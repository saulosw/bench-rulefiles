export interface OrderLine {
  sku: string
  quantity: number
  unitCents: number
}

export interface Order {
  id: string
  userId: string
  lines: OrderLine[]
  status: 'placed' | 'shipped' | 'cancelled'
  placedAt: number
}

const orders = new Map<string, Order>()

export function saveOrder(order: Order): void {
  orders.set(order.id, order)
}

export function findOrder(id: string): Order | undefined {
  return orders.get(id)
}
