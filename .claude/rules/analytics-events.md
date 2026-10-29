---
paths:
  - "src/frontend/**"
---

# Analytics events

Every event the storefront sends goes through `track(name, properties)` and must be listed here. The data team builds the funnels, the merchandising dashboards and the weekly growth report from this catalog, so an event that is not listed is dropped by the collector, and an event whose properties drift from the table breaks a dashboard without anyone noticing.

## Naming

- Event names are `object_action` in snake_case, past tense: `cart_line_added`, not `addToCart` or `cart_add`.
- Property names are snake_case. Amounts end in `_cents` and are integers; durations end in `_ms`; counts are plain integers (`line_count`, `units`).
- Booleans are named for the true case (`in_stock`, `guest`, `saved`), never `not_*`.
- Enumerations are lower-case strings from a closed list documented next to the event; add the new value here before sending it.
- Never rename an event. Add the new one, send both for one release, then remove the old one and tell the data team in #data-requests.

## What never goes into an event

- No personal data: no names, e-mail addresses, phone numbers, street addresses, full postal codes, card numbers, IP addresses or free text typed by the shopper. Send lengths and counts instead (`query_length`, `code_length`), and at most the first three characters of a postal code (`postal_prefix`).
- No ids that identify a person outside our systems (payment provider customer ids, carrier tracking numbers).
- No raw URLs with query strings: strip the query and send `campaign` from our own parameters.

## When to send

- `*_viewed` events are sent once per render of the page or component, after the data it shows has loaded. A re-render caused by state changes does not send it again.
- Impressions (`banner_viewed`, `promo_banner_viewed`, `search_suggestion_shown`) need at least 50% of the element visible for one second, measured with the shared `useImpression()` hook.
- Events tied to a server answer (`order_placed`, `promo_code_accepted`, `signin_completed`) are sent after the answer arrives, never optimistically.
- Respect consent: until the shopper accepts analytics cookies, `track()` queues events in memory and drops them when the tab closes. Do not work around the queue.

## Common properties

The collector adds these to every event; do not send them yourself: `session_id`, `anonymous_id`, `user_id` (signed in only), `locale`, `currency`, `page_type`, `app_version`, `experiment_ids`, `viewport` (`s`, `m`, `l`), `timestamp`.

## Catalog

### Browse

Owner: `merchandising`.

| event | sent when | properties | dashboards |
|---|---|---|---|
| `home_viewed` | The home page finished rendering above the fold. | `referrer`, `campaign`, `experiment_ids` | Merchandising daily, Category health |
| `category_viewed` | A category page rendered its first page of products. | `category_id`, `sort`, `filters`, `page` | Merchandising daily, Category health |
| `category_sorted` | The shopper changed the sort order of a category. | `category_id`, `from_sort`, `to_sort` | Merchandising daily, Category health |
| `category_filtered` | A filter chip was added or removed. | `category_id`, `filter_key`, `filter_value`, `action` | Merchandising daily, Category health |
| `category_paginated` | The next page of products loaded (button or infinite scroll). | `category_id`, `page`, `source` | Merchandising daily, Category health |
| `banner_viewed` | A merchandising banner was at least 50% visible for one second. | `banner_id`, `slot`, `position` | Merchandising daily, Category health |
| `banner_clicked` | A merchandising banner was clicked. | `banner_id`, `slot`, `position`, `target_url` | Merchandising daily, Category health |
| `breadcrumb_clicked` | A breadcrumb link was used. | `from_page`, `to_page`, `depth` | Merchandising daily, Category health |
| `recently_viewed_opened` | The recently viewed drawer was opened. | `item_count` | Merchandising daily, Category health |
| `store_locator_opened` | The store locator was opened from the header. | `source` | Merchandising daily, Category health |

### Search

Owner: `search`.

| event | sent when | properties | dashboards |
|---|---|---|---|
| `search_opened` | The search field received focus. | `source` | Search quality, Zero results |
| `search_submitted` | A query was submitted (enter or the search button). | `query_length`, `query_tokens`, `source` | Search quality, Zero results |
| `search_suggestion_shown` | Autocomplete suggestions were shown. | `query_length`, `suggestion_count` | Search quality, Zero results |
| `search_suggestion_clicked` | An autocomplete suggestion was chosen. | `suggestion_type`, `position`, `query_length` | Search quality, Zero results |
| `search_results_viewed` | The results page rendered. | `result_count`, `query_length`, `has_spelling_fix` | Search quality, Zero results |
| `search_no_results` | A search returned no products. | `query_length`, `query_tokens` | Search quality, Zero results |
| `search_filter_applied` | A facet was applied on the results page. | `facet_key`, `facet_value`, `result_count` | Search quality, Zero results |
| `search_result_clicked` | A product in the results was opened. | `sku`, `position`, `page` | Search quality, Zero results |
| `search_spelling_accepted` | The shopper accepted the 'did you mean' suggestion. | `query_length` | Search quality, Zero results |
| `search_cleared` | The query was cleared with the clear button. | `query_length` | Search quality, Zero results |
| `search_recent_clicked` | A recent search was chosen from the suggestions. | `position`, `query_length` | Search quality, Zero results |
| `search_recent_cleared` | The recent searches were cleared. | `count` | Search quality, Zero results |
| `search_voice_started` | Voice search started listening. | `source` | Search quality, Zero results |
| `search_barcode_scanned` | A barcode was scanned from the search field. | `matched` | Search quality, Zero results |

### Product

Owner: `catalog`.

| event | sent when | properties | dashboards |
|---|---|---|---|
| `product_viewed` | A product page rendered its price and buy box. | `sku`, `list_id`, `position`, `price_cents`, `in_stock` | Product page funnel, Catalog health |
| `product_image_zoomed` | An image was opened in the zoom viewer. | `sku`, `image_index` | Product page funnel, Catalog health |
| `product_video_played` | A product video started playing. | `sku`, `video_id`, `autoplay` | Product page funnel, Catalog health |
| `product_variant_selected` | A size, color or other variant was chosen. | `sku`, `variant_sku`, `attribute` | Product page funnel, Catalog health |
| `product_size_guide_opened` | The size guide was opened. | `sku`, `category_id` | Product page funnel, Catalog health |
| `product_shared` | The share sheet was used. | `sku`, `channel` | Product page funnel, Catalog health |
| `product_stock_alert_set` | The shopper asked to be told when an item is back. | `sku`, `channel` | Product page funnel, Catalog health |
| `product_delivery_estimate_shown` | The delivery estimate was shown for a postal code. | `sku`, `country`, `days_min`, `days_max` | Product page funnel, Catalog health |
| `product_reviews_opened` | The reviews tab was opened. | `sku`, `review_count`, `rating` | Product page funnel, Catalog health |
| `product_question_asked` | A question was posted on a product. | `sku`, `length` | Product page funnel, Catalog health |
| `product_compare_added` | A product was added to the comparison tray. | `sku`, `tray_size` | Product page funnel, Catalog health |
| `product_compare_opened` | The comparison table was opened. | `skus`, `tray_size` | Product page funnel, Catalog health |

### Cart

Owner: `checkout`.

| event | sent when | properties | dashboards |
|---|---|---|---|
| `cart_viewed` | The cart page or drawer rendered. | `line_count`, `units`, `subtotal_cents`, `source` | Checkout funnel, Cart health |
| `cart_line_added` | A line was added or its quantity grew from a product page. | `sku`, `quantity`, `unit_cents`, `source` | Checkout funnel, Cart health |
| `cart_line_removed` | A line was removed. | `sku`, `quantity`, `unit_cents`, `source` | Checkout funnel, Cart health |
| `cart_quantity_changed` | The quantity stepper changed a line. | `sku`, `from_quantity`, `to_quantity` | Checkout funnel, Cart health |
| `cart_quantity_capped` | A quantity change was capped by the store policy. | `sku`, `requested`, `capped_to` | Checkout funnel, Cart health |
| `cart_saved_for_later` | A line was moved to saved for later. | `sku`, `quantity` | Checkout funnel, Cart health |
| `cart_restored` | A saved line was moved back to the cart. | `sku`, `quantity` | Checkout funnel, Cart health |
| `cart_shipping_estimated` | The shipping estimator ran. | `country`, `postal_prefix`, `options` | Checkout funnel, Cart health |
| `cart_gift_wrap_toggled` | Gift wrap was turned on or off for a line. | `sku`, `enabled` | Checkout funnel, Cart health |
| `cart_emptied` | Every line was removed with 'Empty cart'. | `line_count`, `units` | Checkout funnel, Cart health |
| `cart_stale_line_shown` | A line was flagged as stale (price or stock changed). | `sku`, `reason` | Checkout funnel, Cart health |
| `cart_recommendation_clicked` | A 'goes well with' tile was used. | `sku`, `position`, `model` | Checkout funnel, Cart health |

### Checkout

Owner: `checkout`.

| event | sent when | properties | dashboards |
|---|---|---|---|
| `checkout_started` | The first checkout step rendered. | `line_count`, `units`, `subtotal_cents`, `guest` | Checkout funnel, Payments |
| `checkout_step_viewed` | A checkout step rendered. | `step`, `step_index`, `express` | Checkout funnel, Payments |
| `checkout_step_completed` | A step was submitted without errors. | `step`, `step_index`, `duration_ms` | Checkout funnel, Payments |
| `checkout_step_failed` | A step was submitted and showed field errors. | `step`, `fields`, `error_codes` | Checkout funnel, Payments |
| `checkout_address_suggested` | The address checker offered a corrected address. | `country`, `accepted` | Checkout funnel, Payments |
| `checkout_shipping_selected` | A shipping option was chosen. | `option_id`, `price_cents`, `days_max` | Checkout funnel, Payments |
| `checkout_payment_selected` | A payment method was chosen. | `method`, `saved` | Checkout funnel, Payments |
| `checkout_payment_failed` | The payment provider declined or errored. | `method`, `reason_code` | Checkout funnel, Payments |
| `checkout_express_used` | Express checkout was used from the cart. | `method` | Checkout funnel, Payments |
| `checkout_review_edited` | The shopper jumped back from the review step. | `to_step` | Checkout funnel, Payments |
| `checkout_terms_opened` | The terms of sale were opened. | `step` | Checkout funnel, Payments |
| `checkout_abandoned` | The tab closed or navigated away during checkout. | `last_step`, `duration_ms` | Checkout funnel, Payments |
| `order_placed` | The order confirmation rendered. | `order_id`, `total_cents`, `units`, `payment_method`, `shipping_option` | Checkout funnel, Payments |

### Account

Owner: `identity`.

| event | sent when | properties | dashboards |
|---|---|---|---|
| `signup_viewed` | The sign-up form rendered. | `source` | Identity, Retention |
| `signup_completed` | An account was created. | `method`, `marketing_opt_in` | Identity, Retention |
| `signin_viewed` | The sign-in form rendered. | `source` | Identity, Retention |
| `signin_completed` | The shopper signed in. | `method`, `remembered` | Identity, Retention |
| `signin_failed` | Sign-in failed. | `method`, `reason_code` | Identity, Retention |
| `password_reset_requested` | A reset link was requested. | `source` | Identity, Retention |
| `password_reset_completed` | A new password was set from a reset link. | — | Identity, Retention |
| `address_book_updated` | An address was added, changed or removed. | `action`, `country`, `is_default` | Identity, Retention |
| `payment_methods_updated` | A saved card was added or removed. | `action`, `brand` | Identity, Retention |
| `preferences_updated` | Communication preferences changed. | `channels_on`, `channels_off` | Identity, Retention |
| `account_deleted` | The shopper deleted their account. | `tenure_days` | Identity, Retention |
| `email_change_requested` | The shopper asked to change their e-mail address. | `verified` | Identity, Retention |
| `two_factor_enabled` | Two-step sign-in was turned on. | `method` | Identity, Retention |
| `two_factor_disabled` | Two-step sign-in was turned off. | `method` | Identity, Retention |
| `data_export_requested` | The shopper asked for a copy of their data. | — | Identity, Retention |

### Orders

Owner: `post-purchase`.

| event | sent when | properties | dashboards |
|---|---|---|---|
| `orders_viewed` | The order history rendered. | `order_count`, `page` | Post-purchase, Returns |
| `order_detail_viewed` | An order detail page rendered. | `order_id`, `status`, `age_days` | Post-purchase, Returns |
| `order_tracking_opened` | The carrier tracking link was opened. | `order_id`, `carrier` | Post-purchase, Returns |
| `order_cancel_requested` | The shopper asked to cancel an order. | `order_id`, `age_minutes` | Post-purchase, Returns |
| `order_cancel_refused` | Cancelling was refused (window closed or shipped). | `order_id`, `reason_code` | Post-purchase, Returns |
| `order_return_started` | A return was started. | `order_id`, `line_count` | Post-purchase, Returns |
| `order_return_label_downloaded` | A return label was downloaded. | `order_id`, `carrier` | Post-purchase, Returns |
| `order_invoice_downloaded` | An invoice PDF was downloaded. | `order_id` | Post-purchase, Returns |
| `order_reordered` | 'Buy again' added the lines of an old order. | `order_id`, `line_count` | Post-purchase, Returns |

### Wishlist

Owner: `catalog`.

| event | sent when | properties | dashboards |
|---|---|---|---|
| `wishlist_viewed` | The wishlist rendered. | `item_count` | Catalog health, Retention |
| `wishlist_item_added` | An item was saved to the wishlist. | `sku`, `source` | Catalog health, Retention |
| `wishlist_item_removed` | An item was removed from the wishlist. | `sku`, `source` | Catalog health, Retention |
| `wishlist_shared` | The wishlist share link was copied. | `item_count` | Catalog health, Retention |
| `wishlist_moved_to_cart` | An item went from the wishlist to the cart. | `sku` | Catalog health, Retention |

### Promotions

Owner: `growth`.

| event | sent when | properties | dashboards |
|---|---|---|---|
| `promo_banner_viewed` | A promotion banner was visible for one second. | `promo_id`, `slot` | Growth weekly, Promotions |
| `promo_code_entered` | A code was typed into the promo field and submitted. | `code_length`, `step` | Growth weekly, Promotions |
| `promo_code_accepted` | The promo field showed the discount. | `promo_id`, `discount_cents`, `step` | Growth weekly, Promotions |
| `promo_code_rejected` | The promo field showed an error. | `reason_code`, `step` | Growth weekly, Promotions |
| `promo_code_removed` | An applied code was removed. | `promo_id`, `step` | Growth weekly, Promotions |
| `free_shipping_progress_shown` | The free shipping meter rendered. | `remaining_cents` | Growth weekly, Promotions |
| `free_shipping_reached` | The cart crossed the free shipping threshold. | `subtotal_cents` | Growth weekly, Promotions |

### Support

Owner: `support`.

| event | sent when | properties | dashboards |
|---|---|---|---|
| `help_center_opened` | The help center was opened. | `source` | Support load |
| `help_article_viewed` | A help article rendered. | `article_id`, `source` | Support load |
| `help_article_rated` | An article was rated helpful or not. | `article_id`, `helpful` | Support load |
| `chat_opened` | The support chat opened. | `source`, `waiting_agents` | Support load |
| `chat_closed` | The support chat closed. | `duration_ms`, `resolved` | Support load |
| `contact_form_submitted` | The contact form was sent. | `topic`, `has_order_id` | Support load |

### Notifications

Owner: `growth`.

| event | sent when | properties | dashboards |
|---|---|---|---|
| `notification_prompt_shown` | The push permission prompt was shown. | `source` | Growth weekly, Retention |
| `notification_prompt_answered` | The shopper answered the push prompt. | `granted` | Growth weekly, Retention |
| `notification_opened` | A push or in-app notification was opened. | `campaign`, `kind` | Growth weekly, Retention |
| `newsletter_subscribed` | The newsletter form was submitted. | `source` | Growth weekly, Retention |
| `newsletter_unsubscribed` | The shopper unsubscribed from the account page. | `reason` | Growth weekly, Retention |

### Performance

Owner: `web-platform`.

| event | sent when | properties | dashboards |
|---|---|---|---|
| `page_vitals_reported` | The page reported its web vitals after the first interaction or on hide. | `lcp_ms`, `inp_ms`, `cls_milli`, `page_type` | Web vitals, Error budget |
| `api_error_shown` | A request failed and the shopper saw an error state. | `endpoint_group`, `status`, `retryable` | Web vitals, Error budget |
| `offline_banner_shown` | The offline banner appeared. | `page_type` | Web vitals, Error budget |
| `image_load_failed` | A product image failed to load after its retry. | `sku`, `size` | Web vitals, Error budget |
| `slow_checkout_step` | A checkout step took more than 5 seconds to answer. | `step`, `duration_ms` | Web vitals, Error budget |
| `client_error_caught` | The error boundary caught a render error. | `component`, `page_type` | Web vitals, Error budget |

### Experiments

Owner: `growth`.

| event | sent when | properties | dashboards |
|---|---|---|---|
| `experiment_exposed` | The shopper first saw a variant of a running experiment. | `experiment_id`, `variant` | Experiment readouts |
| `experiment_goal_reached` | A goal configured for an experiment was reached. | `experiment_id`, `variant`, `goal` | Experiment readouts |
| `feature_flag_evaluated` | A flag was read for a signed-in shopper for the first time in a session. | `flag`, `enabled`, `bucket` | Experiment readouts |
| `survey_shown` | An in-page survey was shown. | `survey_id`, `trigger` | Experiment readouts |
| `survey_answered` | An in-page survey was answered or dismissed. | `survey_id`, `answered` | Experiment readouts |

### Reviews

Owner: `catalog`.

| event | sent when | properties | dashboards |
|---|---|---|---|
| `review_form_opened` | The write-a-review form opened. | `sku`, `source` | Catalog health, Reviews moderation |
| `review_submitted` | A review was submitted. | `sku`, `rating`, `has_photos`, `length` | Catalog health, Reviews moderation |
| `review_helpful_voted` | A review was voted helpful or not. | `sku`, `review_id`, `helpful` | Catalog health, Reviews moderation |
| `review_reported` | A review was reported. | `sku`, `review_id`, `reason` | Catalog health, Reviews moderation |
| `review_photos_opened` | Review photos were opened in the viewer. | `sku`, `review_id`, `photo_count` | Catalog health, Reviews moderation |

## Enumerations

| property | values |
|---|---|
| `source` | `header`, `footer`, `home`, `category`, `search`, `product`, `cart`, `checkout`, `account`, `email`, `push`, `deep_link` |
| `sort` | `relevance`, `newest`, `price_asc`, `price_desc`, `rating`, `best_selling` |
| `action` | `add`, `remove`, `update` |
| `method (sign-in)` | `password`, `magic_link`, `google`, `apple` |
| `method (payment)` | `card`, `paypal`, `apple_pay`, `google_pay`, `gift_card`, `invoice` |
| `channel (share)` | `copy_link`, `whatsapp`, `email`, `facebook`, `x`, `pinterest`, `native` |
| `channel (stock alert)` | `email`, `push`, `sms` |
| `reason_code (promo)` | `unknown_code`, `expired`, `minimum_not_reached`, `not_combinable`, `already_used`, `not_eligible` |
| `reason_code (sign-in)` | `wrong_password`, `unknown_account`, `locked`, `rate_limited`, `provider_error` |
| `reason_code (payment)` | `declined`, `insufficient_funds`, `expired_card`, `authentication_failed`, `provider_error`, `timeout` |
| `reason_code (cancel)` | `window_closed`, `already_shipped`, `already_cancelled` |
| `reason (stale line)` | `price_up`, `price_down`, `out_of_stock`, `low_stock`, `discontinued` |
| `kind (notification)` | `order_update`, `back_in_stock`, `price_drop`, `promotion`, `review_request` |
| `step` | `address`, `shipping`, `payment`, `review` |
| `topic (contact)` | `order`, `return`, `payment`, `product`, `account`, `other` |

## Data quality alerts

The collector checks every event against this catalog and posts to #data-alerts when:

- an event name is not in the catalog (the event is dropped);
- a property is missing, has the wrong type or a value outside its enumeration (the event is kept and the property is set to null);
- the daily volume of an event moves more than 40% from its four-week median for the same weekday;
- an event carries something that looks like an e-mail address, a phone number or a card number (the whole event is dropped and the owner is paged).

Each alert names the owner of the area from the catalog. Fix the sender, not the alert threshold.

## Checklist for a change that sends events

1. The event and every property are in the catalog above, with the dashboard that reads them.
2. The unit test of the component asserts the exact `track()` call with the fake tracker from `test/support/tracker.ts`.
3. Nothing personal is sent (see the list above); lengths and counts instead of text.
4. The event fires once per user action, after the server answer when there is one.
5. The pull request description lists the events added or changed so the data team can update the dashboards on release day.
