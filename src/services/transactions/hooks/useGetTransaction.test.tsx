import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  vi,
} from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useTransactions } from "@/services/transactions/hooks/useGetTransaction";
import { mockServer } from "@/services/mocks/server";
import { getAllTransactionsMock } from "@/services/transactions/hooks/getTransaction.msw";
import { generateMockData } from "@/services/transactions/hooks/mockData";
import { TranslationProvider } from "@/contexts/TranslationContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TranslationProvider>{children}</TranslationProvider>
);

describe("useTransactions", () => {
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
    const mockData = generateMockData(5);
    mockServer.use(getAllTransactionsMock({ data: { data: mockData } }));

    const { result } = renderHook(() => useTransactions(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeTruthy();
    expect(result.current.data.length).toBe(5);
    expect(result.current.error).toBeNull();
  });

  it("should handle loading state", async () => {
    mockServer.use(getAllTransactionsMock({ isLoading: true }));

    const { result } = renderHook(() => useTransactions(), {
      wrapper,
    });

    expect(result.current.loading).toBe(true);
  });

  it("should handle error state", async () => {
    mockServer.use(getAllTransactionsMock({ isError: true }));

    const { result } = renderHook(() => useTransactions(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
  });

  it("should call onSuccess callback when provided", async () => {
    const onSuccess = vi.fn();
    const mockData = generateMockData(3);
    mockServer.use(getAllTransactionsMock({ data: { data: mockData } }));

    renderHook(() => useTransactions({ onSuccess }), {
      wrapper,
    });

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("should call onError callback when provided", async () => {
    const onError = vi.fn();
    mockServer.use(getAllTransactionsMock({ isError: true }));

    renderHook(() => useTransactions({ onError }), {
      wrapper,
    });

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });
});
