/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Hono } from 'hono'
// @ts-ignore
import { endpoints } from './endpoints.mjs'

export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "DB" with the variable name you defined.
  DB: D1Database;
}
type Bindings = {
  [key in keyof CloudflareBindings]: CloudflareBindings[key]
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/:action', async (c) => {
  const req = c.req;
  const ret = await endpoints({
  msg: { ...req.param(), payload: req.query(), c }
})

  console.log(ret)
  return c.html(ret)
});
app.get('/', async (c) => {
  const req = c.req;
  const ret = await endpoints({
  msg: { ...req.param(), payload: req.query(), c }
})

  console.log(ret)
  return c.html(ret)
});
export default app satisfies ExportedHandler<Env>;

// export default {
//   async fetch(request, env): Promise<Response> {
//     const { pathname } = new URL(request.url);

//     if (pathname === "/api/users") {
//       // If you did not use `DB` as your binding name, change it here
//       const { results } = await env.DB.prepare(
//         "SELECT * FROM users" //WHERE id = ?"
//       )
//         //.bind(1)
//         .all();
//       return Response.json(results);
//     }

//     return new Response(
//       "Call /api/users to see all users"
//     );
//   },
// } satisfies ExportedHandler<Env>;
