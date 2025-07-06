import TanstackQueryProvider from "./tanstack-query";
import { ThemeProvider } from "./theme-provider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </ThemeProvider>
  );
};

export default Provider;
