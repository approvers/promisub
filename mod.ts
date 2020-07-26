/**
 * Promisub provides pub/sub features.
 * 
 *    const p = new Promisub<number>();
 * 
 *    // Publish events
 *    p.publish(event1, event2, ...);
 * 
 *    // Wait an event
 *    await p.once();
 * 
 *    // Listen events infinite
 *    for await (const event of p) {
 *      // Handle event here
 *      // :
 *      // :
 * 
 *      // Stop to listen
 *      p.close();
 *    }
 */
export class Promisub<T> implements AsyncIterable<T> {
  private events: T[] = [];
  private closed = false;

  /**
   * `publish` queues events.
   *
   * @param {...T[]} events
   * @memberof Promisub
   */
  publish(...events: T[]) {
    this.events.push(...events);
  }

  /**
   * `close` cancels listening all.
   *
   * @memberof Promisub
   */
  close() {
    this.closed = true;
    this.events = [];
  }

  /**
   * `once` takes an event.
   *
   * @returns {Promise<T>}
   * @memberof Promisub
   */
  async once(): Promise<T> {
    while (!this.closed) {
      const head = this.events.shift();
      if (head) {
        return head;
      }
    }
    throw new Error("the subscription was closed");
  }

  /**
   * `Symbol.asyncIterator` listens events.
   *
   * @returns {AsyncIterableIterator<T>}
   * @memberof Promisub
   */
  async *[Symbol.asyncIterator](): AsyncIterableIterator<T> {
    while (!this.closed) {
      const head = this.events.shift();
      if (head) {
        yield head;
      }
    }
  }
}
