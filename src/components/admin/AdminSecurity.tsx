"use client";

import { useEffect } from 'react';

export function AdminSecurity() {
  useEffect(() => {
    // Add additional security measures
    const addSecurityMeta = () => {
      // Remove any existing robots meta tags and add our own
      const existingRobots = document.querySelector('meta[name="robots"]');
      if (existingRobots) {
        existingRobots.remove();
      }

      // Add comprehensive noindex meta tag
      const robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      robotsMeta.content = 'noindex, nofollow, noarchive, nosnippet, noimageindex, nocache';
      document.head.appendChild(robotsMeta);

      // Add additional security headers via meta tags
      const securityMeta = [
        { name: 'googlebot', content: 'noindex, nofollow' },
        { name: 'bingbot', content: 'noindex, nofollow' },
        { name: 'slurp', content: 'noindex, nofollow' },
        { name: 'duckduckbot', content: 'noindex, nofollow' },
        { name: 'baiduspider', content: 'noindex, nofollow' },
        { name: 'yandexbot', content: 'noindex, nofollow' },
        { name: 'facebookexternalhit', content: 'noindex, nofollow' },
        { name: 'twitterbot', content: 'noindex, nofollow' },
        { name: 'linkedinbot', content: 'noindex, nofollow' },
      ];

      securityMeta.forEach(({ name, content }) => {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      });
    };

    addSecurityMeta();

    // Prevent right-click context menu in admin
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Prevent F12, Ctrl+Shift+I, etc.
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
