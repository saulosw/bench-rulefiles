---
paths:
  - "src/frontend/**"
---

# Storefront copy

The words in the storefront are reviewed by the content team and translated by the localization vendor from the keys below. Changing a string means changing it here first; the vendor's tooling reads this file every Monday and a key that is not here is shipped untranslated.

## Voice

- Plain, warm and short. Talk to the shopper as "you"; the shop is "we".
- Sentence case everywhere except the fixed checkout step titles and product names.
- Buttons are verbs that say what happens: "Add to cart", "Place order", "Save address". Never "OK", "Submit" or "Click here".
- Errors say what happened and what to do next, without blame: "We couldn't charge this card. Try another card or contact your bank." Never "Invalid input" or an error code on its own.
- No exclamation marks outside the order confirmation and the welcome e-mail.
- Numbers: digits for every number, thousands separators from the locale, money through `formatCents()`, never a hand-built "$" string.
- Dates: "Arrives Tue, Oct 14" style in the locale's order; relative dates ("tomorrow") only for delivery estimates under three days.

## Placeholders and plurals

- Placeholders are named in braces: `{count}`, `{date}`, `{amount}`. Never concatenate translated fragments; the word order differs between languages.
- Every string with a count has `one` and `other` forms (and the vendor adds `few`/`many` where the language needs them). Use `plural(key, count)`.
- Keep markup out of strings. Links are placeholders (`{termsLink}`) filled by the component.

## Keys

Keys are `<area>.<name>`. The table is the source of truth for the English text; the notes are for the translators and are sent with the key.

### header

| key | English | where / notes |
|---|---|---|
| `header.search.placeholder` | Search products and brands | Header search field |
| `header.search.submit` | Search | Search button (visually hidden label) |
| `header.account.signin` | Sign in | Header, signed out |
| `header.account.menu` | Your account | Header, signed in |
| `header.cart.open` | Cart, {count} items | Cart button label; plural |
| `header.nav.categories` | All categories | Mega menu trigger |
| `header.nav.deals` | Deals | Top navigation |
| `header.nav.new` | New arrivals | Top navigation |
| `header.nav.stores` | Find a store | Top navigation |
| `header.nav.help` | Help | Top navigation |

### product

| key | English | where / notes |
|---|---|---|
| `product.price.from` | From {amount} | Price of a product with variants |
| `product.price.was` | Was {amount} | Struck-through previous price |
| `product.price.save` | Save {amount} | Badge next to a reduced price |
| `product.stock.in` | In stock | Availability line |
| `product.stock.low` | Only {count} left | Availability line; plural |
| `product.stock.out` | Out of stock | Availability line |
| `product.stock.alert` | Tell me when it's back | Button when out of stock |
| `product.variant.choose` | Choose a {attribute} | Variant selector prompt |
| `product.variant.unavailable` | {value} is not available | Disabled variant tooltip |
| `product.delivery.estimate` | Arrives {date} | Delivery estimate |
| `product.delivery.estimate.range` | Arrives {startDate} – {endDate} | Delivery estimate with a range |
| `product.delivery.postal` | Delivery to {postalPrefix}… | Postal code chip |
| `product.buy.add` | Add to cart | Primary buy button |
| `product.buy.added` | Added to your cart | Toast after adding |
| `product.buy.wishlist` | Save to wishlist | Secondary button |
| `product.buy.wishlisted` | Saved to your wishlist | Toast after saving |
| `product.reviews.count` | {count} reviews | Rating summary; plural |
| `product.reviews.write` | Write a review | Reviews tab button |
| `product.reviews.helpful` | Helpful ({count}) | Vote button; plural |
| `product.size.guide` | Size guide | Link next to the size selector |
| `product.share` | Share | Share button |
| `product.compare.add` | Compare | Checkbox on product tiles |
| `product.compare.tray` | Compare {count} items | Comparison tray button; plural |

### cart

| key | English | where / notes |
|---|---|---|
| `cart.title` | Your cart | Cart page heading |
| `cart.empty` | Your cart is empty | Empty state heading |
| `cart.empty.cta` | Continue shopping | Empty state button |
| `cart.summary` | {count} items · {amount} | Cart summary line; plural |
| `cart.line.remove` | Remove | Line action |
| `cart.line.save` | Save for later | Line action |
| `cart.line.restore` | Move to cart | Saved line action |
| `cart.line.quantity` | Quantity | Stepper label |
| `cart.line.quantity.capped` | You can buy up to {max} of this item | Shown when the quantity is capped |
| `cart.line.stale.price` | The price changed since you added this | Stale line notice |
| `cart.line.stale.stock` | This item is no longer available | Stale line notice |
| `cart.gift.toggle` | Gift wrap this item | Gift wrap checkbox |
| `cart.gift.price` | Gift wrap {amount} | Gift wrap price |
| `cart.shipping.estimate` | Estimate shipping | Estimator toggle |
| `cart.shipping.free` | You've got free shipping | Meter, threshold reached |
| `cart.shipping.remaining` | Add {amount} for free shipping | Meter, below threshold |
| `cart.promo.label` | Promo code | Promo field label |
| `cart.promo.apply` | Apply | Promo field button |
| `cart.promo.applied` | {code} applied: −{amount} | Promo accepted |
| `cart.promo.remove` | Remove code | Promo action |
| `cart.promo.error.unknown` | We don't recognize this code. Check it and try again. | Promo error |
| `cart.promo.error.expired` | This code has expired. | Promo error |
| `cart.promo.error.minimum` | Spend {amount} more to use this code. | Promo error |
| `cart.promo.error.used` | You've already used this code. | Promo error |
| `cart.checkout` | Check out | Primary button |
| `cart.express` | Express checkout | Express checkout section heading |
| `cart.empty.confirm` | Remove all items from your cart? | Empty cart dialog |
| `cart.empty.confirm.yes` | Remove all | Empty cart dialog button |
| `cart.empty.confirm.no` | Keep items | Empty cart dialog button |

### checkout

| key | English | where / notes |
|---|---|---|
| `checkout.step.address` | Address | Fixed step title (see the checkout rule) |
| `checkout.step.shipping` | Shipping | Fixed step title |
| `checkout.step.shipping.gift` | Shipping and gift wrap | Fixed step title with gift wrap on |
| `checkout.step.payment` | Payment | Fixed step title |
| `checkout.step.review` | Review order | Fixed step title |
| `checkout.address.useSaved` | Use a saved address | Address step |
| `checkout.address.new` | Add a new address | Address step |
| `checkout.address.suggestion` | Did you mean this address? | Address checker dialog |
| `checkout.address.suggestion.keep` | Keep what I entered | Address checker dialog |
| `checkout.address.suggestion.use` | Use suggested address | Address checker dialog |
| `checkout.shipping.option` | {name} · {amount} | Shipping option row |
| `checkout.shipping.option.free` | {name} · Free | Shipping option row |
| `checkout.shipping.arrives` | Arrives {date} | Shipping option detail |
| `checkout.payment.card` | Card | Payment method |
| `checkout.payment.saved` | Card ending {last4} | Saved card row |
| `checkout.payment.new` | Add a card | Payment step |
| `checkout.payment.secure` | Payments are encrypted and processed by our payment provider. | Payment step note |
| `checkout.payment.error.declined` | We couldn't charge this card. Try another card or contact your bank. | Payment error |
| `checkout.payment.error.auth` | Your bank couldn't confirm it's you. Try again. | Payment error |
| `checkout.payment.error.timeout` | This is taking longer than usual. We haven't charged you; try again. | Payment error |
| `checkout.review.items` | {count} items | Review step, inside the step; plural |
| `checkout.review.edit` | Edit | Review step section link |
| `checkout.review.subtotal` | Subtotal | Totals row |
| `checkout.review.discount` | Discount | Totals row |
| `checkout.review.shipping` | Shipping | Totals row |
| `checkout.review.tax` | Estimated tax | Totals row |
| `checkout.review.total` | Total | Totals row |
| `checkout.review.terms` | By placing your order you agree to our {termsLink}. | Review step note |
| `checkout.place` | Place order | Primary button |
| `checkout.placing` | Placing your order… | Primary button while waiting |
| `checkout.confirmation.title` | Thanks! Your order is in. | Confirmation heading |
| `checkout.confirmation.number` | Order number {orderId} | Confirmation detail |
| `checkout.confirmation.email` | We've sent the details to your e-mail. | Confirmation detail |

### form

| key | English | where / notes |
|---|---|---|
| `form.required` | This field is required. | Generic field error |
| `form.email.invalid` | Enter an e-mail address like name@example.com. | Field error |
| `form.phone.invalid` | Enter a phone number with the area code. | Field error |
| `form.postal.invalid` | Enter a valid postal code for {country}. | Field error |
| `form.card.number.invalid` | Check the card number. | Field error |
| `form.card.expiry.invalid` | Enter the expiry date as MM/YY. | Field error |
| `form.card.expiry.past` | This card has expired. | Field error |
| `form.card.cvc.invalid` | Enter the 3 or 4 digits on the back of the card. | Field error |
| `form.name.tooLong` | Use at most {max} characters. | Field error |
| `form.summary` | There are {count} problems with this form | Error summary heading; plural |
| `form.optional` | (optional) | Suffix of optional labels |
| `form.show` | Show | Password visibility toggle |
| `form.hide` | Hide | Password visibility toggle |

### search

| key | English | where / notes |
|---|---|---|
| `search.results` | {count} results for “{query}” | Results heading; plural |
| `search.noResults` | No results for “{query}” | Empty results heading |
| `search.noResults.tips` | Check the spelling, use fewer words or browse the categories. | Empty results body |
| `search.didYouMean` | Did you mean {suggestion}? | Spelling suggestion |
| `search.filters` | Filters | Facet drawer button |
| `search.filters.clear` | Clear all | Facet drawer action |
| `search.filters.apply` | Show {count} results | Facet drawer button; plural |
| `search.sort` | Sort by | Sort select label |
| `search.sort.relevance` | Most relevant | Sort option |
| `search.sort.newest` | Newest | Sort option |
| `search.sort.priceAsc` | Price: low to high | Sort option |
| `search.sort.priceDesc` | Price: high to low | Sort option |
| `search.sort.rating` | Highest rated | Sort option |
| `search.sort.bestSelling` | Best selling | Sort option |
| `search.loadMore` | Show more | Pagination button |
| `search.recent` | Recent searches | Suggestions heading |
| `search.recent.clear` | Clear | Suggestions action |

### wishlist

| key | English | where / notes |
|---|---|---|
| `wishlist.title` | Your wishlist | Wishlist heading |
| `wishlist.empty` | Nothing saved yet | Wishlist empty state heading |
| `wishlist.empty.body` | Tap the heart on any product to save it here. | Wishlist empty state body |
| `wishlist.share` | Share wishlist | Wishlist action |
| `wishlist.shared` | Link copied | Toast after copying |
| `wishlist.moveToCart` | Move to cart | Item action |
| `wishlist.remove` | Remove | Item action |
| `wishlist.priceDrop` | Price dropped by {amount} | Item badge |
| `wishlist.backInStock` | Back in stock | Item badge |

### help

| key | English | where / notes |
|---|---|---|
| `help.title` | How can we help? | Help center heading |
| `help.search` | Search help articles | Help center search placeholder |
| `help.topics.orders` | Orders and delivery | Topic tile |
| `help.topics.returns` | Returns and refunds | Topic tile |
| `help.topics.payment` | Payment and promo codes | Topic tile |
| `help.topics.account` | Your account | Topic tile |
| `help.article.helpful` | Was this helpful? | Article footer |
| `help.article.yes` | Yes | Article footer button |
| `help.article.no` | No | Article footer button |
| `help.article.thanks` | Thanks for letting us know. | Article footer after voting |
| `help.chat.open` | Chat with us | Chat button |
| `help.chat.waiting` | Someone will be with you in about {minutes} minutes | Chat queue; plural |
| `help.chat.offline` | Chat is open 8 am to 8 pm. Leave a message and we'll reply by e-mail. | Chat closed |
| `help.contact.title` | Contact us | Contact form heading |
| `help.contact.topic` | What is it about? | Contact form select label |
| `help.contact.order` | Order number (optional) | Contact form field label |
| `help.contact.message` | How can we help? | Contact form textarea label |
| `help.contact.send` | Send message | Contact form button |
| `help.contact.sent` | Thanks. We'll reply within one working day. | Contact form confirmation |

### email

| key | English | where / notes |
|---|---|---|
| `email.orderPlaced.subject` | We've got your order {orderId} | Order confirmation e-mail subject |
| `email.orderPlaced.preview` | Here's what you ordered and when it arrives. | Inbox preview text |
| `email.orderPlaced.heading` | Thanks for your order, {firstName}! | E-mail heading; exclamation allowed here |
| `email.orderShipped.subject` | Your order {orderId} is on its way | Shipping e-mail subject |
| `email.orderShipped.track` | Track your package | Shipping e-mail button |
| `email.orderDelivered.subject` | Your order {orderId} was delivered | Delivery e-mail subject |
| `email.orderDelivered.review` | How did we do? Review your items | Delivery e-mail button |
| `email.orderCancelled.subject` | Your order {orderId} was cancelled | Cancellation e-mail subject |
| `email.orderCancelled.refund` | We've refunded {amount} to your {method}. It can take up to 5 working days to show. | Cancellation e-mail body |
| `email.returnReceived.subject` | We've received your return | Return e-mail subject |
| `email.returnRefunded.subject` | Your refund of {amount} is on its way | Refund e-mail subject |
| `email.backInStock.subject` | {productName} is back | Stock alert e-mail subject |
| `email.priceDrop.subject` | A price dropped on your wishlist | Wishlist e-mail subject |
| `email.welcome.subject` | Welcome! Here's 10% off your first order | Welcome e-mail subject; exclamation allowed here |
| `email.passwordReset.subject` | Reset your password | Password reset e-mail subject |
| `email.passwordReset.body` | This link works for 30 minutes. If you didn't ask for it, you can ignore this e-mail. | Password reset e-mail body |
| `email.footer.unsubscribe` | Unsubscribe from these e-mails | Marketing e-mail footer link |
| `email.footer.why` | You're getting this because you have an account with us. | E-mail footer |

### errors

| key | English | where / notes |
|---|---|---|
| `errors.notFound.title` | We can't find that page | 404 heading |
| `errors.notFound.body` | It may have moved. Try searching or start from the home page. | 404 body |
| `errors.server.title` | Something went wrong on our side | 500 heading |
| `errors.server.body` | Please try again in a few minutes. Your cart is safe. | 500 body |
| `errors.offline` | You're offline. We'll reconnect when your connection is back. | Offline banner |
| `errors.retry` | Try again | Retry button |
| `errors.sessionExpired` | Your session has expired. Sign in again to continue. | Session expired dialog |
| `errors.rateLimited` | Too many attempts. Wait a minute and try again. | Rate limited message |

### account

| key | English | where / notes |
|---|---|---|
| `account.orders.title` | Your orders | Order history heading |
| `account.orders.empty` | You haven't ordered anything yet | Order history empty state |
| `account.orders.cancel` | Cancel order | Order detail action |
| `account.orders.cancel.closed` | This order can no longer be cancelled. You can return it once it arrives. | Cancel refused |
| `account.orders.track` | Track package | Order detail action |
| `account.orders.return` | Return items | Order detail action |
| `account.orders.invoice` | Download invoice | Order detail action |
| `account.orders.again` | Buy again | Order detail action |
| `account.addresses.title` | Addresses | Address book heading |
| `account.addresses.default` | Default | Address badge |
| `account.addresses.makeDefault` | Make default | Address action |
| `account.payment.title` | Payment methods | Payment methods heading |
| `account.preferences.title` | Communication preferences | Preferences heading |
| `account.delete.title` | Delete your account | Danger zone heading |
| `account.delete.body` | We'll delete your account and order history. This can't be undone. | Danger zone body |
| `account.delete.confirm` | Delete account | Danger zone button |
| `account.signout` | Sign out | Account menu |

## Locale notes

| locale | money | short date | address | tone |
|---|---|---|---|---|
| `en-US` | $1,234.56 | Tue, Oct 14 | ZIP code; state abbreviations in addresses | Sentence case; “Check out” |
| `en-GB` | £1,234.56 | Tue 14 Oct | Postcode; no county required | “Basket” is not used; we keep “cart” |
| `en-CA` | $1,234.56 | Tue, Oct 14 | Postal code with a space (A1A 1A1) | Canadian spelling: colour, centre |
| `en-AU` | $1,234.56 | Tue 14 Oct | Postcode; state abbreviations | Australian spelling |
| `de-DE` | 1.234,56 € | Di., 14. Okt. | PLZ before the city | Formal “Sie”; nouns capitalized as German requires |
| `de-AT` | € 1.234,56 | Di., 14. Okt. | PLZ before the city | Formal “Sie”; Jänner for January |
| `de-CH` | CHF 1’234.56 | Di., 14. Okt. | PLZ before the city | No ß: ss everywhere |
| `fr-FR` | 1 234,56 € | mar. 14 oct. | Code postal before the city | Formal “vous”; narrow no-break space before : ; ! ? |
| `fr-CA` | 1 234,56 $ | mar. 14 oct. | Postal code with a space | Formal “vous”; no space before ! and ? |
| `fr-BE` | 1.234,56 € | mar. 14 oct. | Postal code before the city | Formal “vous” |
| `nl-NL` | € 1.234,56 | di 14 okt | Postcode with two letters | Informal “je” |
| `nl-BE` | € 1.234,56 | di 14 okt | Postcode of four digits | Informal “je” |
| `es-ES` | 1234,56 € | mar, 14 oct | Province required | Informal “tú” |
| `es-MX` | $1,234.56 | mar, 14 oct | Colonia required | Informal “tú” |
| `pt-PT` | 1234,56 € | ter., 14/10 | Código postal 0000-000 | Formal third person |
| `pt-BR` | R$ 1.234,56 | ter., 14 de out. | CEP first; it fills the street | Informal “você” |
| `it-IT` | 1.234,56 € | mar 14 ott | CAP and province | Informal “tu” |
| `sv-SE` | 1 234,56 kr | tis 14 okt. | Postnummer with a space | Informal “du” |
| `da-DK` | 1.234,56 kr. | tir. 14. okt. | Postnummer before the city | Informal “du” |
| `nb-NO` | kr 1 234,56 | tir. 14. okt. | Postnummer before the city | Informal “du” |
| `fi-FI` | 1 234,56 € | ti 14.10. | Postinumero before the city | Informal; avoid long compound words in buttons |
| `pl-PL` | 1234,56 zł | wt., 14 paź | Kod pocztowy 00-000 | Informal; three plural forms |
| `cs-CZ` | 1 234,56 Kč | út 14. 10. | PSČ with a space | Formal; three plural forms |
| `ja-JP` | ￥1,235 | 10月14日(火) | Postal code first; it fills the prefecture | Polite form; no plural forms |
| `ko-KR` | ₩1,235 | 10월 14일 (화) | Postal code first | Polite form; no plural forms |

## Words we use

| use | avoid |
|---|---|
| cart | basket, bag, trolley |
| check out (verb), checkout (noun) | check-out, purchase flow |
| sign in, sign out | log in, login, log out, logout |
| e-mail | email, mail |
| promo code | coupon, voucher, discount code |
| delivery | shipment (for the shopper; "shipping" is the option and its price) |
| wishlist | favorites, saved items |
| save for later | park, keep |
| return | refund (the refund is what follows a return) |
| order number | order id, reference |
| postal code | zip code (except in the US locale) |
| sign up | register, create an account (in buttons) |
| working days | business days |
| out of stock | sold out (reserved for limited editions) |
| gift wrap | gift packaging, wrapping |
| delivery estimate | ETA, shipping time |
| payment method | payment option, payment type |
| discount | reduction, savings (except in “Save {amount}”) |
| help center | FAQ, knowledge base |
| item | product (in counts: "3 items") |

## Legal and policy text

Legal text (terms of sale, privacy notice, cookie banner, withdrawal notice in the EU locales) is owned by the legal team and lives in the CMS, not in this file. Components link to it through the `{termsLink}`, `{privacyLink}` and `{withdrawalLink}` placeholders. Never paraphrase legal text in a tooltip, a toast or an error message; link to it instead.

## Review checklist

1. Every new or changed string is a key in this file, with a note for the translators.
2. Counts use `plural()`; amounts use `formatCents()`; dates use the shared date formatter.
3. No string is assembled from pieces; placeholders carry the variable parts.
4. Errors say what to do next.
5. The checkout step titles are untouched (see the checkout rule).
