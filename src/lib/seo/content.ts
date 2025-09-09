import { SEOConfig } from './types';
import { DEFAULT_SEO_CONFIG } from './constants';
import { i18nConfig, type Locale } from '../i18n/config';

// SEO content for different pages and languages
export const seoContent: Record<string, Record<Locale, SEOConfig>> = {
  home: {
    en: {
      title: 'Commerd - Innovative Business Solutions',
      description: 'Discover cutting-edge business solutions with Commerd. We provide innovative tools and services to help your business grow and succeed in the digital age.',
      keywords: ['business solutions', 'innovation', 'digital transformation', 'growth', 'technology'],
      ogType: 'website',
    },
    da: {
      title: 'Commerd - Innovative Forretningsløsninger',
      description: 'Opdag banebrydende forretningsløsninger med Commerd. Vi leverer innovative værktøjer og tjenester til at hjælpe din virksomhed med at vokse og lykkes.',
      keywords: ['forretningsløsninger', 'innovation', 'digital transformation', 'vækst', 'teknologi'],
      ogType: 'website',
    },
    sv: {
      title: 'Commerd - Innovativa Affärslösningar',
      description: 'Upptäck banbrytande affärslösningar med Commerd. Vi leverer innovativa verktyg och tjänster för att hjälpa ditt företag att växa och lyckas.',
      keywords: ['affärslösningar', 'innovation', 'digital transformation', 'tillväxt', 'teknologi'],
      ogType: 'website',
    },
    no: {
      title: 'Commerd - Innovative Forretningsløsninger',
      description: 'Oppdag banebrytende forretningsløsninger med Commerd. Vi leverer innovative verktøy og tjenester for å hjelpe bedriften din med å vokse og lykkes.',
      keywords: ['forretningsløsninger', 'innovation', 'digital transformasjon', 'vekst', 'teknologi'],
      ogType: 'website',
    },
    de: {
      title: 'Commerd - Innovative Geschäftslösungen',
      description: 'Entdecken Sie bahnbrechende Geschäftslösungen mit Commerd. Wir bieten innovative Tools und Dienstleistungen, um Ihrem Unternehmen beim Wachstum und Erfolg zu helfen.',
      keywords: ['Geschäftslösungen', 'Innovation', 'digitale Transformation', 'Wachstum', 'Technologie'],
      ogType: 'website',
    },
    fr: {
      title: 'Commerd - Solutions Commerciales Innovantes',
      description: 'Découvrez des solutions commerciales révolutionnaires avec Commerd. Nous fournissons des outils et services innovants pour aider votre entreprise à croître et réussir.',
      keywords: ['solutions commerciales', 'innovation', 'transformation numérique', 'croissance', 'technologie'],
      ogType: 'website',
    },
    es: {
      title: 'Commerd - Soluciones Empresariales Innovadoras',
      description: 'Descubre soluciones empresariales revolucionarias con Commerd. Proporcionamos herramientas y servicios innovadores para ayudar a tu empresa a crecer y tener éxito.',
      keywords: ['soluciones empresariales', 'innovación', 'transformación digital', 'crecimiento', 'tecnología'],
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
    da: {
      title: 'Om Commerd - Vores Historie og Mission',
      description: 'Lær om Commerds rejse, mission og det passionerede team bag vores innovative forretningsløsninger. Opdag hvordan vi transformerer industrier.',
      keywords: ['om os', 'virksomhedshistorie', 'mission', 'team', 'værdier'],
      ogType: 'website',
    },
    // Add other languages as needed...
    sv: {
      title: 'Om Commerd - Vår Historia och Mission',
      description: 'Lär dig om Commerds resa, mission och det passionerade teamet bakom våra innovativa affärslösningar. Upptäck hur vi transformerar industrier.',
      keywords: ['om oss', 'företagshistoria', 'mission', 'team', 'värderingar'],
      ogType: 'website',
    },
    no: {
      title: 'Om Commerd - Vår Historie og Misjon',
      description: 'Lær om Commerds reise, misjon og det lidenskapelige teamet bak våre innovative forretningsløsninger. Oppdag hvordan vi transformerer industrier.',
      keywords: ['om oss', 'bedriftshistorie', 'misjon', 'team', 'verdier'],
      ogType: 'website',
    },
    de: {
      title: 'Über Commerd - Unsere Geschichte und Mission',
      description: 'Erfahren Sie mehr über Commerds Reise, Mission und das leidenschaftliche Team hinter unseren innovativen Geschäftslösungen. Entdecken Sie, wie wir Branchen transformieren.',
      keywords: ['über uns', 'Firmengeschichte', 'Mission', 'Team', 'Werte'],
      ogType: 'website',
    },
    fr: {
      title: 'À Propos de Commerd - Notre Histoire et Mission',
      description: 'Découvrez le parcours de Commerd, notre mission et l\'équipe passionnée derrière nos solutions commerciales innovantes. Voyez comment nous transformons les industries.',
      keywords: ['à propos', 'histoire de l\'entreprise', 'mission', 'équipe', 'valeurs'],
      ogType: 'website',
    },
    es: {
      title: 'Acerca de Commerd - Nuestra Historia y Misión',
      description: 'Conoce el viaje de Commerd, nuestra misión y el equipo apasionado detrás de nuestras soluciones empresariales innovadoras. Descubre cómo transformamos industrias.',
      keywords: ['acerca de nosotros', 'historia de la empresa', 'misión', 'equipo', 'valores'],
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
