
import { Link } from 'react-router-dom';

const FacebookIcon = () => ( <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg> );
const TwitterIcon = () => ( <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg> );
const InstagramIcon = () => ( <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg> );

export default function Footer({ categories }) {
  return (
    <footer className="bg-gray-800 text-gray-400">
      <div className="container px-5 py-8 mx-auto">
        <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-4 text-white">Categories</h3>
            <div className="flex justify-center flex-wrap gap-3 md:gap-4">
              {categories && categories.map(category => {
                  const categoryString = (typeof category === 'object' && category.name) ? category.name : category;
                  const categorySlug = (typeof category === 'object' && category.slug) ? category.slug : category.toLowerCase();
                  if (!categoryString) return null;
                  return (
                    <Link to={`/category/${categorySlug}`} key={categorySlug} className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors text-sm">
                      {categoryString}
                    </Link>
                  )
              })}
            </div>
        </div>

        <div className="text-center border-t border-gray-700 pt-8">
          <h3 className="text-xl font-bold mb-4 text-white">Follow Us On</h3>
          <div className="flex justify-center gap-5">
            <a href="https://www.facebook.com" className="text-gray-400 hover:text-white" aria-label="Facebook"><FacebookIcon /></a>
            <a href="https://www.twitter.com" className="text-gray-400 hover:text-white" aria-label="Twitter"><TwitterIcon /></a>
            <a href="https://www.instagram.com" className="text-gray-400 hover:text-white" aria-label="Instagram"><InstagramIcon /></a>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 bg-opacity-75">
        <div className="container mx-auto py-4 px-5 flex flex-col items-center">
            <div className="flex flex-col sm:flex-row items-center gap-y-2 sm:gap-x-4 mb-4 text-center">
                <Link to="/about-us" className="hover:text-white text-sm">About Us</Link>
                <Link to="/contact-us" className="hover:text-white text-sm">Contact Us</Link>
                <Link to="/privacy-policy" className="hover:text-white text-sm">Privacy Policy</Link>
                <Link to="/dmca" className="hover:text-white text-sm">DMCA</Link>
            </div>
            <p className="text-sm text-center">
              © Creative Mind — All Rights Reserved
            </p>
        </div>
      </div>
    </footer>
  );
}
