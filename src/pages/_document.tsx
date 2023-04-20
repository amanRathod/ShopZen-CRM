import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full bg-secondary-500">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;