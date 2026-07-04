import { betterAuth } from "better-auth";
const auth = betterAuth({
  database: {
    id: "mock",
    create: () => ({}),
    update: () => ({}),
    delete: () => ({}),
    findMany: () => [],
    findOne: () => ({}),
  },
  socialProviders: {},
});
const req = new Request("http://localhost:3000/api/auth/sign-in/social", {
  method: "POST",
  body: JSON.stringify({ provider: "google", callbackURL: "/" }),
  headers: { "Content-Type": "application/json" },
});
auth.handler(req).then((res) => {
  console.log(res.status);
  res.text().then(console.log);
});
