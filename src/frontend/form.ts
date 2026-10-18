export interface FieldError {
  field: string
  message: string
}

export function required(field: string, value: string): FieldError | undefined {
  return value.trim() === '' ? { field, message: 'This field is required.' } : undefined
}

export function collectErrors(checks: (FieldError | undefined)[]): FieldError[] {
  return checks.filter((check): check is FieldError => check !== undefined)
}

export function parseQuantity(input: string): number {
  const text = input.trim()
  if (!/^\d{1,2}$/.test(text) || Number(text) === 0) {
    throw new Error('Enter a whole number from 1 to 99.')
  }
  return Number(text)
}

export function quantityError(field: string, input: string): FieldError | undefined {
  try {
    parseQuantity(input)
    return undefined
  } catch (error) {
    return { field, message: error instanceof Error ? error.message : String(error) }
  }
}
