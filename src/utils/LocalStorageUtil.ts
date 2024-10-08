const StorageKey = {
  email: 'email',
}

export class LocalStorageUtil {
  static setEmail(email: string) {
    localStorage.setItem(StorageKey.email, email)
  }

  static getEmail() {
    return localStorage.getItem(StorageKey.email)
  }
}

type StorageKeys = {
  email: 'email'
  latestCSRFToken: 'latestCSRFToken'
  userDataGoggle: 'userDataGoggle'
  userData: 'userData'
}
type ParamsKey = keyof StorageKeys

export class LocalStorageUtils {
  static setValue<T>(key: ParamsKey, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('Error saving to localStorage', e)
    }
  }

  static getValue<T>(key: ParamsKey): T | null {
    try {
      const item = localStorage.getItem(key)

      return item ? (JSON.parse(item) as T) : null
    } catch (e) {
      console.error('Error getting from localStorage', e)
      return null
    }
  }

  static removeItem(key: ParamsKey): void {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error('Error removing from localStorage', e)
    }
  }
}
