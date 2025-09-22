import { Card, CardContent } from "./ui/card";
import { Code, Palette, Zap, Users, Award, Calendar, MapPin, Map } from "lucide-react";
import { Counter } from "./Counter";

export function Currently() {
  const highlights = [
    {
      icon: Code,
      title: "Hand-Coded Craft",
      description: "Pixel-perfect translation of Figma designs into responsive, interactive websites."
    },
    {
      icon: Palette,
      title: "Typography Love",
      description: "Deep appreciation for typography systems and the art of digital craftsmanship."
    },
    {
      icon: Zap,
      title: "Performance & ADA",
      description: "Optimizing for speed, SEO, and accessibility compliance across all builds."
    },
    {
      icon: Users,
      title: "Hospitality Focus",
      description: "260+ custom hotel websites, from boutique properties to global brands."
    }
  ];

  const stats = [
    { icon: Award, label: "Websites Built", value: 260, suffix: "+" },
    { icon: Calendar, label: "Years Experience", value: 10, suffix: "+" },
    { icon: MapPin, label: "Industry", value: "Hospitality", isText: true }
  ];

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative" data-test="currently-banner">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted/50 text-sm text-muted-foreground mb-4">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            About Me
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6 display-serif">
            Where <span className="text-primary display-serif-italic">craft</span> meets <span className="text-primary display-serif-italic">code</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            I'm a seasoned Front-End Developer with 10+ years hand-coding responsive websites 
            for the hospitality industry. I appreciate the craft and have a deep love for typography.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {stat.isText ? (
                  stat.value
                ) : (
                  <Counter end={stat.value as number} suffix={stat.suffix} />
                )}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Story */}
          <div className="space-y-8">
            {/* Journey Icon */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <Map className="h-10 w-10 md:h-12 md:w-12 text-primary" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background animate-pulse"></div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-serif-display font-medium mb-6 text-foreground">My Journey</h3>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Over the past decade at <span className="text-foreground font-medium">WIHP/Cendyn</span>, 
                  I've built 260+ custom hotel websites, ranging from intimate boutique properties to 
                  large-scale global brands. My core skill is taking a Figma design and translating 
                  it into a live, responsive website.
                </p>
                <p>
                  I specialize in <span className="text-foreground font-medium">HTML5, CSS3, and JavaScript</span>, 
                  with expertise in custom sliders, multi-level navigation, and ADA compliance. Currently 
                  expanding into <span className="text-foreground font-medium">React, TypeScript</span>, 
                  and AI-enhanced development workflows.
                </p>
                <p>
                  I'm laid back but detail-oriented, thriving where design meets code. Always exploring 
                  new ways to integrate modern frameworks while maintaining the craft and precision 
                  that defines quality front-end work.
                </p>
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h4 className="text-lg font-serif-display font-medium mb-4 text-foreground">Design Philosophy</h4>
              <blockquote className="text-muted-foreground font-serif-body italic border-l-4 border-primary pl-6 text-lg leading-relaxed">
                "Great web development isn't just about making things work—it's about crafting 
                experiences that feel effortless, look beautiful, and perform flawlessly across 
                every device and interaction."
              </blockquote>
            </div>
          </div>
          
          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-500 border-border/50 hover:border-border"
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Current status */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">Currently</h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Transitioning from a decade at WIHP/Cendyn to explore new opportunities. 
            Building my portfolio site and expanding into modern frameworks while 
            maintaining my passion for hand-crafted, accessible web experiences.
          </p>
          <div className="inline-flex items-center text-primary font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Open to new opportunities
          </div>
        </div>
      </div>
    </section>
  );
}
