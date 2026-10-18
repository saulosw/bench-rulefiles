export class HttpFailure extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message)
  }
}

export function fail(status: number, code: string, message: string): never {
  throw new HttpFailure(status, code, message)
}
