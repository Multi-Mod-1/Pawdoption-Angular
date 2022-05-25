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
}

export interface Location {
  id: number
  state: string
}