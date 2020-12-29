import _Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

class Document extends _Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await _Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
