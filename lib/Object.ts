// Add object prototype

declare global {
  interface ObjectConstructor {
    typedKeys<T>(obj: T): Array<keyof T>
  }
}

Object.typedKeys = Object.keys as any;

export default {};
