'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import CalendlyWidget from '@/components/CalendlyWidget';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function ContactPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm here to help you connect with Thomas. What brings you here today?",
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStage, setConversationStage] = useState<'greeting' | 'qualifying' | 'collecting' | 'connecting'>('greeting');
  const [collectedInfo, setCollectedInfo] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Common questions and suggestions based on conversation stage
  const getSuggestions = (stage: string, input: string = '') => {
    const commonQuestions = {
      greeting: [
        "I'm looking for a full-time frontend developer position",
        "I have a website project that needs rebuilding",
        "I need help with accessibility compliance",
        "I'm interested in contract work",
        "I'd like a technical consultation",
        "What services do you offer?",
        "How much do you charge for projects?"
      ],
      qualifying: [
        "We're a startup looking for a senior developer",
        "We're an agency with multiple client projects",
        "We're a large enterprise company",
        "We need someone for a 6-month contract",
        "We're looking for a permanent team member",
        "Our budget is around $50,000",
        "We need this completed within 2 months"
      ],
      collecting: [
        "My name is John Smith",
        "My email is john@company.com",
        "I work at TechCorp",
        "I'm the CTO at StartupXYZ",
        "I'm a freelance designer"
      ],
      connecting: [
        "Yes, I'd like to schedule a call",
        "Can you tell me more about your process?",
        "What's your availability like?",
        "Do you have any case studies I can review?",
        "What makes you different from other developers?"
      ]
    };

    const stageSuggestions = commonQuestions[stage as keyof typeof commonQuestions] || [];
    
    // Filter suggestions based on input
    if (input.length > 0) {
      return stageSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 3);
    }
    
    return stageSuggestions.slice(0, 4);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.length > 0) {
      const filteredSuggestions = getSuggestions(conversationStage, value);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Greeting stage responses
    if (conversationStage === 'greeting') {
      if (message.includes('full-time') || message.includes('job') || message.includes('employment')) {
        setConversationStage('qualifying');
        return "Great! Thomas is interested in full-time opportunities. He builds front-end for brands and hospitality with clean HTML/CSS, straightforward JavaScript, and accessibility basics.\n\nWhat kind of company are you with?";
      }
      
      if (message.includes('contract') || message.includes('freelance') || message.includes('project')) {
        setConversationStage('qualifying');
        return "Good! Thomas does contract work. He focuses on:\n\n• Clean HTML/CSS and straightforward JavaScript\n• Swiper sliders with keyboard support\n• Accessibility basics (skip links, focus rings)\n• Performance optimization\n\nWhat kind of project are you thinking about?";
      }
      
      if (message.includes('help') || message.includes('advice') || message.includes('consultation')) {
        setConversationStage('qualifying');
        return "Thomas does consultations. He can help with:\n\n• Accessibility basics and keyboard navigation\n• Performance optimization\n• Clean HTML/CSS patterns\n• Swiper slider implementation\n\nWhat's the main challenge you're dealing with?";
      }
      
      if (message.includes('services') || message.includes('offer')) {
        return "Thomas focuses on front-end development:\n\n• Clean HTML/CSS and JavaScript\n• Swiper sliders with accessibility\n• Performance optimization\n• Keyboard navigation and focus management\n\nWhat sounds most interesting to you?";
      }
      
      if (message.includes('charge') || message.includes('cost') || message.includes('price') || message.includes('budget')) {
        return "Pricing depends on the project scope:\n\n• Hourly rates for ongoing work\n• Fixed pricing for specific projects\n• Free 30-minute consultation call\n\nWhat kind of project are you thinking about?";
      }
      
      return "Thomas is a frontend developer who builds clean, accessible sites for brands and hospitality. What brings you here? Are you looking for:\n\n• Full-time work\n• Contract projects\n• Technical help\n• Something specific\n\nJust tell me what you're thinking!";
    }
    
    // Qualifying stage responses
    if (conversationStage === 'qualifying') {
      if (message.includes('startup') || message.includes('small company')) {
        return "Startups are a great fit for Thom! He's worked with companies of all sizes and understands the unique challenges of fast-paced environments. His ability to fill in design details from minimal information and move projects forward efficiently is particularly valuable for startups.\n\nWhat's your company's focus, and what kind of frontend challenges are you facing? Are you looking for someone to join your team or help with a specific project?";
      }
      
      if (message.includes('agency') || message.includes('multiple client')) {
        return "Agencies are Thom's sweet spot! With 250+ boutique websites under his belt, he's mastered the art of translating diverse client visions into clean, accessible code. He's particularly skilled at:\n\n• Working with multiple design styles and brand requirements\n• Maintaining consistent quality across projects\n• Collaborating with design teams and account managers\n• Meeting tight deadlines while preserving quality\n\nWhat types of clients do you typically work with, and what's your current workflow like?";
      }
      
      if (message.includes('enterprise') || message.includes('large company')) {
        return "Enterprise projects are where Thom really shines! His experience includes:\n\n• Large-scale accessibility audits (like his work with QlikTech)\n• Complex design systems and component libraries\n• Performance optimization for high-traffic sites\n• Cross-team collaboration and technical leadership\n\nEnterprise work often involves navigating complex requirements, multiple stakeholders, and legacy systems. What kind of enterprise challenges are you dealing with?";
      }
      
      if (message.includes('website') || message.includes('site') || message.includes('rebuild')) {
        setConversationStage('collecting');
        return "Excellent! Website rebuilds are one of Thom's core specialties. He approaches every rebuild with:\n\n• Comprehensive accessibility audit\n• Performance optimization strategy\n• Modern tech stack recommendations\n• Clean, maintainable code architecture\n• Cross-browser compatibility\n\nHis design-to-code translation expertise means he can work from minimal design information and fill in the gaps effectively. To provide you with a detailed proposal, could you tell me your name and email address?";
      }
      
      if (message.includes('accessibility') || message.includes('ada') || message.includes('wcag')) {
        setConversationStage('collecting');
        return "Thom is a true accessibility expert! His credentials include:\n\n• Enterprise-level WCAG 2.1 AA compliance audits\n• Screen reader compatibility testing\n• Keyboard navigation optimization\n• Color contrast and visual accessibility\n• Comprehensive remediation strategies\n\nHe's worked with companies like QlikTech on large-scale accessibility improvements. Accessibility isn't just compliance for Thom—it's about creating inclusive experiences for all users. Could you share your name and email so he can reach out with a detailed assessment?";
      }
      
      if (message.includes('budget') || message.includes('50,000') || message.includes('cost')) {
        return "That's a solid budget range! Thom works with projects of all sizes and can provide transparent pricing based on your specific needs. His approach includes:\n\n• Free initial consultation to understand scope\n• Detailed project breakdown with clear deliverables\n• Flexible payment terms (milestone-based or retainer)\n• No surprise costs—everything is outlined upfront\n\nWhat type of project are you planning? A website rebuild, accessibility audit, or something else?";
      }
      
      if (message.includes('timeline') || message.includes('month') || message.includes('deadline')) {
        return "Timeline is crucial for project success! Thom is known for:\n\n• Realistic project planning and communication\n• Efficient workflows that don't sacrifice quality\n• Proactive communication about potential delays\n• Flexible scheduling to meet your deadlines\n\nHis experience with 250+ projects has taught him how to balance speed with quality. What's your target timeline, and what factors are driving that schedule?";
      }
      
      return "That's really interesting! To help Thom provide the most relevant information and proposal, could you tell me more about:\n\n• Your company and what you do\n• The specific challenges you're facing\n• Your ideal timeline and budget range\n• What success looks like for this project\n\nThis will help him tailor his response to your exact needs.";
    }
    
    // Collecting stage responses
    if (conversationStage === 'collecting') {
      if (message.includes('@') && !collectedInfo.email) {
        setCollectedInfo(prev => ({ ...prev, email: userMessage }));
        return "Perfect! I've got your email address. Now, what's your name? This will help Thom personalize his response when he reaches out.";
      }
      
      if (!collectedInfo.name && !message.includes('@')) {
        setCollectedInfo(prev => ({ ...prev, name: userMessage }));
        return "Great! Nice to meet you. And what's your email address? Thom will use this to send you a detailed response and proposal.";
      }
      
      if (collectedInfo.name && collectedInfo.email) {
        setConversationStage('connecting');
        return `Perfect! I have your information: ${collectedInfo.name} (${collectedInfo.email}). \n\nThom will reach out to you within 24 hours with:\n• A detailed response to your inquiry\n• Relevant case studies and examples\n• A preliminary project proposal\n• Next steps for moving forward\n\nIn the meantime, would you like to schedule a call with him directly? He offers free 30-minute consultations to discuss your project in detail.`;
      }
      
      return "I'm collecting your information to connect you with Thom effectively. Could you provide:\n\n• Your name\n• Your email address\n\nThis will help him personalize his response and send you relevant information about your project.";
    }
    
    // Connecting stage responses
    if (conversationStage === 'connecting') {
      if (message.includes('yes') || message.includes('schedule') || message.includes('call')) {
        return "Excellent! Thom's calendar is integrated right here on this page. He typically responds within 24 hours and offers free initial consultations.\n\n**What to expect from your call:**\n• Detailed discussion of your project requirements\n• Technical recommendations and best practices\n• Timeline and budget estimates\n• Questions about your goals and constraints\n• Next steps for moving forward\n\nIs there anything specific you'd like him to know about your project or opportunity before the call?";
      }
      
      if (message.includes('process') || message.includes('how')) {
        return "Thom's process is designed to be transparent and collaborative:\n\n**Discovery Phase:**\n• Free consultation call to understand your needs\n• Technical assessment and requirements gathering\n• Detailed project proposal with clear deliverables\n\n**Development Phase:**\n• Regular check-ins and progress updates\n• Collaborative decision-making on technical choices\n• Quality assurance and testing\n\n**Delivery Phase:**\n• Thorough testing and optimization\n• Documentation and handoff materials\n• Ongoing support options\n\nWhat aspect of the process are you most curious about?";
      }
      
      if (message.includes('availability') || message.includes('when')) {
        return "Thom's availability varies based on current commitments, but he typically:\n\n• Responds to inquiries within 24 hours\n• Offers free consultation calls within 1-2 business days\n• Can start new projects within 2-4 weeks\n• Works remotely with flexible scheduling\n• Accommodates different time zones\n\nHe's currently accepting new projects and consultations. Would you like to schedule a call to discuss your timeline and availability?";
      }
      
      if (message.includes('case study') || message.includes('example') || message.includes('portfolio')) {
        return "Thom has extensive case studies and examples! You can find:\n\n• Featured projects on his work page\n• Detailed case studies in his portfolio\n• Before/after examples of accessibility improvements\n• Performance optimization results\n• Design-to-code translation examples\n\nHis portfolio showcases 250+ boutique websites across various industries. Would you like him to send you specific examples relevant to your project type?";
      }
      
      if (message.includes('different') || message.includes('unique') || message.includes('special')) {
        return "What makes Thom different:\n\n**Volume & Experience:**\n• 250+ boutique websites built\n• 15+ years of design-to-code translation\n• Enterprise-level accessibility expertise\n\n**Unique Background:**\n• Started in design, evolved to development\n• Deep appreciation for creative process\n• Effective translator between design and backend teams\n\n**Approach:**\n• Proactive problem identification\n• Clean, maintainable code architecture\n• Remote collaboration mastery\n• AI-assisted workflow innovation\n\nWhat aspect of his background interests you most?";
      }
      
      return "Thom will be in touch soon with a detailed response! Is there anything else I can help you with, or would you like to schedule a call to discuss your project further?";
    }
    
    return "I'm here to help you connect with Thom effectively. Could you tell me more about what you're looking for? I can help guide you through the process and answer any questions you might have.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <main className="contact-page" id="main-content" role="main">
      {/* Search Engine Style Header */}
      <section className="contact-search-header">
        <div className="contact-search-container">
          <Link href="/" className="contact-back-link">
            ← Back to Home
          </Link>
          
          <div className="contact-search-logo">
            <div className="contact-logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <span className="contact-logo-text">Thomas Griggs</span>
          </div>
          
          <div className="contact-search-box">
            <div className="contact-search-input-container">
              <svg className="contact-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <form onSubmit={handleSubmit} className="contact-search-form">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Ask me anything about frontend development, projects, or working together..."
                  className="contact-search-input"
                  disabled={isTyping}
                  onFocus={() => {
                    if (inputValue.length === 0) {
                      const stageSuggestions = getSuggestions(conversationStage);
                      setSuggestions(stageSuggestions);
                      setShowSuggestions(stageSuggestions.length > 0);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 200);
                  }}
                />
              </form>
              <div className="contact-search-actions">
                <button type="submit" className="contact-search-btn" disabled={!inputValue.trim() || isTyping}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="contact-search-suggestions">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectSuggestion(suggestion)}
                    className="contact-suggestion-item"
                  >
                    <svg className="contact-suggestion-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                    <span className="contact-suggestion-text">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* AI Conversation Interface */}
      <section className="contact-conversation">
        <div className="contact-conversation-container">
          {/* Messages Container */}
          <div className="contact-messages">
            {messages.map((message) => (
              <div key={message.id} className={`contact-message ${message.type}`}>
                <div className="contact-message-content">
                  <div className="contact-message-avatar">
                    {message.type === 'ai' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    )}
                  </div>
                  <div className="contact-message-bubble">
                    <div className="contact-message-text" dangerouslySetInnerHTML={{ 
                      __html: message.content.replace(/\n/g, '<br>') 
                    }} />
                    <div className="contact-message-time">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="contact-message ai">
                <div className="contact-message-content">
                  <div className="contact-message-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div className="contact-typing-indicator">
                    <div className="contact-typing-dots">
                      <div className="contact-typing-dot"></div>
                      <div className="contact-typing-dot"></div>
                      <div className="contact-typing-dot"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="contact-quick-actions">
            <div className="contact-quick-actions-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="contact-quick-actions-grid">
              <button 
                className="contact-quick-action"
                onClick={() => selectSuggestion("I'm looking for a full-time frontend developer position")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Full-time Position</span>
              </button>
              
              <button 
                className="contact-quick-action"
                onClick={() => selectSuggestion("I have a website project that needs rebuilding")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                <span>Website Rebuild</span>
              </button>
              
              <button 
                className="contact-quick-action"
                onClick={() => selectSuggestion("I need help with accessibility compliance")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                  <path d="M13 12h3a2 2 0 0 1 2 2v1"/>
                  <path d="M11 12H8a2 2 0 0 0-2 2v1"/>
                </svg>
                <span>Accessibility Help</span>
              </button>
              
              <button 
                className="contact-quick-action"
                onClick={() => selectSuggestion("I'm interested in contract work")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
                <span>Contract Work</span>
              </button>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="contact-info-sidebar">
            <div className="contact-info-section">
              <h3 className="contact-info-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Direct Contact
              </h3>
              <div className="contact-info-content">
                <a href="mailto:thomgriggs@gmail.com" className="contact-info-link">
                  thomgriggs@gmail.com
                </a>
                <p className="contact-info-text">ThomGriggs LLC</p>
                <p className="contact-info-text">Remote worldwide</p>
              </div>
            </div>

            <div className="contact-info-section">
              <h3 className="contact-info-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Schedule a Call
              </h3>
              <div className="contact-info-content">
                <p className="contact-info-text">Free 30-minute consultation</p>
                <CalendlyWidget 
                  username="thomgriggs"
                  eventTypeId="30min"
                  utm={{
                    utmCampaign: 'portfolio-contact',
                    utmSource: 'website',
                    utmMedium: 'contact-page'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}