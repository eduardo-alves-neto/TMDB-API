import { ThemeProvider } from "styled-components";
import { LayoutPrimary } from "./shared/layouts/LayoutPrimary";
import { GlobalStyle, theme } from "./shared/themes/Dark";
import { MovieList } from "./pages/dashBoard";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={5}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <LayoutPrimary title="TMDB">
              <MovieList />
            </LayoutPrimary>
          </ThemeProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
