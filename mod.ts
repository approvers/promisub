export class Promisub<T> implements AsyncIterable<T> {
  private events: T[] = [];
  private closed = false;

  publish(...events: T[]) {
    this.events.push(...events);
  }

  close() {
    this.closed = true;
    this.events = [];
  }

  async once(): Promise<T> {
    while (!this.closed) {
      const head = this.events.shift();
      if (head) {
        return head;
      }
    }
    throw new Error("the subscription was closed");
  }

  async *[Symbol.asyncIterator](): AsyncIterableIterator<T> {
    while (!this.closed) {
      const head = this.events.shift();
      if (head) {
        yield head;
      }
    }
  }
}
