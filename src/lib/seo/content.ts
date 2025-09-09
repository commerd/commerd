import { SEOConfig } from './types';
import { DEFAULT_SEO_CONFIG, SEO_DEFAULTS } from './constants';
import { type Locale } from '../i18n/config';

// SEO content for different pages and languages
export const seoContent: Record<string, Record<Locale, SEOConfig>> = {
  home: {
    en: {
      title: 'Commerd - Innovative Business Solutions',
      description: 'Discover cutting-edge business solutions with Commerd. We provide innovative tools and services to help your business grow and succeed in the digital age.',
      keywords: ['business solutions', 'innovation', 'digital transformation', 'growth', 'technology'],
      ogType: 'website',
    },
    th: {
      title: 'Commerd - โซลูชันธุรกิจที่ล้ำสมัย',
      description: 'ค้นพบโซลูชันธุรกิจที่ล้ำสมัยกับ Commerd เราให้บริการเครื่องมือและบริการที่ทันสมัยเพื่อช่วยให้ธุรกิจของคุณเติบโตและประสบความสำเร็จในยุคดิจิทัล',
      keywords: ['โซลูชันธุรกิจ', 'นวัตกรรม', 'การเปลี่ยนแปลงดิจิทัล', 'การเติบโต', 'เทคโนโลยี'],
      ogType: 'website',
    },
  },
  about: {
    en: {
      title: 'About Commerd - Our Story and Mission',
      description: 'Learn about Commerd\'s journey, mission, and the passionate team behind our innovative business solutions. Discover how we\'re transforming industries.',
      keywords: ['about us', 'company story', 'mission', 'team', 'values'],
      ogType: 'website',
    },
    th: {
      title: 'เกี่ยวกับ Commerd - เรื่องราวและพันธกิจของเรา',
      description: 'เรียนรู้เกี่ยวกับการเดินทาง พันธกิจ และทีมงานที่มีความหลงใหลของ Commerd ที่อยู่เบื้องหลังโซลูชันธุรกิจที่ล้ำสมัยของเรา ค้นพบว่าเรากำลังเปลี่ยนแปลงอุตสาหกรรมอย่างไร',
      keywords: ['เกี่ยวกับเรา', 'เรื่องราวบริษัท', 'พันธกิจ', 'ทีมงาน', 'ค่านิยม'],
      ogType: 'website',
    },
  },
};

export function getSEOContent(page: string, locale: Locale = 'en'): SEOConfig {
  const pageContent = seoContent[page];
  if (!pageContent) {
    return {
      title: DEFAULT_SEO_CONFIG.siteName,
      description: SEO_DEFAULTS.description,
    };
  }
  
  return pageContent[locale] || pageContent[DEFAULT_SEO_CONFIG.defaultLocale as Locale];
}
