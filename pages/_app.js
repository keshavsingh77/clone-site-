import '../styles/globals.css'
import Header from '../components/Header';
import BackToTopButton from '../components/BackToTopButton';
import Parser from 'rss-parser';
import Head from 'next/head';

function App({ Component, pageProps, categories }) {
  return (
    <>
      <Head>
        <title>iPopcorn - Movies & Tech Blog</title>
        {/* --- Google Auto Ads Script Start --- */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9543073887536718" crossOrigin="anonymous"></script>
        {/* --- Google Auto Ads Script End --- */}
        {/* PrismJS Theme for code highlighting */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" />
      </Head>

      <Header categories={categories} />
      {Component ? <Component {...pageProps} /> : null}
      <BackToTopButton />
    </>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (Component && Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    let categories = [];
    try {
        const BLOGGER_URL = process.env.BLOGGER_URL || 'https://filmy4u.blogspot.com';
        const FEED_URL = `${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=500`;
        const parser = new Parser();
        const feed = await parser.parseURL(FEED_URL);
        const allCategories = feed.items.flatMap(post => post.categories || [])
            .map(cat => (typeof cat === 'object' && cat._) ? cat._ : cat)
            .filter(Boolean);
        categories = [...new Set(allCategories)];
    } catch (error) {
        console.error("Failed to fetch categories in _app.js", error);
    }
    
    return { pageProps, categories };
};

export default App;