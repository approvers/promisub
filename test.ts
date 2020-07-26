import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std@0.62.0/testing/asserts.ts";

import { Promisub } from "./mod.ts";

Deno.test("simple pub/sub", async () => {
  const p = new Promisub<number>();
  p.publish(1);
  assertEquals(await p.once(), 1);
  p.publish(2);
  assertEquals(await p.once(), 2);
  p.publish(4);
  p.publish(3);
  assertEquals(await p.once(), 4);
  p.publish(5);
  assertEquals(await p.once(), 3);
  assertEquals(await p.once(), 5);
});

Deno.test("with iterator", async () => {
  const events = [1, 2, 3, 4, 5];
  const p = new Promisub<number>();
  p.publish(...events);
  for await (const e of p) {
    assertEquals(e, events[0]);
    events.shift();
    if (events.length == 0) break;
  }
});

Deno.test("close", async () => {
  const events = [1, 2, 3, 4, 5];
  const p = new Promisub<number>();
  p.publish(...events);
  assertEquals(await p.once(), 1);
  p.close();
  await assertThrowsAsync(async () => {
    await p.once();
  });
});
