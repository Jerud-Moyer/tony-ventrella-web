export type Column = {
  id: number | null,
  title: string | null,
  created_at: Date | string,
  content: string,
  published?: boolean
}
