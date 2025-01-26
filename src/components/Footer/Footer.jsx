import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300">
            <div className="w-[95%] lg:w-[90%] mx-auto py-6 flex flex-col md:flex-row items-center justify-between border-t border-gray-700">
                {/* Footer Text */}
                <p className="text-sm md:text-base">
                    © 2025 <span className="text-white font-semibold">EduNexus</span>. All rights reserved.
                </p>

                {/* Social Media Links */}
                <div className="flex items-center gap-5 mt-4 md:mt-0">
                    <a
                        href="#"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                        aria-label="Facebook"
                    >
                        <FaFacebook size={24}/>
                    </a>
                    <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                        aria-label="YouTube"
                    >
                        <FaYoutube size={24}/>
                    </a>
                    <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin size={24}/>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;