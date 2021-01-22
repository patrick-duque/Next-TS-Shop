import Document, { Html, Head, Main, NextScript } from 'next/document';

//Metadata
export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link href='https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&display=swap' rel='stylesheet' />
        </Head>
        <body>
          <Main />
        </body>

        <NextScript />
      </Html>
    );
  }
}
