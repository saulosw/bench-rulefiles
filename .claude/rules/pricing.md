---
paths:
  - "src/backend/**"
  - "src/shared/money.ts"
---

# Pricing and promotions

Finance reconciles every order against the payment provider each night. These rules keep the two in
step; an order that breaks them stops the reconciliation until someone fixes it by hand.

- Amounts are integer cents. A percentage is applied to the subtotal of the lines (before shipping)
  and rounded down with `Math.floor`; the provider settles the same way.
- A promotion never takes more than 50% off the subtotal. Clamp a larger discount to 50% of the
  subtotal and set `discountCapped: true` on the order; finance pays anything above the cap as a
  manual credit, never through checkout.
- The discount lives in `order.discountCents`. Never change a line's `unitCents`: refunds are
  computed per line from the price the shopper saw.
- An order carries at most one promo code. Applying another code replaces the first one.
- Promo codes are matched case-insensitively after trimming and stored upper-case.
