import type { ResponseResolver } from "msw";
import type { RESPONSE_STATUSES } from "@/services/mocks/ctx/constants";

export interface MockRequest<T = unknown> {
  data?: T;
  isError?: boolean;
  isLoading?: boolean;
  delayTime?: number;
  resolver?: ResponseResolver;
  status?: RESPONSE_STATUSES;
}
