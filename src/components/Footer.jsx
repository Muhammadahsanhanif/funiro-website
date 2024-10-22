function Footer() {
  return (
    <>
      <hr />
      <footer className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h2 className="text-teal-500 font-bold text-xl mb-6">Funiro.</h2>
            <address className="text-gray-500 text-lg">
              400 University Drive Suite 200 <br />
              Coral Gables, FL 33134 USA
            </address>
          </div>
          {/* Links */}
          <div>
            <h3 className="text-teal-500 font-semibold text-lg mb-6">Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-700 hover:text-teal-500 text-lg">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-teal-500 text-lg">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-teal-500 text-lg">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-teal-500 text-lg">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Help */}
          <div>
            <h3 className="text-teal-500 font-semibold text-lg mb-6">Help</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-700 hover:text-teal-500 text-lg">
                  Payment Options
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-teal-500 text-lg">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-teal-500 text-lg">
                  Privacy Policies
                </a>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-gray-500 mb-2">Newsletter</h4>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Enter Your Email Address" 
                className="border border-teal-500 px-4 py-2 w-full text-black rounded-md"
              />
              <button className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-300 pt-6">
          <p className="mt-5 ml-10 text-start text-gray-500 text-lg">
            © 2023 Funiro. All rights reserved
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
