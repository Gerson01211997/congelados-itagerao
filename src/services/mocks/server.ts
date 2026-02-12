import type { RequestHandler, SharedOptions } from "msw";
import { setupServer } from "msw/node";
import { handlers } from "@/services/mocks/handlers/handlers";
import type { PartialDeep } from "@/services/mocks/types";

export const server = setupServer(...handlers);

export const mockServer = {
  listen: (options?: PartialDeep<SharedOptions>) => {
    return options ? server.listen(options) : server.listen();
  },
  reset: (options?: RequestHandler) => {
    options ? server.resetHandlers(options) : server.resetHandlers();
  },
  close: () => {
    return server.close();
  },
  use: (params: RequestHandler) => {
    return server.use(params);
  },
  events: () => server.events,
};
