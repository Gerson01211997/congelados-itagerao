import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  vi,
} from "vitest";
import { apiClient } from "@/services/apiClient";
import { mockServer } from "@/services/mocks/server";
import { http, HttpResponse } from "msw";

describe("apiClient", () => {
  beforeAll(() => {
    mockServer.listen();
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockServer.reset();
  });

  afterAll(() => {
    mockServer.close();
  });

  it("should make GET request successfully", async () => {
    const mockData = { data: "test" };
    mockServer.use(
      http.get("https://api.test.com/test", () => {
        return HttpResponse.json(mockData);
      }),
    );

    const result = await apiClient<typeof mockData>(
      "https://api.test.com/test",
      {
        method: "GET",
      },
    );

    expect(result).toEqual(mockData);
  });

  it("should handle query parameters", async () => {
    const mockData = { data: "test" };
    mockServer.use(
      http.get("https://api.test.com/test", () => {
        return HttpResponse.json(mockData);
      }),
    );

    const result = await apiClient<typeof mockData>(
      "https://api.test.com/test",
      {
        method: "GET",
        params: { key: "value" },
      },
    );

    expect(result).toEqual(mockData);
  });

  it("should throw error on failed request", async () => {
    mockServer.use(
      http.get("https://api.test.com/test", () => {
        return HttpResponse.json(null, { status: 500 });
      }),
    );

    await expect(
      apiClient("https://api.test.com/test", { method: "GET" }),
    ).rejects.toThrow();
  });
});
