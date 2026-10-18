import { isEnabled } from '../shared/flags.js'

export interface CheckoutStep {
  name: 'address' | 'shipping' | 'payment' | 'review'
  title: string
}

export function checkoutSteps(userId: string): CheckoutStep[] {
  const steps: CheckoutStep[] = [
    { name: 'address', title: 'Address' },
    { name: 'shipping', title: 'Shipping' },
    { name: 'payment', title: 'Payment' },
    { name: 'review', title: 'Review order' },
  ]
  if (isEnabled('gift-wrap', userId)) steps[1] = { name: 'shipping', title: 'Shipping and gift wrap' }
  return steps
}
