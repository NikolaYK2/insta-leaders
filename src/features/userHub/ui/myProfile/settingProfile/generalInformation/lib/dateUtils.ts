export const isValidDate = (date: string | undefined) => {
  return date ? !isNaN(new Date(date).getTime()) : false
}

export const calculateAge = (dateOfBirth: string | undefined) => {
  if (!isValidDate(dateOfBirth)) return null

  return Math.floor(
    (new Date().getTime() - new Date(dateOfBirth!).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  )
}
