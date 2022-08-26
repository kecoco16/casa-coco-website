/** @type {import('next-sitemap').IConfig} */

const siteUrl =
  process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://www.casacoco.info'

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }]
  }
}
