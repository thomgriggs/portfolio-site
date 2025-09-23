"use client";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Counter } from './Counter';

export function Hero() {
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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20"></div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left pt-28 pb-20 order-2 lg:order-1">
            <div className="space-y-6">
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-sans font-medium">
                Front-End Developer
              </p>
              <h1 className="text-display-1 font-display tracking-tight">
                <span className="block text-foreground">Thom</span>
                <span className="block text-primary italic">Griggs</span>
              </h1>
            </div>
            
            <div className="max-w-2xl space-y-6">
              <p className="text-body-lg text-muted-foreground">
                Crafting pixel-perfect, responsive websites for the hospitality industry. 
                <span className="text-foreground font-medium">
                  <Counter end={10} suffix="+ years" />
                </span> of hand-coding 
                with a deep appreciation for <span className="text-foreground font-medium">typography</span> and 
                the <span className="text-primary italic font-medium">craft</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-muted-foreground">
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Available for work</span>
                </span>
                <span>
                  <Counter end={260} suffix="+ websites" /> delivered
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={scrollToProjects} size="lg" className="group">
                Explore My Work
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
          <div className="relative order-1 lg:order-2">
            <div className="relative z-10">
              {/* Profile image with sophisticated styling - responsive sizing */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl rotate-6"></div>
                <div className="relative bg-card border border-border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                  <img
                    src="/profile.png"
                    alt="Thom Griggs - Front-End Developer"
                    className="w-full h-40 sm:h-48 lg:h-64 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                  />
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
            
            {/* Floating badges - only show on larger screens to avoid crowding */}
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
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
        <span className="text-xs text-muted-foreground tracking-wider">SCROLL</span>
        <ArrowDown className="h-4 w-4 text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
}
