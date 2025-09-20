"use client";
import { Github, Linkedin, Mail, Heart, ExternalLink, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/thomgriggs',
      icon: Github,
      label: 'View my code repositories'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/thomgriggs',
      icon: Linkedin,
      label: 'Connect professionally'
    },
    {
      name: 'Email',
      href: 'mailto:hello@thomgriggs.com',
      icon: Mail,
      label: 'Send me an email'
    }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">TG</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Thom Griggs</h3>
                  <p className="text-sm text-muted-foreground">Front-End Developer</p>
                </div>
              </div>
              
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Crafting pixel-perfect, responsive websites for the hospitality industry. 
                10+ years of hand-coding with a passion for typography and the craft.
              </p>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Available for work</span>
                </div>
                <span>260+ websites delivered</span>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href="https://thomgriggs-portfolio.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <span>Full Portfolio</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-foreground font-semibold mb-6">Navigation</h4>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect section */}
            <div>
              <h4 className="text-foreground font-semibold mb-6">Connect</h4>
              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.name !== 'Email' ? '_blank' : undefined}
                    rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              © {currentYear} Thom Griggs. Hand-coded with <Heart className="h-4 w-4 text-red-500" /> 
              and an appreciation for the craft.
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <button 
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowUp className="h-4 w-4" />
                <span>Back to top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}