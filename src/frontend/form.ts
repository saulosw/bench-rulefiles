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
