import { isEnabled } from '../shared/flags.js'
import type { Cart } from './cart.js'

export interface CheckoutStep {
  name: 'address' | 'shipping' | 'payment' | 'review'
  title: string
}

export function checkoutSteps(cart: Cart, userId: string): CheckoutStep[] {
  const steps: CheckoutStep[] = [
    { name: 'address', title: 'Address' },
    { name: 'shipping', title: 'Shipping' },
    { name: 'payment', title: 'Payment' },
    { name: 'review', title: `Review (${cart.summary()})` },
  ]
  if (isEnabled('gift-wrap', userId)) steps[1] = { name: 'shipping', title: 'Shipping and gift wrap' }
  if (process.env.FEATURE_EXPRESS_CHECKOUT === 'true') {
    return steps.filter((step) => step.name !== 'address')
  }
  return steps
}
