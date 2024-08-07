import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; frame-src 'self'; script-src 'self' https://telegram.org; connect-src 'self' https://api.telegram.org; object-src 'none';"
        />
        <script
          async
          src="https://telegram.org/js/telegram-web-app.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
