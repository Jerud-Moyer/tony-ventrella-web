export type Column = {
  id: number | null,
  title: string | null,
  created_at: Date | string,
  content: string,
  published?: boolean
}

export type User = {
  email: string,
  password?: string,
  firstName?: string,
}

export type AuthState = {
  currentUser: User | null;
  loading: boolean;
  signup: (user: User) => void;
  login: (user: User) => void;
}
