import { generateMetadata as generateSEOMetadata } from "@/components/seo";
import { getSEOContent } from "@/lib/seo/content";
import { PageSEO } from "@/components/seo";
import { AppLayout } from "@/components/layout/AppLayout";

// Generate metadata for this page
export async function generateMetadata() {
  const seoContent = getSEOContent('about', 'en');
  return generateSEOMetadata(seoContent, 'en', '/about');
}

export default function About() {
  const seoContent = getSEOContent('about', 'en');
  
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ];
  
  return (
    <AppLayout locale="en">
      <PageSEO 
        seo={seoContent} 
        locale="en" 
        pathname="/about"
        breadcrumbs={breadcrumbs}
      >
        <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              About Commerd
            </h1>
            <p className="text-xl text-gray-600">
              Our story, mission, and the passionate team behind our innovative solutions
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                At Commerd, we believe in the power of innovation to transform businesses. 
                Our mission is to provide cutting-edge solutions that help companies 
                navigate the digital landscape and achieve sustainable growth.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                Founded with a vision to bridge the gap between traditional business 
                practices and modern technology, Commerd has been at the forefront of 
                digital transformation. We combine deep industry expertise with 
                innovative thinking to deliver solutions that make a real difference.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Innovation: We constantly push boundaries and explore new possibilities</li>
                <li>Integrity: We maintain the highest standards of honesty and transparency</li>
                <li>Excellence: We strive for perfection in everything we do</li>
                <li>Collaboration: We believe in the power of working together</li>
                <li>Growth: We are committed to continuous learning and improvement</li>
              </ul>
            </section>
          </div>
        </main>
        </div>
      </PageSEO>
    </AppLayout>
  );
}
