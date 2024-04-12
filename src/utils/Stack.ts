export class Stack<T> {
  private stack: T[];

  constructor() {
    this.stack = [];
  }

  push(item: T): void {
    // if item is already in stack, move it to the top
    if (this.stack.includes(item)) {
      this.moveToTop(item);
      return;
    }
    this.stack.push(item);
  }

  pop(): T | undefined {
    return this.stack.pop();
  }

  peek(): T | undefined {
    return this.stack[this.stack.length - 1];
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }

  size(): number {
    return this.stack.length;
  }

  moveToTop(item: T): void {
    const index = this.stack.indexOf(item);
    if (index !== -1) {
      this.stack.splice(index, 1);
      this.stack.push(item);
    }
  }

  getAll(): T[] {
    return this.stack;
  }
}
