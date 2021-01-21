import Document, { Html, Head, Main, NextScript } from 'next/document';

//Metadata
export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link href='https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap' rel='stylesheet' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <body>
          <Main />
        </body>

        <NextScript />
      </Html>
    );
  }
}
