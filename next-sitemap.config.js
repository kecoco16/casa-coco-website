/** @type {import('next-sitemap').IConfig} */

const siteUrl =
  process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://www.casacoco.info'

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-index.xml'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [`${siteUrl}/server-sitemap-index.xml`]
  }
}
