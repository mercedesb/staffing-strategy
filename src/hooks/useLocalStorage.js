const useLocalStorage = () => ({
  get: (key) => {
    if (typeof window === "undefined") {
      return null;
    } else {
      return JSON.parse(localStorage.getItem(key));
    }
  },
  set: (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  remove: (key) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },
  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  },
});

export default useLocalStorage;
