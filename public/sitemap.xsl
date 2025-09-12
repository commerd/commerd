<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html>
      <head>
        <title>XML Sitemap - Commerd</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: 300;
          }
          .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
          }
          .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
          }
          .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
          }
          .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
          }
          .stat-label {
            color: #666;
            margin-top: 5px;
          }
          .url-list {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .url-item {
            border-bottom: 1px solid #eee;
            padding: 20px;
            transition: background-color 0.2s;
          }
          .url-item:hover {
            background-color: #f8f9fa;
          }
          .url-item:last-child {
            border-bottom: none;
          }
          .url-loc {
            font-size: 1.2em;
            font-weight: 600;
            color: #667eea;
            text-decoration: none;
            margin-bottom: 10px;
            display: block;
          }
          .url-loc:hover {
            text-decoration: underline;
          }
          .url-meta {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin: 15px 0;
          }
          .meta-item {
            background: #f8f9fa;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 0.9em;
          }
          .meta-label {
            font-weight: 600;
            color: #666;
            display: block;
            margin-bottom: 2px;
          }
          .meta-value {
            color: #333;
          }
          .priority-high { color: #28a745; }
          .priority-medium { color: #ffc107; }
          .priority-low { color: #6c757d; }
          .hreflang-section {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #eee;
          }
          .hreflang-title {
            font-weight: 600;
            color: #666;
            margin-bottom: 10px;
            font-size: 0.9em;
          }
          .hreflang-links {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .hreflang-link {
            background: #e9ecef;
            color: #495057;
            padding: 4px 8px;
            border-radius: 4px;
            text-decoration: none;
            font-size: 0.8em;
            transition: background-color 0.2s;
          }
          .hreflang-link:hover {
            background: #dee2e6;
          }
          .hreflang-link.x-default {
            background: #667eea;
            color: white;
          }
          .hreflang-link.x-default:hover {
            background: #5a6fd8;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>XML Sitemap</h1>
          <p>Commerd - Ecommerce Agency for Thai Businesses</p>
        </div>
        
        <div class="stats">
          <div class="stat-card">
            <div class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
            <div class="stat-label">Total URLs</div>
          </div>
          <div class="stat-card">
            <div class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority = '1'])"/></div>
            <div class="stat-label">High Priority</div>
          </div>
          <div class="stat-card">
            <div class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:changefreq = 'daily'])"/></div>
            <div class="stat-label">Daily Updates</div>
          </div>
        </div>
        
        <div class="url-list">
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <div class="url-item">
              <a href="{sitemap:loc}" class="url-loc" target="_blank">
                <xsl:value-of select="sitemap:loc"/>
              </a>
              
              <div class="url-meta">
                <div class="meta-item">
                  <span class="meta-label">Last Modified</span>
                  <span class="meta-value"><xsl:value-of select="sitemap:lastmod"/></span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Change Frequency</span>
                  <span class="meta-value"><xsl:value-of select="sitemap:changefreq"/></span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Priority</span>
                  <span class="meta-value">
                    <xsl:attribute name="class">
                      <xsl:choose>
                        <xsl:when test="sitemap:priority >= 0.8">priority-high</xsl:when>
                        <xsl:when test="sitemap:priority >= 0.5">priority-medium</xsl:when>
                        <xsl:otherwise>priority-low</xsl:otherwise>
                      </xsl:choose>
                    </xsl:attribute>
                    <xsl:value-of select="sitemap:priority"/>
                  </span>
                </div>
              </div>
              
              <xsl:if test="xhtml:link">
                <div class="hreflang-section">
                  <div class="hreflang-title">Language Alternatives</div>
                  <div class="hreflang-links">
                    <xsl:for-each select="xhtml:link">
                      <a href="{@href}" class="hreflang-link" target="_blank">
                        <xsl:if test="@hreflang = 'x-default'">
                          <xsl:attribute name="class">hreflang-link x-default</xsl:attribute>
                        </xsl:if>
                        <xsl:value-of select="@hreflang"/>
                      </a>
                    </xsl:for-each>
                  </div>
                </div>
              </xsl:if>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
