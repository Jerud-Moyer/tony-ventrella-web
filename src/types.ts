export type Column = {
  id: number | null,
  title: string | null,
  created_at: Date | string,
  content: string,
  published?: boolean,
  blog_id: number
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

export type Blog = {
  name: string;
  id: number;
}
