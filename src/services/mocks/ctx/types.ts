import type { MockRequest } from "@/services/mocks/handlers/types";
export interface MiddlewareInterface<T> {
  params: Omit<MockRequest<T>, "data">;
  data?: T;
  req?: Request;
}
