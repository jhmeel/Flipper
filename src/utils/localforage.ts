import localforage from 'localforage';

class LocalForageProvider {
  static setAuthToken = async (token: string): Promise<void> => {
    if (await localforage.getItem('FP:USER:AUTH:TOKEN')) {
      await localforage.removeItem('FP:USER:AUTHTOKEN');
    }
    await localforage.setItem('FP:USER:AUTH:TOKEN', token);
  };

  static getAuthToken = async (): Promise<string | null> => {
    try {
      const token = await localforage.getItem<string>('FP:USER:AUTH:TOKEN');
      return token;
    } catch (error) {
      console.error('Error while getting auth token:', error);
      return null;
    }
  };

  static removeAuthToken = async (): Promise<void> => {
    await localforage.removeItem('FP:USER:AUTH:TOKEN');
  };

  static setItem = async <T>(key: string, value: T): Promise<T> => {
    if (await localforage.getItem(key)) {
      await localforage.removeItem(key);
    }
    return await localforage.setItem(key, value);
  };

  static removeItem = async (key: string): Promise<void> => {
    return await localforage.removeItem(key);
  };

  static getItem = async <T>(key: string, callBack?: (err: Error, value: T) => void): Promise<T | null> => {
    const cb = callBack || function () {};
    return await localforage.getItem<T>(key, cb);
  };
}

export default LocalForageProvider;
