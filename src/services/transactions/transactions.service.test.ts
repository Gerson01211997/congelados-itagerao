import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  vi,
} from "vitest";
import { getTransactions } from "@/services/transactions/transactions.service";
import { mockServer } from "@/services/mocks/server";
import { getAllTransactionsMock } from "@/services/transactions/hooks/getTransaction.msw";
import { generateMockData } from "@/services/transactions/hooks/mockData";

describe("getTransactions", () => {
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

  it("When get all list is successful", async () => {
    const mockData = generateMockData(10);
    mockServer.use(getAllTransactionsMock({ data: { data: mockData } }));

    const result = await getTransactions();

    expect(result).toBeTruthy();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(10);
  });

  it("should handle empty response", async () => {
    mockServer.use(getAllTransactionsMock({ data: { data: [] } }));

    const result = await getTransactions();

    expect(result).toEqual([]);
  });

  it("should handle error response", async () => {
    mockServer.use(getAllTransactionsMock({ isError: true }));

    await expect(getTransactions()).rejects.toThrow();
  });
});
