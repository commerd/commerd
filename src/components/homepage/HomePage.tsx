"use client";

import { Carousel } from "./Carousel";
import { ScrollText } from "./ScrollText";
import { useParams } from "next/navigation";
import { getTextClasses } from "@/lib/utils/fonts";
import { type Locale } from "@/lib/i18n/config";

interface HomePageProps {
  t: any; // Will be properly typed from the dictionary
}

export function HomePage({ t }: HomePageProps) {
  const { lang } = useParams<{ lang: string }>();
  const locale = (typeof lang === "string" ? lang : "en") as Locale;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Hero Section - Above the Fold */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - SEO Optimized */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium">
                <span className="w-2 h-2 bg-primary-600 rounded-full mr-2 animate-pulse"></span>
                {t.subtitle}
              </div>

              {/* Main Headline - H1 for SEO */}
              <h1 className={getTextClasses(locale, 'h1', "text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-tight")}>
                <span className="block">{t.title.split(' ').slice(0, 2).join(' ')}</span>
                <span className="block text-primary-600">{t.title.split(' ').slice(2).join(' ')}</span>
              </h1>

              {/* Description - Important for SEO */}
              <p className={getTextClasses(locale, 'body', "text-xl text-gray-600 leading-relaxed max-w-2xl")}>
                {t.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className={getTextClasses(locale, 'button', "inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl")}
                >
                  {t.cta.button}
                </a>
                <a
                  href="#learn-more"
                  className={getTextClasses(locale, 'button', "inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-xl border-2 border-primary-600 hover:bg-primary-50 transition-colors duration-200")}
                >
                  {t.learnMore}
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-xs sm:text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Right Visual - Static Cards for SEO */}
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Feature Cards - Static for SEO */}
                {t.features.items.map((feature: any, index: number) => (
                  <div
                    key={index}
                    className={`bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 ${
                      index === 0 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section - Scroll-based horizontal carousel */}
      <Carousel 
        items={t.carousel.items}
        className="bg-primary-600"
      />

      {/* Scroll Text Section - Scroll-based text transitions */}
      <ScrollText 
        title={t.scrollText.title}
        textBlocks={t.scrollText.blocks}
        className="bg-gray-900"
      />

      {/* Features Section - Below the Fold */}
      <section id="learn-more" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.features.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.items.map((feature: any, index: number) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thai Market Opportunity Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.thai_market.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.thai_market.subtitle}
            </p>
          </div>

          {/* Thailand Section - Responsive Layout */}
          <div className="max-w-6xl mx-auto">
            {/* Mobile: Single unified section */}
            <div className="block lg:hidden">
              <div className="relative rounded-2xl shadow-lg overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url(https://media.commerd.com/thailand_map.png)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/85"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Statistics Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {t.thai_market.stats.map((stat: any, index: number) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">
                          {stat.number}
                        </div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">
                          {stat.label}
                        </div>
                        <div className="text-xs text-gray-600">
                          {stat.description}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Descriptive Content */}
                  <div className="max-w-2xl mx-auto">
                    <p className="text-base text-gray-800 leading-relaxed font-medium text-center">
                      {t.thai_market.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Side-by-side layout */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
              {/* Statistics Section */}
              <div className="relative rounded-2xl shadow-lg overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url(https://media.commerd.com/thailand_map.png)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/80"></div>
                </div>
                
                {/* Stats Content */}
                <div className="relative z-10 p-8 h-full flex items-center">
                  <div className="grid grid-cols-2 gap-6 w-full">
                    {t.thai_market.stats.map((stat: any, index: number) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl xl:text-4xl font-bold text-primary-600 mb-2">
                          {stat.number}
                        </div>
                        <div className="text-base xl:text-lg font-semibold text-gray-900 mb-1">
                          {stat.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="relative rounded-2xl shadow-lg overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url(https://media.commerd.com/thailand_map.png)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/80"></div>
                </div>
                
                {/* Content Overlay */}
                <div className="relative z-10 p-8 h-full flex items-center">
                  <div className="max-w-lg">
                    <p className="text-lg xl:text-xl text-gray-800 leading-relaxed font-medium">
                      {t.thai_market.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            {t.cta.button}
          </a>
        </div>
      </section>
    </div>
  );
}
