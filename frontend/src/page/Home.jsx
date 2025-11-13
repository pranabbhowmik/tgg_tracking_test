import React from "react";
import {
  ChevronRight,
  ArrowRight,
  Play,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";
import bgImage from "../assets/background-tgg-test.png";

function Home() {
  return (
    <>
      {/* Full Background Image - Fixed like Login */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Overlay Content - Relative z-10 like Login */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 lg:py-16">
        <div className="w-full max-w-screen-xl mx-auto text-center text-gray-900 dark:text-white">
          <a
            href="#"
            role="alert"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-white/90 backdrop-blur-sm rounded-full shadow-sm
            dark:bg-gray-800/90 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3 pulse">
              New
            </span>
            <span className="text-sm font-medium">
              Apply for Ration Card Now
            </span>
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none uppercase tracking-wider md:text-5xl lg:text-6xl">
            Ensuring Food Security for Every Bengali Family
          </h1>

          <p className="mb-8 text-lg font-normal text-gray-600 dark:text-gray-300 lg:text-xl sm:px-16 xl:px-48">
            The Department of Food & Supplies, Government of West Bengal, is
            committed to providing affordable and nutritious food grains through
            the Public Distribution System (PDS) to uplift the lives of our
            citizens at Khadya Bhavan.
          </p>

          {/* Buttons */}
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white 
              rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Apply for Ration Card
              <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
            </a>

            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-gray-900 
              rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 
              dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <Play className="mr-2 -ml-1 w-5 h-5" />
              Watch Awareness Video
            </a>
          </div>

          {/* Social Links */}
          <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold text-gray-400 uppercase">
              KEY INITIATIVES
            </span>
            <div className="flex flex-wrap justify-center items-center mt-8 gap-4 text-gray-500 sm:justify-between">
              {[Twitter, Instagram, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="transition-colors duration-200 hover:text-gray-800 dark:hover:text-gray-400"
                  aria-label={`Follow us on ${
                    ["Twitter", "Instagram", "YouTube", "Facebook"][i]
                  }`}
                >
                  <Icon className="h-8 w-8" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
