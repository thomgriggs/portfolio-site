export async function GET() {
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Thom Griggs - Updates</title>
    <description>Follow Thom Griggs' journey in front-end development, including project updates, learning insights, and personal notes.</description>
    <link>https://thomgriggs.vercel.app/notes</link>
    <atom:link href="https://thomgriggs.vercel.app/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <item>
      <title>Portfolio Site Launch</title>
      <description>Just shipped my new portfolio site built with Next.js 15 and TypeScript. Really excited about the interactive "Ask My Services" feature and the email design showcase.</description>
      <link>https://thomgriggs.vercel.app/notes</link>
      <guid>https://thomgriggs.vercel.app/notes#portfolio-launch</guid>
      <pubDate>Wed, 15 Jan 2025 00:00:00 GMT</pubDate>
    </item>
    <item>
      <title>AI Workflow Experiments</title>
      <description>Been exploring how AI can enhance my development workflow without replacing the craft. Using it for documentation, code reviews, and client communication templates.</description>
      <link>https://thomgriggs.vercel.app/notes</link>
      <guid>https://thomgriggs.vercel.app/notes#ai-workflow</guid>
      <pubDate>Fri, 10 Jan 2025 00:00:00 GMT</pubDate>
    </item>
    <item>
      <title>Accessibility Deep Dive</title>
      <description>Spent the weekend auditing a client site for WCAG compliance. Found some interesting edge cases with screen readers and dynamic content.</description>
      <link>https://thomgriggs.vercel.app/notes</link>
      <guid>https://thomgriggs.vercel.app/notes#accessibility</guid>
      <pubDate>Sun, 05 Jan 2025 00:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
