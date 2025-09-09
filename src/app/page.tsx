import { generateMetadata as generateSEOMetadata } from "@/components/seo";
import { getSEOContent } from "@/lib/seo/content";
import { PageSEO } from "@/components/seo";

// Generate metadata for this page
export async function generateMetadata() {
  const seoContent = getSEOContent('home', 'en');
  return generateSEOMetadata(seoContent, 'en', '/');
}

export default function Home() {
  const seoContent = getSEOContent('home', 'en');
  
  return (
    <PageSEO seo={seoContent} locale="en" pathname="/">
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Commerd
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Innovative business solutions for the digital age
            </p>
            <div className="space-y-4">
              <p className="text-lg">
                Discover cutting-edge tools and services designed to help your business grow and succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageSEO>
  );
}
