import Bun from 'bun';

Bun.serve({
  port: 9000,
  fetch(req) {
    return new Response('Bun!');
  }
});
