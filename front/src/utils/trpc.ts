import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "../../../back/src/app";

export const trpc = createTRPCReact<AppRouter>();
