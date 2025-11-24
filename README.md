# Reproduction

1) Install dependencies: `pnpm i`
2) Run the echo server: `pnpm run echo`
3) Run vite dev server: `pnpm run dev`
4) Send a request to the dev server:
   ```
   $ curl -i -k https://localhost:5173/test
   HTTP/2 200 
   vary: Origin
   date: Mon Nov 24 2025 11:16:14 GMT+0100 (Central European Standard Time)
   content-type: text/plain
   access-control-allow-origin: *
   
   GET /test HTTP/1.1
   user-agent: curl/8.16.0
   accept: */*
   x-forwarded-for: ::1
   x-forwarded-port: 443
   x-forwarded-proto: https
   x-forwarded-host: 
   connection: close
   Host: localhost:8081
   ```
4) Observe the bug: `x-forwarded-host` is empty and the `Host` header has been changed to `localhost:8081` (should not happen without `changeOrigin: true`).
5) For reference, run with `vite@7.1.9`, you will find:
   ```
   $ curl -i -k https://localhost:5173/test
   HTTP/1.1 200 OK
   Vary: Origin
   date: Mon Nov 24 2025 13:24:06 GMT+0100 (Central European Standard Time)
   connection: close
   content-type: text/plain
   access-control-allow-origin: *
   Transfer-Encoding: chunked
   
   GET /test HTTP/1.1
   host: localhost:5173
   user-agent: curl/8.16.0
   accept: */*
   x-forwarded-for: ::1
   x-forwarded-port: 5173
   x-forwarded-proto: https
   x-forwarded-host: localhost:5173
   connection: close
   ```
