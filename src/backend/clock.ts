let frozen: number | undefined

export const clock = {
  now: (): number => frozen ?? Date.now(),
  freeze: (at: number): void => {
    frozen = at
  },
  release: (): void => {
    frozen = undefined
  },
}
