export interface UserRoot {
  users: User[]
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  LocationId: number
}