import Link from 'next/link';

export const metadata = {
  title: 'Email Design',
  description: 'Explore Thom Griggs&apos; modular email templates and design approach for responsive, accessible email campaigns.',
};

export default function EmailDesignPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Email Design</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Modular, responsive email templates that work across all clients and devices
          </p>
        </div>

        {/* Back to Home */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </section>

      {/* Email Design Content */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        {/* Introduction */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Why Email Design Matters</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Email remains one of the most effective marketing channels, but it&apos;s also one of the most challenging to design for. With dozens of email clients, varying support for CSS, and the need for accessibility, creating emails that work everywhere requires a different approach than web design.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            I build modular email templates using MJML and hand-coded HTML that render beautifully across devices and clients, ensuring your brand message reaches your audience effectively.
          </p>
        </div>

        {/* Email Template Showcase */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Sample Email Template</h2>
          
          {/* Email Preview */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-8 mb-8">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {/* Email Header */}
              <div className="bg-gray-900 text-white p-6 text-center">
                <h3 className="text-xl font-bold">Thom Griggs — Front-End Developer</h3>
              </div>
              
              {/* Email Body */}
              <div className="p-6">
                <h4 className="text-2xl font-bold mb-4">Subject Line Headline</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Short preheader copy goes here. Summarize the value in one sentence.
                </p>
                
                <div className="text-center mb-6">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">
                    View Portfolio
                  </button>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h5 className="font-bold text-lg mb-3">Feature Block</h5>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Bullet highlight one</li>
                    <li>• Bullet highlight two</li>
                    <li>• Bullet highlight three</li>
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h5 className="font-bold text-lg mb-3">Project Spotlight</h5>
                  <div className="bg-gray-100 dark:bg-gray-700 h-32 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500">Project Screenshot</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Quick paragraph describing the problem → solution → impact. Link to case study.
                  </p>
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm">
                    Read Case Study
                  </button>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h5 className="font-bold text-lg mb-3">Two-Column Features</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-semibold mb-2">Accessibility</h6>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Skip links, keyboard nav, color contrast, semantic HTML.
                      </p>
                    </div>
                    <div>
                      <h6 className="font-semibold mb-2">Performance</h6>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Image optimization, code splitting, lazy loading, caching.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Email Footer */}
              <div className="bg-gray-900 text-gray-400 p-4 text-center text-sm">
                © 2025 Thom Griggs • thomgriggs.com • Unsubscribe
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center">
            <a
              href="/email-template.mjml"
              download="thomgriggs-email-template.mjml"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              📥 Download MJML Template
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Free MJML template ready to customize
            </p>
          </div>
        </div>

        {/* Features & Benefits */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">What Makes My Emails Different</h3>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3">✓</span>
                <div>
                  <strong>Modular Design:</strong> Reusable components that maintain consistency across campaigns
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3">✓</span>
                <div>
                  <strong>Client Compatibility:</strong> Tested across major email clients (Gmail, Outlook, Apple Mail)
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3">✓</span>
                <div>
                  <strong>Accessibility First:</strong> Proper alt text, semantic structure, and screen reader support
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3">✓</span>
                <div>
                  <strong>Mobile Optimized:</strong> Responsive design that looks great on all screen sizes
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Technical Approach</h3>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-3">•</span>
                <div>
                  <strong>MJML Framework:</strong> Streamlined development with reliable cross-client rendering
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">•</span>
                <div>
                  <strong>Hand-coded HTML:</strong> When MJML isn&apos;t enough, I write custom code for specific needs
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">•</span>
                <div>
                  <strong>Performance Focused:</strong> Optimized images, minimal CSS, fast loading times
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">•</span>
                <div>
                  <strong>Brand Consistency:</strong> Templates that match your visual identity and tone
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Process */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6">My Email Design Process</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Discovery</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Understanding your brand, audience, and campaign goals
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 dark:text-green-400 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Design & Build</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Creating modular templates with your brand identity
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Test & Deploy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Cross-client testing and seamless integration
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Upgrade Your Email Campaigns?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Let&apos;s discuss how custom email templates can improve your open rates and engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start a Project
            </Link>
            <a 
              href="https://calendly.com/thomgriggs/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
