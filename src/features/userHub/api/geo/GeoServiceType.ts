export type Country = {
  code: string
  name: string
}
export type Countries = {
  countries: Country[]
}

export type Citi = {
  id: number
  name: string
}
export type Cities = {
  cities: Citi[]
}

export type CitiesParams = {
  countryCode: string
  pageSize?: number
  pageNumber?: number
  searchNameTerm?: string
}
