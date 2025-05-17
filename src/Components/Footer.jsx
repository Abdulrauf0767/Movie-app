import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-[#151b20] text-white font-roboto overflow-x-hidden">
            <div className="max-w-[1200px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-red-500 text-xl mb-4">Movie App</h2>
                    <p className="text-sm text-gray-300">Your go-to destination for the latest and greatest in cinema. Explore, enjoy, and experience entertainment like never before.</p>
                </div>
                <div>
                    <h3 className="text-lg mb-4">Navigation</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="hover:text-red-500 cursor-pointer">Home</li>
                        <li className="hover:text-red-500 cursor-pointer">Movies</li>
                        <li className="hover:text-red-500 cursor-pointer">List</li>
                        <li className="hover:text-red-500 cursor-pointer">Contact us</li>
                        <li className="hover:text-red-500 cursor-pointer">Signup</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg mb-4">Support</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="hover:text-red-500 cursor-pointer">Help Center</li>
                        <li className="hover:text-red-500 cursor-pointer">Terms of Service</li>
                        <li className="hover:text-red-500 cursor-pointer">Privacy Policy</li>
                        <li className="hover:text-red-500 cursor-pointer">Report Issue</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg mb-4">Newsletter</h3>
                    <p className="text-sm text-gray-300 mb-2">Subscribe to get latest movie updates</p>
                    <form className="flex items-center">
                        <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 rounded-l-md bg-[#1f2933] text-sm text-white outline-none border border-gray-500" />
                        <button className="px-4 py-2 bg-red-500 text-white rounded-r-md text-sm hover:bg-red-600">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="border-t border-gray-700 text-center text-sm text-gray-400 py-4 px-4">
                &copy; {new Date().getFullYear()} Movie App. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
