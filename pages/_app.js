import { createGlobalStyle, ThemeProvider } from "styled-components";
import Header from "../src/components/Header";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
`;

const theme = {
  colors: {
    black: "#292929",
    grey: "#757575",
  },
};

function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
