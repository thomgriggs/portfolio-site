"use client";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Counter } from './Counter';

export function About() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold">
                <span className="block text-foreground display-serif">Building</span>
                <span className="block text-primary display-serif-italic">Digital Experiences</span>
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I build front-end for brands and hospitality—clean HTML/CSS, straightforward JavaScript, 
                and small, reliable components. Over <span className="text-foreground font-medium">
                  <Counter end={10} suffix="+ years" />
                </span> of hand-coding with a deep appreciation for typography and the craft.
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
              <Button onClick={scrollToProjects} size="lg" className="group">
                View My Work
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button onClick={scrollToContact} variant="outline" size="lg">
                Let's Connect
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              <a 
                href="https://github.com/thomgriggs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">GitHub</span>
              </a>
              <a 
                href="https://linkedin.com/in/thomgriggs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a 
                href="mailto:hello@thomgriggs.com"
                className="group flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Email</span>
              </a>
            </div>
          </div>
          
          {/* Right side - Visual elements */}
          <div className="relative">
            <div className="relative z-10">
              {/* Profile image with sophisticated styling */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl rotate-6"></div>
                <div className="relative bg-card border border-border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                  <div className="w-full h-40 sm:h-48 lg:h-64 bg-muted rounded-xl flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Profile Image</span>
                  </div>
                  <div className="mt-3 sm:mt-4 lg:mt-6 space-y-1 sm:space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Location</span>
                      <span className="text-foreground">Remote</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="text-foreground">10+ Years</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Focus</span>
                      <span className="text-foreground">Hospitality</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="hidden lg:block">
              <div className="absolute top-0 -left-4 bg-card border border-border rounded-lg px-3 py-2 shadow-lg animate-float-1">
                <div className="text-xs text-muted-foreground">HTML/CSS</div>
                <div className="text-sm font-semibold text-foreground">Expert</div>
              </div>
              
              <div className="absolute bottom-12 -right-4 bg-card border border-border rounded-lg px-3 py-2 shadow-lg animate-float-2">
                <div className="text-xs text-muted-foreground">Typography</div>
                <div className="text-sm font-semibold text-foreground">Passionate</div>
              </div>
              
              <div className="absolute top-1/2 -left-8 bg-card border border-border rounded-lg px-3 py-2 shadow-lg animate-float-3">
                <div className="text-xs text-muted-foreground">React</div>
                <div className="text-sm font-semibold text-foreground">Learning</div>
              </div>
              
              <div className="absolute top-16 right-4 bg-card border border-border rounded-lg px-3 py-2 shadow-lg animate-float-4">
                <div className="text-xs text-muted-foreground">JavaScript</div>
                <div className="text-sm font-semibold text-foreground">Advanced</div>
              </div>
              
              <div className="absolute bottom-32 left-4 bg-card border border-border rounded-lg px-3 py-2 shadow-lg animate-float-5">
                <div className="text-xs text-muted-foreground">Figma</div>
                <div className="text-sm font-semibold text-foreground">Expert</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
