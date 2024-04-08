import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/RootRoute";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter >
      <AppRoutes/>
   </BrowserRouter>
   </QueryClientProvider>
  );
}

export default App;
