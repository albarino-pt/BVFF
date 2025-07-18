import { defineMiddleware } from "astro/middleware";

const authUser = import.meta.env.ADMIN_USER || "admin";
const authPass = import.meta.env.ADMIN_PASS || "changeme";

export const onRequest = defineMiddleware((context, next) => {
  if (!context.url.pathname.startsWith("/admin")) {
    return next(); // only protect /admin
  }

  const authHeader = context.request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="TinaCMS"',
      },
    });
  }

  const [user, pass] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  if (user !== authUser || pass !== authPass) {
    return new Response("Unauthorized", { status: 401 });
  }

  return next();
});
