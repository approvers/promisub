# promisub

The publish/subscription utility by Promise in Deno.

## Usage

```typescript
const p = new Promisub<number>();
p.publish(...events);

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
