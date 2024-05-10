export default class Emitter {
  //   funcMap = new Map<string, new Set()>
  constructor() {
    this.funcMap = new Map();
  }

  on(key, f) {
    const fns = this.funcMap.get(key);
    fns ? fns.add(f) : this.funcMap.set(key, new Set([f]));
    return this;
  }
  once(key, f) {
    const onceFn = (...args) => {
      f(...args);
      this.off(key, onceFn);
    };
    this.on(key, onceFn);
  }
  off(key, func) {
    if (func) {
      const fns = this.funcMap.get(key);
      if (fns) {
        fns.delete(func);
        if (!fns.size) this.funcMap.delete(key);
      }
    } else {
      this.funcMap.delete(key);
    }
    return this;
  }
  clear() {
    this.funcMap.clear();
    return this;
  }

  emit(key, ...args) {
    const fns = this.funcMap.get(key);
    fns && fns.forEach((fn) => fn(...args));
    return this;
  }
}

export const eventBus = new Emitter();
