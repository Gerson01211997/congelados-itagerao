import { enviroments } from "@/lib/enviroments";
import { responseMiddleware } from "@/services/mocks/ctx/responseMiddleware";
import type { MockRequest } from "@/services/mocks/handlers/types";
import { mockMethods } from "@/services/mocks/serverUtils";
import { ROUTES } from "@/services/transactions/transactions.routes";
import type { Transaction } from "@/services/transactions/transactions.types";
import { generateMockData } from "@/services/transactions/hooks/mockData";

const { GET } = mockMethods;

const ENDPOINT = `${enviroments.apiBaseUrl}${ROUTES.list}`;

export const getAllTransactionsMock = ({
  data,
  ...params
}: MockRequest<Partial<{ data: Transaction[] }>> = {}) => {
  return GET({
    path: ENDPOINT,
    resolver: ({ request }) => {
      return responseMiddleware({
        params,
        data: data ?? generateMockData(),
        req: request,
      });
    },
  });
};
