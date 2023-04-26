import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full bg-primary-50">
        <Head>
          <link rel="icon" href="https://res.cloudinary.com/di9zvktdc/image/upload/v1682476848/ShopZen/shopZen-miniLogo.png" />
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