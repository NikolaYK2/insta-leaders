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
