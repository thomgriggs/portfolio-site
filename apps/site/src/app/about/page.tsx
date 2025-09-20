import Link from 'next/link';

export const metadata = {
  title: 'About',
  description: 'Learn about Thom Griggs, a frontend developer who builds clean, accessible sites for brands and hospitality.',
};

export default function AboutPage() {
  return (
    <main id="main" role="main">
      {/* Back to Home Link */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group"
            aria-label="Back to home page"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Main About Section */}
      <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-background border border-border text-sm text-muted-foreground">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  About Me
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold">
                  <span className="block text-foreground">Building</span>
                  <span className="block text-primary italic">Digital Experiences</span>
                </h1>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I build front-end for brands and hospitality—clean HTML/CSS, straightforward JavaScript, 
                  and small, reliable components. Over <span className="text-foreground font-medium">10+ years</span> of hand-coding with a deep appreciation for typography and the craft.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I like tidy code, sensible spacing, and features that respect the keyboard. I'll take 
                  the messy parts, organize them, and make them feel simple.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Right now I'm polishing patterns for sliders, menus, and content templates, and leaning 
                  into performance and accessibility basics.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  View My Work
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Let's Connect
                </Link>
              </div>
              
              <nav className="flex items-center space-x-6 pt-4" role="navigation" aria-label="Social media links">
                <a 
                  href="https://github.com/thomgriggs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Visit Thom's GitHub profile to view code repositories"
                >
                  <span className="text-sm">GitHub</span>
                </a>
                <a 
                  href="https://linkedin.com/in/thomgriggs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Connect with Thom on LinkedIn for professional networking"
                >
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a 
                  href="mailto:hello@thomgriggs.com"
                  className="group flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Send email to Thom to discuss projects or opportunities"
                >
                  <span className="text-sm">Email</span>
                </a>
              </nav>
            </div>
            
            {/* Right side - Visual elements */}
            <div className="relative" role="complementary" aria-label="Professional profile and skills">
              <div className="relative z-10">
                {/* Profile image with sophisticated styling */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl rotate-6" aria-hidden="true"></div>
                  <div className="relative bg-card border border-border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl" role="region" aria-label="Professional profile card">
                    <div className="w-full h-40 sm:h-48 lg:h-64 bg-muted rounded-xl flex items-center justify-center" role="img" aria-label="Profile image placeholder">
                      <span className="text-muted-foreground text-sm">Profile Image</span>
                    </div>
                    <div className="mt-3 sm:mt-4 lg:mt-6 space-y-1 sm:space-y-2" role="list" aria-label="Professional details">
                      <div className="flex items-center justify-between text-xs sm:text-sm" role="listitem">
                        <span className="text-muted-foreground">Location</span>
                        <span className="text-foreground">Remote</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm" role="listitem">
                        <span className="text-muted-foreground">Experience</span>
                        <span className="text-foreground">10+ Years</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm" role="listitem">
                        <span className="text-muted-foreground">Focus</span>
                        <span className="text-foreground">Hospitality</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional About Content */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
              <span className="text-foreground">My Approach</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              How I approach front-end development and what makes my work different
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Clean Code First</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I write HTML and CSS that's easy to read, maintain, and extend. Every line serves a purpose, 
                  and every component is built to last.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Accessibility Built-In</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every site I build works with screen readers, keyboard navigation, and assistive technologies. 
                  It's not an afterthought—it's part of the foundation.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Performance Focused</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Fast loading times and smooth interactions. I optimize images, minimize HTTP requests, 
                  and write efficient code that doesn't slow down the user experience.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Collaborative Process</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I work closely with designers and stakeholders to turn ideas into reality. Clear communication 
                  and regular updates keep projects on track and on budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
