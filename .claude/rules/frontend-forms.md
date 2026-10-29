---
paths:
  - "src/frontend/form.ts"
  - "src/frontend/checkout.ts"
---

# Frontend forms

Address, payment and account forms are built from the helpers in `src/frontend/form.ts`. These rules keep them accessible, consistent across countries and compatible with browser autofill and password managers.

## Fields

- Every field has a visible label. Placeholders are examples, never the label.
- Every field sets `autocomplete` from the table below; password managers and the browser fill the address and the card from it.
- Set `inputmode` for numeric fields (`numeric` for card numbers and postal codes that are digits only, `tel` for phone numbers) instead of `type="number"`, which drops leading zeros.
- Optional fields say "(optional)" in the label; required ones are not marked.
- Never disable paste, never split one value across several inputs (one field for the card number, one for the expiry date).

## Validation

- Validate on blur and on submit, not on every key press. Clear a field's error as soon as its value becomes valid.
- On submit, collect every error with `collectErrors()`, show the error summary at the top with a link to each field, and move focus to the summary.
- Error messages come from the `form.*` copy keys; never build one from the field name.
- Trim surrounding spaces before validating and before sending; keep inner spaces.
- The server validates again; the client checks are for the shopper, not for safety.

## Accessibility

- Each error is linked to its input with `aria-describedby`, and the input gets `aria-invalid="true"` while it has an error.
- The error summary is a region with `role="alert"` and a heading.
- Groups of radio buttons (shipping options, payment methods) are a `fieldset` with a `legend`.
- Focus order follows the visual order. No positive `tabindex`.
- Touch targets are at least 44×44 px, including the checkboxes of gift wrap and terms.

## Address fields by country

The address form shows the fields of the selected country in its order. Postal code patterns are checked on the client only to catch typos; the address checker does the real validation.

| code | country | fields, in order | postal pattern | region field | postal label |
|---|---|---|---|---|---|
| `US` | United States | Street address, Apt/Suite (optional), City, State, ZIP code | `^\d{5}(-\d{4})?$` | State (select) | ZIP code |
| `CA` | Canada | Street address, Apt/Suite (optional), City, Province, Postal code | `^[A-Z]\d[A-Z] ?\d[A-Z]\d$` | Province (select) | Postal code |
| `GB` | United Kingdom | Address line 1, Address line 2 (optional), Town or city, County (optional), Postcode | `^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$` | County (free text, optional) | Postcode |
| `IE` | Ireland | Address line 1, Address line 2 (optional), Town or city, County, Eircode | `^[A-Z]\d{2} ?[A-Z\d]{4}$` | County (select) | Eircode |
| `DE` | Germany | Street and number, Additional info (optional), Postal code, City | `^\d{5}$` | — | Postleitzahl |
| `AT` | Austria | Street and number, Additional info (optional), Postal code, City | `^\d{4}$` | — | Postleitzahl |
| `CH` | Switzerland | Street and number, Additional info (optional), Postal code, City | `^\d{4}$` | — | Postleitzahl |
| `FR` | France | Address, Address complement (optional), Postal code, City | `^\d{5}$` | — | Code postal |
| `BE` | Belgium | Street and number, Box (optional), Postal code, City | `^\d{4}$` | — | Postal code |
| `NL` | Netherlands | Street and number, Addition (optional), Postal code, City | `^\d{4} ?[A-Z]{2}$` | — | Postcode |
| `LU` | Luxembourg | Street and number, Postal code, City | `^(L-)?\d{4}$` | — | Postal code |
| `ES` | Spain | Street and number, Floor and door (optional), Postal code, City, Province | `^\d{5}$` | Province (select) | Código postal |
| `PT` | Portugal | Address, Address complement (optional), Postal code, City | `^\d{4}-\d{3}$` | — | Código postal |
| `IT` | Italy | Street and number, Additional info (optional), Postal code, City, Province | `^\d{5}$` | Province (select, two letters) | CAP |
| `DK` | Denmark | Street and number, Additional info (optional), Postal code, City | `^\d{4}$` | — | Postnummer |
| `SE` | Sweden | Street and number, Additional info (optional), Postal code, City | `^\d{3} ?\d{2}$` | — | Postnummer |
| `NO` | Norway | Street and number, Additional info (optional), Postal code, City | `^\d{4}$` | — | Postnummer |
| `FI` | Finland | Street and number, Additional info (optional), Postal code, City | `^\d{5}$` | — | Postinumero |
| `PL` | Poland | Street and number, Additional info (optional), Postal code, City | `^\d{2}-\d{3}$` | — | Kod pocztowy |
| `CZ` | Czechia | Street and number, Additional info (optional), Postal code, City | `^\d{3} ?\d{2}$` | — | PSČ |
| `BR` | Brazil | CEP, Street, Number, Complement (optional), Neighborhood, City, State | `^\d{5}-?\d{3}$` | State (select) | CEP (first: fills street, neighborhood, city and state) |
| `MX` | Mexico | Street and number, Colonia, Postal code, City, State | `^\d{5}$` | State (select) | Código postal |
| `AR` | Argentina | Street and number, Floor/apartment (optional), Postal code, City, Province | `^[A-Z]?\d{4}([A-Z]{3})?$` | Province (select) | Código postal |
| `CL` | Chile | Street and number, Apartment (optional), Comuna, Region | `^\d{7}$` | Region (select) | Código postal (optional) |
| `AU` | Australia | Street address, Apartment (optional), Suburb, State, Postcode | `^\d{4}$` | State (select) | Postcode |
| `NZ` | New Zealand | Street address, Suburb (optional), City, Postcode | `^\d{4}$` | — | Postcode |
| `JP` | Japan | Postal code, Prefecture, City, Address line 1, Address line 2 (optional) | `^\d{3}-?\d{4}$` | Prefecture (select) | 郵便番号 (first: fills prefecture and city) |
| `KR` | South Korea | Postal code, Province, City, Address, Detailed address | `^\d{5}$` | Province (select) | Postal code |
| `SG` | Singapore | Address, Unit number (optional), Postal code | `^\d{6}$` | — | Postal code |
| `IN` | India | Flat/house, Area/street, Landmark (optional), City, State, PIN code | `^\d{6}$` | State (select) | PIN code |

## Region values

Where the region is a select, its values are the codes below (sent to the server as is) and the labels are the names, sorted by name in the shopper's locale.

### US

| value | label |
|---|---|
| `AL` | Alabama |
| `AK` | Alaska |
| `AZ` | Arizona |
| `AR` | Arkansas |
| `CA` | California |
| `CO` | Colorado |
| `CT` | Connecticut |
| `DE` | Delaware |
| `DC` | District of Columbia |
| `FL` | Florida |
| `GA` | Georgia |
| `HI` | Hawaii |
| `ID` | Idaho |
| `IL` | Illinois |
| `IN` | Indiana |
| `IA` | Iowa |
| `KS` | Kansas |
| `KY` | Kentucky |
| `LA` | Louisiana |
| `ME` | Maine |
| `MD` | Maryland |
| `MA` | Massachusetts |
| `MI` | Michigan |
| `MN` | Minnesota |
| `MS` | Mississippi |
| `MO` | Missouri |
| `MT` | Montana |
| `NE` | Nebraska |
| `NV` | Nevada |
| `NH` | New Hampshire |
| `NJ` | New Jersey |
| `NM` | New Mexico |
| `NY` | New York |
| `NC` | North Carolina |
| `ND` | North Dakota |
| `OH` | Ohio |
| `OK` | Oklahoma |
| `OR` | Oregon |
| `PA` | Pennsylvania |
| `RI` | Rhode Island |
| `SC` | South Carolina |
| `SD` | South Dakota |
| `TN` | Tennessee |
| `TX` | Texas |
| `UT` | Utah |
| `VT` | Vermont |
| `VA` | Virginia |
| `WA` | Washington |
| `WV` | West Virginia |
| `WI` | Wisconsin |
| `WY` | Wyoming |
| `PR` | Puerto Rico |
| `AA` | Armed Forces Americas |
| `AE` | Armed Forces Europe |
| `AP` | Armed Forces Pacific |

### CA

| value | label |
|---|---|
| `AB` | Alberta |
| `BC` | British Columbia |
| `MB` | Manitoba |
| `NB` | New Brunswick |
| `NL` | Newfoundland and Labrador |
| `NS` | Nova Scotia |
| `NT` | Northwest Territories |
| `NU` | Nunavut |
| `ON` | Ontario |
| `PE` | Prince Edward Island |
| `QC` | Quebec |
| `SK` | Saskatchewan |
| `YT` | Yukon |

### AU

| value | label |
|---|---|
| `ACT` | Australian Capital Territory |
| `NSW` | New South Wales |
| `NT` | Northern Territory |
| `QLD` | Queensland |
| `SA` | South Australia |
| `TAS` | Tasmania |
| `VIC` | Victoria |
| `WA` | Western Australia |

### BR

| value | label |
|---|---|
| `AC` | Acre |
| `AL` | Alagoas |
| `AP` | Amapá |
| `AM` | Amazonas |
| `BA` | Bahia |
| `CE` | Ceará |
| `DF` | Distrito Federal |
| `ES` | Espírito Santo |
| `GO` | Goiás |
| `MA` | Maranhão |
| `MT` | Mato Grosso |
| `MS` | Mato Grosso do Sul |
| `MG` | Minas Gerais |
| `PA` | Pará |
| `PB` | Paraíba |
| `PR` | Paraná |
| `PE` | Pernambuco |
| `PI` | Piauí |
| `RJ` | Rio de Janeiro |
| `RN` | Rio Grande do Norte |
| `RS` | Rio Grande do Sul |
| `RO` | Rondônia |
| `RR` | Roraima |
| `SC` | Santa Catarina |
| `SP` | São Paulo |
| `SE` | Sergipe |
| `TO` | Tocantins |

### MX

| value | label |
|---|---|
| `AGU` | Aguascalientes |
| `BCN` | Baja California |
| `BCS` | Baja California Sur |
| `CAM` | Campeche |
| `CHP` | Chiapas |
| `CHH` | Chihuahua |
| `CMX` | Ciudad de México |
| `COA` | Coahuila |
| `COL` | Colima |
| `DUR` | Durango |
| `GUA` | Guanajuato |
| `GRO` | Guerrero |
| `HID` | Hidalgo |
| `JAL` | Jalisco |
| `MEX` | Estado de México |
| `MIC` | Michoacán |
| `MOR` | Morelos |
| `NAY` | Nayarit |
| `NLE` | Nuevo León |
| `OAX` | Oaxaca |
| `PUE` | Puebla |
| `QUE` | Querétaro |
| `ROO` | Quintana Roo |
| `SLP` | San Luis Potosí |
| `SIN` | Sinaloa |
| `SON` | Sonora |
| `TAB` | Tabasco |
| `TAM` | Tamaulipas |
| `TLA` | Tlaxcala |
| `VER` | Veracruz |
| `YUC` | Yucatán |
| `ZAC` | Zacatecas |

### ES

| value | label |
|---|---|
| `C` | A Coruña |
| `VI` | Álava |
| `AB` | Albacete |
| `A` | Alicante |
| `AL` | Almería |
| `O` | Asturias |
| `AV` | Ávila |
| `BA` | Badajoz |
| `PM` | Baleares |
| `B` | Barcelona |
| `BU` | Burgos |
| `CC` | Cáceres |
| `CA` | Cádiz |
| `S` | Cantabria |
| `CS` | Castellón |
| `CE` | Ceuta |
| `CR` | Ciudad Real |
| `CO` | Córdoba |
| `CU` | Cuenca |
| `GI` | Girona |
| `GR` | Granada |
| `GU` | Guadalajara |
| `SS` | Gipuzkoa |
| `H` | Huelva |
| `HU` | Huesca |
| `J` | Jaén |
| `LO` | La Rioja |
| `GC` | Las Palmas |
| `LE` | León |
| `L` | Lleida |
| `LU` | Lugo |
| `M` | Madrid |
| `MA` | Málaga |
| `ML` | Melilla |
| `MU` | Murcia |
| `NA` | Navarra |
| `OR` | Ourense |
| `P` | Palencia |
| `PO` | Pontevedra |
| `SA` | Salamanca |
| `TF` | Santa Cruz de Tenerife |
| `SG` | Segovia |
| `SE` | Sevilla |
| `SO` | Soria |
| `T` | Tarragona |
| `TE` | Teruel |
| `TO` | Toledo |
| `V` | Valencia |
| `VA` | Valladolid |
| `BI` | Bizkaia |
| `ZA` | Zamora |
| `Z` | Zaragoza |

### JP

| value | label |
|---|---|
| `01` | Hokkaido |
| `02` | Aomori |
| `03` | Iwate |
| `04` | Miyagi |
| `05` | Akita |
| `06` | Yamagata |
| `07` | Fukushima |
| `08` | Ibaraki |
| `09` | Tochigi |
| `10` | Gunma |
| `11` | Saitama |
| `12` | Chiba |
| `13` | Tokyo |
| `14` | Kanagawa |
| `15` | Niigata |
| `16` | Toyama |
| `17` | Ishikawa |
| `18` | Fukui |
| `19` | Yamanashi |
| `20` | Nagano |
| `21` | Gifu |
| `22` | Shizuoka |
| `23` | Aichi |
| `24` | Mie |
| `25` | Shiga |
| `26` | Kyoto |
| `27` | Osaka |
| `28` | Hyogo |
| `29` | Nara |
| `30` | Wakayama |
| `31` | Tottori |
| `32` | Shimane |
| `33` | Okayama |
| `34` | Hiroshima |
| `35` | Yamaguchi |
| `36` | Tokushima |
| `37` | Kagawa |
| `38` | Ehime |
| `39` | Kochi |
| `40` | Fukuoka |
| `41` | Saga |
| `42` | Nagasaki |
| `43` | Kumamoto |
| `44` | Oita |
| `45` | Miyazaki |
| `46` | Kagoshima |
| `47` | Okinawa |

### IN

| value | label |
|---|---|
| `AN` | Andaman and Nicobar Islands |
| `AP` | Andhra Pradesh |
| `AR` | Arunachal Pradesh |
| `AS` | Assam |
| `BR` | Bihar |
| `CH` | Chandigarh |
| `CT` | Chhattisgarh |
| `DH` | Dadra and Nagar Haveli and Daman and Diu |
| `DL` | Delhi |
| `GA` | Goa |
| `GJ` | Gujarat |
| `HR` | Haryana |
| `HP` | Himachal Pradesh |
| `JK` | Jammu and Kashmir |
| `JH` | Jharkhand |
| `KA` | Karnataka |
| `KL` | Kerala |
| `LA` | Ladakh |
| `LD` | Lakshadweep |
| `MP` | Madhya Pradesh |
| `MH` | Maharashtra |
| `MN` | Manipur |
| `ML` | Meghalaya |
| `MZ` | Mizoram |
| `NL` | Nagaland |
| `OR` | Odisha |
| `PY` | Puducherry |
| `PB` | Punjab |
| `RJ` | Rajasthan |
| `SK` | Sikkim |
| `TN` | Tamil Nadu |
| `TG` | Telangana |
| `TR` | Tripura |
| `UP` | Uttar Pradesh |
| `UT` | Uttarakhand |
| `WB` | West Bengal |

## Phone numbers

The phone field has a country code select (defaulting to the shipping country) and a number field. The number is formatted while typing with the country's grouping and stored in E.164.

| country | code | example | digits |
|---|---|---|---|
| `US` | +1 | (201) 555-0123 | 10 |
| `CA` | +1 | (506) 234-5678 | 10 |
| `GB` | +44 | 07400 123456 | 11 |
| `IE` | +353 | 085 012 3456 | 10 |
| `DE` | +49 | 01512 3456789 | 11 |
| `AT` | +43 | 0664 123456 | 10 |
| `CH` | +41 | 078 123 45 67 | 10 |
| `FR` | +33 | 06 12 34 56 78 | 10 |
| `BE` | +32 | 0470 12 34 56 | 10 |
| `NL` | +31 | 06 12345678 | 10 |
| `ES` | +34 | 612 34 56 78 | 9 |
| `PT` | +351 | 912 345 678 | 9 |
| `IT` | +39 | 312 345 6789 | 10 |
| `DK` | +45 | 32 12 34 56 | 8 |
| `SE` | +46 | 070-123 45 67 | 10 |
| `NO` | +47 | 406 12 345 | 8 |
| `FI` | +358 | 041 2345678 | 10 |
| `PL` | +48 | 512 345 678 | 9 |
| `CZ` | +420 | 601 123 456 | 9 |
| `BR` | +55 | (11) 96123-4567 | 11 |
| `MX` | +52 | 222 123 4567 | 10 |
| `AR` | +54 | 011 15-2345-6789 | 12 |
| `CL` | +56 | 9 6123 4567 | 9 |
| `AU` | +61 | 0412 345 678 | 10 |
| `NZ` | +64 | 021 123 4567 | 10 |
| `JP` | +81 | 090-1234-5678 | 11 |
| `KR` | +82 | 010-2000-0000 | 11 |
| `SG` | +65 | 8123 4567 | 8 |
| `IN` | +91 | 081234 56789 | 11 |

## Autocomplete tokens

| field | autocomplete | type | inputmode | notes |
|---|---|---|---|---|
| Full name | `name` | text | — | Max 80 characters |
| First name | `given-name` | text | — | Only where the country splits names (JP, KR) |
| Last name | `family-name` | text | — | Only where the country splits names (JP, KR) |
| Company | `organization` | text | — | Optional everywhere |
| Address line 1 | `address-line1` | text | — | Street and number in one field |
| Address line 2 | `address-line2` | text | — | Optional |
| City | `address-level2` | text | — | — |
| State / province / region | `address-level1` | select or text | — | Select where the list is closed |
| Neighborhood / colonia / comuna | `address-level3` | text | — | BR, MX, CL |
| Postal code | `postal-code` | text | numeric where digits only | Keep as text: leading zeros |
| Country | `country` | select | — | ISO 3166-1 alpha-2 values |
| E-mail | `email` | email | email | — |
| Phone | `tel` | tel | tel | Country code select next to it |
| Card number | `cc-number` | text | numeric | Spaces every 4 digits while typing, removed before sending |
| Name on card | `cc-name` | text | — | — |
| Expiry date | `cc-exp` | text | numeric | One field, MM/YY |
| Security code | `cc-csc` | text | numeric | 3 or 4 digits |
| Current password | `current-password` | password | — | Sign-in form |
| New password | `new-password` | password | — | Sign-up and reset forms |
| One-time code | `one-time-code` | text | numeric | Magic link fallback |

## Field limits

| field | length | allowed |
|---|---|---|
| Full name | 1–80 | Letters in any script, spaces, apostrophes, hyphens, periods |
| Company | 0–80 | Any printable characters |
| Address line 1 | 1–100 | Any printable characters |
| Address line 2 | 0–100 | Any printable characters |
| City | 1–60 | Any printable characters |
| Postal code | country pattern | Upper-cased before checking; spaces normalized |
| E-mail | 3–254 | One @, a dot in the domain; no further client checks |
| Phone | 6–20 digits | Digits, spaces, +, -, parentheses; stored as E.164 |
| Card number | 12–19 digits | Luhn check on the client |
| Security code | 3–4 digits | 4 only for American Express |
| Gift message | 0–200 | Shown on the packing slip; no emoji (the printer drops them) |
| Delivery instructions | 0–140 | Sent to the carrier as is |
| Password | 10–128 | No composition rules; checked against the breached list on the server |

## Address checker answers

On submit of the address step the address checker answers one of the outcomes below. The form never blocks the shopper on a checker answer: they can always keep what they typed.

| outcome | meaning | what the form does |
|---|---|---|
| `verified` | The address exists as typed | Continue to the next step without a dialog |
| `corrected` | Small fixes (case, abbreviations, postal code suffix) | Apply silently and show “We tidied up your address” |
| `suggested` | A different but likely address | Show the suggestion dialog (`checkout.address.suggestion`) |
| `partial` | The street exists but the number does not | Ask to check the number; keep the shopper's choice |
| `unknown` | The checker could not match the address | Continue; flag the order for the warehouse to call |
| `unavailable` | The checker timed out or errored | Continue; do not show anything to the shopper |
| `po_box` | A PO box in a country where couriers cannot deliver to one | Show the field error on address line 1 |
| `restricted` | A destination we do not ship to (some islands and territories) | Show the field error on the postal code |

## Country notes

- **BR:** the CEP field comes first and fills the street, neighborhood, city and state from the postal service lookup; the number and complement stay empty for the shopper. The CPF is not asked in the address form; the payment provider asks it when needed.
- **JP:** the postal code comes first and fills the prefecture and city. Names are family name first, with two fields; the furigana fields are not shown.
- **KR:** the postal code lookup opens the address search dialog; the detailed address is typed.
- **GB and IE:** the postcode/Eircode lookup offers a list of addresses; “Enter the address manually” is always available below it.
- **US:** military addresses (AA, AE, AP) use APO/FPO/DPO as the city and only ship by the postal service.
- **DE, AT, CH:** the street and the house number are one field; do not split them.
- **NL:** the postcode and house number fill the street and the city; the addition is optional.
- **IN:** the landmark field is optional but shown, couriers rely on it.
- **CL:** the postal code is optional; the comuna is required and drives the shipping price.
- **AR:** accept both the old four-digit postal code and the new eight-character CPA.

## Payment form

- Card fields are rendered inside the payment provider's iframes; our code never reads the card number, the expiry date or the security code. `form.ts` only receives the provider's token and the last four digits.
- Show the card brand as soon as the provider reports it; do not guess it from the first digits.
- A declined card keeps every field filled except the security code.
- "Save this card" is unchecked by default and only shown to signed-in shoppers.
- Never retry a payment automatically. A timeout shows `checkout.payment.error.timeout` and the shopper decides.

## Saved addresses

- Signed-in shoppers see their saved addresses as radio cards above the form, the default one selected. “Add a new address” opens the empty form below the cards.
- A saved address from a country we no longer ship to is shown disabled with the reason, never hidden.
- Editing a saved address from checkout changes it in the address book too; say so under the form (“Changes are saved to your address book”).
- A guest's address is kept only in the checkout session. Offer to save it after the order is placed, on the confirmation page, never before.
- The billing address defaults to “Same as delivery”; unchecking it shows a second address form with the same rules and its own country select.

## Account forms

- Sign-in and sign-up forms use `current-password` and `new-password` so password managers offer to save and fill.
- The password field has a show/hide toggle (`form.show` / `form.hide`) and no confirmation field.
- After three failed sign-ins the form shows the reset link above the button; the server rate limits, the client does not count attempts on its own.
- Changing the e-mail address asks for the current password in the same form.

## Review checklist

1. Labels, `autocomplete`, `inputmode` and limits match the tables above.
2. Errors come from `form.*` keys, are linked to their inputs and listed in the summary.
3. The country's fields are shown in its order, with its postal label and pattern.
4. No card data reaches our code.
5. Keyboard only: every field and button can be reached and used in visual order.
