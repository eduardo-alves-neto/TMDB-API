import { MovieList } from "./pages/dashBoard";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import { AppThemeProvider } from "./shared/context/themeContext";
import { NavBar } from "./shared/components/NavBar";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <SnackbarProvider maxSnack={3}>
            <NavBar />
            <MovieList />
          </SnackbarProvider>
        </AppThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
