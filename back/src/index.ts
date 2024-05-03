import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

import { appRouter, createContext } from "./app";

const app = express();
const PORT = 3001;

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
