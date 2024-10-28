/**
 *   const param = { answer, answerImg, id, }
 *
 *   const dataParam = {
 *       answer: data.answer,
 *       answerImg: data.answerImg,
 *       id: data.id,
 *     }
 *
 *   deepNotEqual(param, dataParam)
 *   or
 *   if (deepNotEqual(param, dataParam)){ ... }
 */
export const deepNotEqual = <T>(obj1: T, obj2: T): boolean => {
  // Если два объекта строго равны, они не отличаются
  if (obj1 === obj2) {
    return false
  }

  // Если один из объектов не является объектом или равен null, они отличаются
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return true
  }

  // Получить ключи обоих объектов
  const keys1 = Object.keys(obj1) as (keyof T)[]
  const keys2 = Object.keys(obj2) as (keyof T)[]

  // Если количество ключей разное, объекты отличаются
  if (keys1.length !== keys2.length) {
    return true
  }

  // Итерация по ключам первого объекта
  for (const key of keys1) {
    // Если во втором объекте нет ключа или значения ключа различаются, объекты отличаются
    if (!keys2.includes(key) || deepNotEqual(obj1[key as keyof T], obj2[key as keyof T])) {
      return true
    }
  }

  // Если различий не найдено, объекты равны
  return false
}
