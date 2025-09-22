import Link from 'next/link';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* Featured Work */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Work</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A curated selection from 258+ hospitality websites, showcasing hand-coded craftsmanship, custom interactions, and pixel-perfect Figma-to-code translation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Hotel Palombaggia */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">hospitality</span>
                <span className="text-sm text-gray-500">2025</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Featured Project</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Hotel Palombaggia</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Luxury hotel rebuild with sliders, filtering, popups; tuned for performance.
              </p>
              <Link href="/work/hotel-palombaggia" className="text-blue-600 hover:text-blue-800">
                View Case Study
              </Link>
            </div>
          </div>

          {/* Maison Heler */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">other</span>
                <span className="text-sm text-gray-500">2025</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Featured Project</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Maison Heler</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                No description available
              </p>
              <Link href="/work/maison-heler" className="text-blue-600 hover:text-blue-800">
                View Case Study
              </Link>
            </div>
          </div>

          {/* Recent Client Work */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">Recent Client Work</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Latest projects from my hospitality development portfolio
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">1er etage</h4>
                  <p className="text-sm text-gray-500">2025 • Hotel</p>
                </div>
                <div>
                  <h4 className="font-semibold">Alma Hotel</h4>
                  <p className="text-sm text-gray-500">2025 • Hotel</p>
                </div>
                <div>
                  <h4 className="font-semibold">Altai Courchevel</h4>
                  <p className="text-sm text-gray-500">2025 • Hotel</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This is just a sample of my work—view my complete project archive with 258+ hospitality websites or get in touch to discuss your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/work" className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              View Complete Archive
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Technical capabilities and tools I use to build clean, accessible websites.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Core Technologies</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Foundation skills built over 10+ years</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>HTML5 & CSS3</span>
                <span className="text-sm text-gray-500">Expert</span>
              </div>
              <div className="flex justify-between">
                <span>JavaScript (ES6+)</span>
                <span className="text-sm text-gray-500">Advanced</span>
              </div>
              <div className="flex justify-between">
                <span>jQuery</span>
                <span className="text-sm text-gray-500">Advanced</span>
              </div>
              <div className="flex justify-between">
                <span>Responsive Design</span>
                <span className="text-sm text-gray-500">Expert</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Modern Stack</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Actively expanding and learning</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>React</span>
                <span className="text-sm text-gray-500">Intermediate</span>
              </div>
              <div className="flex justify-between">
                <span>TypeScript</span>
                <span className="text-sm text-gray-500">Intermediate</span>
              </div>
              <div className="flex justify-between">
                <span>Git/GitHub</span>
                <span className="text-sm text-gray-500">Intermediate</span>
              </div>
              <div className="flex justify-between">
                <span>Node.js</span>
                <span className="text-sm text-gray-500">Learning</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Design & Tools</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Design-to-code expertise</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Figma to Code</span>
                <span className="text-sm text-gray-500">Expert</span>
              </div>
              <div className="flex justify-between">
                <span>Typography Systems</span>
                <span className="text-sm text-gray-500">Advanced</span>
              </div>
              <div className="flex justify-between">
                <span>Performance Optimization</span>
                <span className="text-sm text-gray-500">Advanced</span>
              </div>
              <div className="flex justify-between">
                <span>ADA Compliance</span>
                <span className="text-sm text-gray-500">Advanced</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Areas of Focus</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Skills I've developed working in the hospitality industry</p>
            <div className="space-y-2 text-sm">
              <div>Front-End Development</div>
              <div>Hospitality Industry</div>
              <div>Web Standards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to collaborate? Open to remote opportunities, freelance projects, or conversations about front-end development, typography, and the craft of code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Looking for a front-end developer who appreciates the craft? I'm currently exploring new opportunities and would love to discuss how my hospitality industry experience and eye for detail could benefit your team.
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Email</h4>
                <p className="text-sm text-gray-500 mb-1">Best way to reach me</p>
                <a href="mailto:hello@thomgriggs.com" className="text-blue-600 hover:text-blue-800">
                  hello@thomgriggs.com
                </a>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Portfolio</h4>
                <p className="text-sm text-gray-500 mb-1">See my full work archive</p>
                <a href="https://thomgriggs.com" className="text-blue-600 hover:text-blue-800">
                  thomgriggs.com
                </a>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Location</h4>
                <p className="text-sm text-gray-500 mb-1">Currently available for</p>
                <p>Remote work worldwide</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Send a Message</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Have a project in mind? Fill out the form below and I'll get back to you within 24 hours.
            </p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <button type="submit" className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}