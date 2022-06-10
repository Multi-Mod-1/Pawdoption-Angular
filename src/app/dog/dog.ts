export interface IDog {
  id: number
  name: string
  sex: string
  age: number
  breed: string
  summary: string
  description: string
  imageURL: string
  LocationId: number
  UserId: number
  Location: Location
  User: User
}

export interface Location {
  id: number
  state: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  LocationId: number
}

export class Dog {
  id!: number
  name!: string
  sex!: string
  age!: number
  breed!: string
  summary!: string
  description!: string
  imageURL!: string
  LocationId!: number
  UserId!: number
}
