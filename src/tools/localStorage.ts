import stringUtils from './string';
import { STORAGE_KEY } from './const';

export const storageManager = {
    _getParsedProp (key: string) {
        const namespace = window.localStorage.getItem(`${STORAGE_KEY}${key}`);

        if (namespace === null) {
            return null;
        }

        return JSON.parse(namespace);
    },
    _setParsedProp (key: string, data: unknown) {
        window.localStorage.setItem(`${STORAGE_KEY}${key}`, JSON.stringify(data));
    },
    _removeProp (key: string) {
        window.localStorage.removeItem(`${STORAGE_KEY}${key}`);
    },
    setItem (key: string, data: unknown) {
        if (String(key).length === 0) {
            throw new Error('Provide key for storage manager');
        }

        storageManager._setParsedProp(key, data);
    },
    getItem<T> (key: string): T | null {
        if (String(key).length === 0) {
            throw new Error('Provide key for storage manager');
        }

        const namespace = storageManager._getParsedProp(key);

        if (namespace === null) {
            return null;
        }

        if (typeof namespace === 'object') {
            return namespace;
        }

        return stringUtils.isNullOrEmpty(namespace) ? null : namespace;
    },
    removeItem (key: string) {
        if (String(key).length === 0) {
            throw new Error('Provide key for storage manager');
        }

        storageManager._removeProp(key);
    },
};
