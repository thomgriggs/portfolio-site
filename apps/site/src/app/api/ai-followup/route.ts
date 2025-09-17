import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, projectType } = body;

    // Simple AI-like follow-up logic based on project type
    let followUpMessage = '';
    let subject = '';

    switch (projectType) {
      case 'website-rebuild':
        subject = 'Website Rebuild - Next Steps';
        followUpMessage = `
Hi ${name},

Thanks again for reaching out about your website rebuild project. I wanted to follow up with some additional thoughts:

**What I typically look for in rebuild projects:**
• Current site performance and accessibility issues
• Mobile responsiveness and user experience
• Content management system needs
• SEO and conversion optimization opportunities

**My approach:**
1. Comprehensive audit of your current site
2. Strategy session to align on goals
3. Phased development with regular check-ins
4. Launch with ongoing support

Would you like to schedule a 30-minute call to discuss your specific needs? I can show you examples of similar rebuilds I've completed.

Best regards,
Thom
        `;
        break;

      case 'accessibility-audit':
        subject = 'Accessibility Audit - How I Can Help';
        followUpMessage = `
Hi ${name},

Following up on your accessibility audit inquiry. This is an area I'm particularly passionate about.

**My accessibility process:**
• WCAG 2.2 compliance assessment
• Screen reader and keyboard navigation testing
• Color contrast and visual accessibility review
• Implementation of fixes with documentation

**Typical outcomes:**
• 90-100% accessibility scores
• Improved user experience for all visitors
• Legal compliance and risk reduction
• Better SEO performance

I'd love to show you some before/after examples of sites I've made accessible. Would a quick call work for you?

Best,
Thom
        `;
        break;

      case 'email-design':
        subject = 'Email Design - Templates & Strategy';
        followUpMessage = `
Hi ${name},

Thanks for your interest in email design services. This is a unique area where I combine design and technical expertise.

**What I offer:**
• Modular MJML templates that work across all clients
• Brand-consistent designs that convert
• Mobile-optimized layouts
• A/B testing and performance optimization

**Recent results:**
• 25% improvement in open rates for a client's newsletter
• 40% increase in click-through rates on promotional emails
• Seamless integration with their existing marketing tools

I've attached a sample template to this email. Would you like to see more examples or discuss your specific email needs?

Best regards,
Thom
        `;
        break;

      default:
        subject = 'Project Discussion - Next Steps';
        followUpMessage = `
Hi ${name},

Thanks for reaching out about your project. I wanted to follow up with some additional information that might be helpful.

**What makes my approach different:**
• Hand-coded, performance-focused development
• Accessibility-first design philosophy
• Modern tech stack (React, TypeScript, Next.js)
• Collaborative process with regular communication

**Recent project highlights:**
• 260+ hotel and brand websites built
• 90+ accessibility scores achieved
• Custom interactive components and animations
• Seamless CMS integrations

I'd love to learn more about your specific project needs. Would a 30-minute call work to discuss your goals?

Best,
Thom
        `;
    }

    // Send follow-up email
    await resend.emails.send({
      from: 'Thom Griggs <onboarding@resend.dev>',
      to: [email],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="white-space: pre-line; line-height: 1.6; color: #222222;">
            ${followUpMessage}
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: #e1eaee; border-radius: 8px;">
            <p style="margin: 0 0 10px 0;"><strong>Ready to get started?</strong></p>
            <p style="margin: 0 0 15px 0;">
              <a href="https://calendly.com/thomgriggs/30min" style="color: #646856; text-decoration: none; background: #222222; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block;">
                Schedule a Call
              </a>
            </p>
            <p style="margin: 0; font-size: 14px; color: #787878;">
              Or reply to this email with any questions you have.
            </p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #222222; color: white; border-radius: 8px; text-align: center;">
            <p style="margin: 0;"><strong>Thom Griggs</strong></p>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #e1eaee;">Front-End Developer & Creative Technologist</p>
            <p style="margin: 5px 0 0 0; font-size: 14px;"><a href="https://thomgriggs.vercel.app" style="color: #646856;">thomgriggs.vercel.app</a></p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Follow-up email sent' },
      { status: 200 }
    );

  } catch {
    // AI follow-up error
    return NextResponse.json(
      { error: 'Failed to send follow-up email' },
      { status: 500 }
    );
  }
}
