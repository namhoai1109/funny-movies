import { renderHook, waitFor } from "@testing-library/react";
import { PAGE_LIMIT, useCountTotalLinks, useListLinks } from "../services";
import QueryClientLayout from "@/components/QueryClientLayout/QueryClientLayout";

describe("Link services", () => {
  it("useListLinks", async () => {
    const { result } = renderHook(() => useListLinks(), {
      wrapper: QueryClientLayout,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isSuccess).toBe(true);
    const items = result.current.data?.pages.flatMap((page) => page) || [];
    expect(items).toHaveLength(PAGE_LIMIT);
  });

  it("useCountTotalLinks", async () => {
    const { result } = renderHook(() => useCountTotalLinks(), {
      wrapper: QueryClientLayout,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toBeGreaterThan(0);
  });
});
