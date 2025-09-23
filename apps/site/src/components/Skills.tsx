"use client";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code2, Palette, Zap, Brain, Star } from "lucide-react";
import { SkillBar } from "./SkillBar";
import { useScrollAnimation } from "./hooks/useScrollAnimation";

export function Skills() {
  const { elementRef: specializationsRef, isVisible: specializationsVisible } = useScrollAnimation();

  const skillCategories = [
    {
      icon: Code2,
      title: "Core Technologies",
      description: "Foundation skills built over 10+ years",
      skills: [
        { name: "HTML5 & CSS3", level: 95, experience: "Expert" },
        { name: "JavaScript (ES6+)", level: 90, experience: "Advanced" },
        { name: "jQuery", level: 85, experience: "Advanced" },
        { name: "Responsive Design", level: 95, experience: "Expert" }
      ]
    },
    {
      icon: Brain,
      title: "Modern Stack",
      description: "Actively expanding and learning",
      skills: [
        { name: "React", level: 70, experience: "Intermediate" },
        { name: "TypeScript", level: 65, experience: "Intermediate" },
        { name: "Git/GitHub", level: 75, experience: "Intermediate" },
        { name: "Node.js", level: 60, experience: "Learning" }
      ]
    },
    {
      icon: Palette,
      title: "Design & Tools",
      description: "Design-to-code expertise",
      skills: [
        { name: "Figma to Code", level: 95, experience: "Expert" },
        { name: "Typography Systems", level: 90, experience: "Advanced" },
        { name: "Performance Optimization", level: 85, experience: "Advanced" },
        { name: "ADA Compliance", level: 80, experience: "Advanced" }
      ]
    }
  ];

  const specializations = [
    {
      category: "Front-End Development",
      skills: [
        "Custom interactive elements",
        "Navigation systems",
        "Layout with CSS Grid & Flexbox",
        "Cross-browser compatibility",
        "Progressive enhancement"
      ]
    },
    {
      category: "Hospitality Industry",
      skills: [
        "Hotel booking integrations",
        "CMS implementations",
        "Brand guideline adherence",
        "Content management",
        "User-focused design"
      ]
    },
    {
      category: "Web Standards",
      skills: [
        "SEO best practices",
        "Performance optimization",
        "Accessibility compliance",
        "WCAG implementation",
        "Core Web Vitals"
      ]
    }
  ];

  const tools = [
    "Figma", "VS Code", "SASS/SCSS", "Webpack", "Notion", "ClickUp", 
    "Swiper.js", "GSAP", "Leaflet", "Flatpickr", "MJML"
  ];

  return (
    <section id="skills" data-test="section-skills" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted/50 text-sm text-muted-foreground mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Skills & Expertise
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6 tracking-tight">
            Technical <span className="text-primary italic">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Technical capabilities and tools I use to build clean, accessible websites.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{category.description}</p>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-3">
                      <SkillBar label={skill.name} level={skill.level} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Specializations */}
        <div className="space-y-12 mb-20">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Areas of Focus</h3>
            <p className="text-muted-foreground">Skills I&apos;ve developed working in the hospitality industry</p>
          </div>

          <div 
            ref={specializationsRef as React.RefObject<HTMLDivElement>}
            className="grid md:grid-cols-3 gap-8"
          >
            {specializations.map((spec, index) => (
              <div 
                key={index} 
                className={`space-y-4 transition-all duration-1000 ${
                  specializationsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: specializationsVisible ? `${index * 200}ms` : '0ms'
                }}
              >
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-primary" />
                  <h4 className="text-lg font-semibold text-foreground">{spec.category}</h4>
                </div>
                <div className="space-y-2">
                  {spec.skills.map((skill, skillIndex) => {
                    const ombreClass = `skill-ombre-${Math.min(skillIndex + 1, 5)}`;
                    return (
                      <div 
                        key={skillIndex}
                        className={`${ombreClass} rounded-lg px-4 py-3 text-sm transition-all duration-500 hover:scale-105 hover:shadow-sm cursor-default ${
                          specializationsVisible 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 translate-x-4'
                        }`}
                        style={{
                          transitionDelay: specializationsVisible ? `${(index * 200) + (skillIndex * 100)}ms` : '0ms'
                        }}
                      >
                        {skill}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Technologies */}
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-2">Tools & Libraries</h3>
              <p className="text-muted-foreground">Technologies and tools I work with regularly</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map((tool, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </section>
  );
}
