const KEY = 'session';

export const isFirstTime = () => {
  return localStorage.getItem(KEY) === null;
};