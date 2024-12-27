type StorageKeys = {
  email: "email";
  // latestCSRFToken: 'latestCSRFToken'
  // userDataGoggle: 'userDataGoggle'
  // userData: 'userData'
  accessToken: "accessToken";
  userId: "userId";
  profileForm: "profileForm";
  publicationForm: "publicationForm";
};
export type ParamsKey = keyof StorageKeys;

export class LocalStorageUtil {
  static setValue<T>(key: ParamsKey, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  }

  static getValue<T>(key: ParamsKey): T | null {
    try {
      const item = localStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : null;
    } catch (e) {
      console.error("Error getting from localStorage", e);
      return null;
    }
  }

  static removeItem(key: ParamsKey): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Error removing from localStorage", e);
    }
  }
}
