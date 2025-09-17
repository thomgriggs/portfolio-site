import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, project, message, budget, timeline } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email to you
    const emailToYou = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['thomgriggs@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #222222;">New Contact Form Submission</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #646856; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${project ? `<p><strong>Project Type:</strong> ${project}</p>` : ''}
            ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
            ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
          </div>
          
          <div style="background: #e1eaee; padding: 20px; border-radius: 8px;">
            <h3 style="color: #646856; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #222222; color: white; border-radius: 8px;">
            <p style="margin: 0;"><strong>Next Steps:</strong></p>
            <p style="margin: 5px 0 0 0;">1. Reply directly to this email to respond to ${email}</p>
            <p style="margin: 5px 0 0 0;">2. Or book a call: <a href="https://calendly.com/thomgriggs/30min" style="color: #646856;">Schedule here</a></p>
          </div>
        </div>
      `,
    });

    // Trigger AI follow-up (send after 24 hours)
    setTimeout(async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/ai-followup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name,
            projectType: project,
            originalMessage: message
          })
        });
      } catch {
        // AI follow-up error
      }
    }, 24 * 60 * 60 * 1000); // 24 hours

    // Send auto-reply to the person who submitted the form
    await resend.emails.send({
      from: 'Thom Griggs <onboarding@resend.dev>',
      to: [email],
      subject: 'Thanks for reaching out! - Thom Griggs',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #222222;">Thanks for reaching out, ${name}!</h2>
          
          <p>I received your message and will get back to you within 24 hours. In the meantime, here are some helpful links:</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #646856; margin-top: 0;">Quick Links</h3>
            <p><a href="https://thomgriggs.vercel.app/work" style="color: #646856;">View My Work</a> - See examples of my projects</p>
            <p><a href="https://thomgriggs.vercel.app/email-design" style="color: #646856;">Email Design Samples</a> - Check out my email templates</p>
            <p><a href="https://calendly.com/thomgriggs/30min" style="color: #646856;">Book a Call</a> - Schedule time to chat directly</p>
          </div>
          
          <div style="background: #e1eaee; padding: 20px; border-radius: 8px;">
            <h3 style="color: #646856; margin-top: 0;">What to Expect</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Response within 24 hours</li>
              <li>Free initial consultation</li>
              <li>Detailed project proposal</li>
              <li>Clear timeline and pricing</li>
            </ul>
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
      { 
        success: true, 
        message: 'Message sent successfully!',
        emailId: emailToYou.data?.id 
      },
      { status: 200 }
    );

  } catch {
    // Contact form error
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
