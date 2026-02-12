import { delay, HttpResponse } from "msw";
import { RESPONSE_STATUSES } from "@/services/mocks/ctx/constants";
import type { MiddlewareInterface } from "@/services/mocks/ctx/types";

export async function responseMiddleware<T>({
  params,
  data,
  req,
}: MiddlewareInterface<T>) {
  const { resolver, isError, isLoading, delayTime, status } = params;

  if (isError) {
    return new HttpResponse(null, {
      status: status ?? RESPONSE_STATUSES.INTERNAL_SERVER_ERROR,
    });
  }

  if (isLoading) {
    await delay("infinite");
    return new HttpResponse(null, { status: RESPONSE_STATUSES.OK });
  }

  if (!!resolver && !!req) {
    return resolver({
      request: req,
      requestId: "",
    });
  }

  await delay(delayTime ?? 0);

  const response = new HttpResponse(JSON.stringify(data), {
    status: status ?? RESPONSE_STATUSES.OK,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
