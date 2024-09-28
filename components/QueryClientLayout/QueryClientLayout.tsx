"use client";
import { QueryClient, QueryClientProvider } from "react-query";

interface IQueryClientLayoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

function QueryClientLayout({ children }: IQueryClientLayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryClientLayout;
