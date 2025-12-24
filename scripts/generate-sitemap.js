
const fs = require('fs');
const Parser = require('rss-parser');
require('dotenv').config({ path: '.env.local' });

const SITE_URL = 'https://filmy4u.vercel.app'; 

async function generateSiteMap() {
  console.log('Fetching data to generate sitemap...');
  try {
    const bloggerUrl = process.env.BLOGGER_URL; 
    if (!bloggerUrl) {
      throw new Error('FATAL: BLOGGER_URL is not defined in environment variables.');
    }

    const parser = new Parser();
    const feed = await parser.parseURL(`${bloggerUrl}/feeds/posts/default?alt=rss&max-results=500`);
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${SITE_URL}/</loc>
        </url>
        ${feed.items.map((post) => {
          const postId = post.link.split('/').pop().replace('.html', '');
          return `
            <url>
                <loc>${`${SITE_URL}/post/${postId}/`}</loc>
            </url>
          `;
        }).join('')}
      </urlset>
    `;
    
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }
    
    fs.writeFileSync('public/sitemap.xml', sitemap);
    console.log('✅ Sitemap generated successfully in public/sitemap.xml!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSiteMap();
