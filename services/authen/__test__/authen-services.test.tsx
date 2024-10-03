import { act, renderHook, waitFor } from "@testing-library/react";
import QueryClientLayout from "@/components/QueryClientLayout/QueryClientLayout";
import { useLogin } from "../services";

describe("Authen services", () => {
  it("useLogin", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: QueryClientLayout,
    });

    await act(async () => {
      await result.current.mutateAsync({
        email: "testemail@gmail.com",
        password: "password",
      });
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data?.data.access_token).toBeTruthy();
  });
});
