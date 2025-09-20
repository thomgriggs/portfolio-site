"use client";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Mail, MessageSquare, MapPin, Send, ExternalLink, Github, Linkedin, Coffee } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend service
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Best way to reach me",
      value: "hello@thomgriggs.com",
      href: "mailto:hello@thomgriggs.com",
      primary: true
    },
    {
      icon: ExternalLink,
      title: "Portfolio",
      description: "See my full work archive",
      value: "thomgriggs.com",
      href: "https://thomgriggs-portfolio.vercel.app",
      primary: false
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Currently available for",
      value: "Remote work worldwide",
      href: "#",
      primary: false
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      href: "https://github.com/thomgriggs",
      username: "@thomgriggs"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://linkedin.com/in/thomgriggs",
      username: "thomgriggs"
    },
    {
      icon: Coffee,
      name: "Schedule a call",
      href: "https://calendly.com/thomgriggs",
      username: "Let's chat"
    }
  ];

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-background border border-border text-sm text-muted-foreground mb-4">
            <MessageSquare className="w-4 h-4 mr-2" />
            Let's Connect
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6 tracking-tight">
            Ready to <span className="text-primary italic">collaborate</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Open to remote opportunities, freelance projects, or conversations about 
            front-end development, typography, and the craft of code.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Get In Touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Looking for a front-end developer who appreciates the craft? I'm currently exploring 
                new opportunities and would love to discuss how my hospitality industry experience 
                and eye for detail could benefit your team.
              </p>
            </div>

            {/* Contact methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className={`group ${method.primary ? 'bg-primary/5 border border-primary/20 rounded-xl p-6' : ''}`}>
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 ${method.primary ? 'bg-primary/20' : 'bg-muted'} rounded-lg p-3`}>
                      <method.icon className={`h-5 w-5 ${method.primary ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{method.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                      <a 
                        href={method.href}
                        className={`text-sm ${method.primary ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
                      >
                        {method.value}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-8 border-t border-border">
              <h4 className="font-semibold text-foreground mb-4">Connect Elsewhere</h4>
              <div className="space-y-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <social.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">
                      <span className="font-medium">{social.name}</span>
                      <span className="ml-2 opacity-75">{social.username}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Send a Message</h3>
                  <p className="text-muted-foreground">
                    Have a project in mind? Fill out the form below and I'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="bg-background border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="bg-background border-border focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-foreground">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your project, timeline, and what you're looking for..."
                      rows={6}
                      className="bg-background border-border focus:border-primary resize-none"
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full group">
                    <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </Button>
                </form>

                <div className="mt-8 p-6 bg-muted/50 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Currently Available</p>
                      <p className="text-sm text-muted-foreground">
                        I typically respond within 24 hours and am available for both full-time 
                        opportunities and freelance projects.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
