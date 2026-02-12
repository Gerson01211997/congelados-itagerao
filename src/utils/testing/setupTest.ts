process.env.NEXT_PUBLIC_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

import { afterAll, afterEach, beforeAll, vi } from "vitest";
import "@testing-library/jest-dom";
import { mockServer } from "@/services/mocks/server";

beforeAll(() => {
  mockServer.listen();
});

afterEach(() => {
  mockServer.reset();
});

afterAll(() => {
  mockServer.close();
});

vi.mock("next/navigation", () => {
  const searchParams = new URLSearchParams();

  return {
    useRouter: () => ({
      replace: vi.fn(),
      push: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
    }),
    usePathname: () => "/",
    useSearchParams: () => searchParams,
  };
});
