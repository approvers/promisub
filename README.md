# promisub

The publish/subscription utility by Promise in Deno.

## Usage

```typescript
const p = new Promisub<number>();

// Publish events
p.publish(event1, event2, ...);

// Wait an event
await p.once();

// Listen events infinite
for await (const event of p) {
  // Handle event here
  // :
  // :

  // Stop to listen
  p.close();
}
```
