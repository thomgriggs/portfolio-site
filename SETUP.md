# Portfolio Site Setup Guide

## Environment Variables

Create a `.env.local` file in the `apps/site` directory with the following variables:

```bash
# Resend API Key for email sending
RESEND_API_KEY=re_your_api_key_here

# Site URL for email links (update when deployed)
NEXT_PUBLIC_SITE_URL=https://thomgriggs.vercel.app

# Sanity CMS (if using)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## Required Services Setup

### 1. Resend (Email Service)
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env.local` file

### 2. Calendly (Booking)
1. Go to [calendly.com](https://calendly.com)
2. Create a free account
3. Set up a 30-minute meeting type
4. Update the username in the code if different from "thomgriggs"

### 3. Vercel Analytics (Optional)
- Automatically enabled when deployed to Vercel
- No additional setup required

## Features Included

✅ **Contact Form** - Sends emails to you and auto-replies to visitors
✅ **AI Follow-up** - Automated follow-up emails based on project type
✅ **Calendly Integration** - Direct booking from multiple pages
✅ **Analytics** - Vercel Analytics for visitor tracking
✅ **Responsive Design** - Works on all devices
✅ **SEO Optimized** - Meta tags, sitemap, robots.txt
✅ **Brand Colors** - Applied from your old site design

## Deployment

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Testing

- Test contact form locally
- Verify email delivery
- Check Calendly integration
- Test on mobile devices

## Cost Breakdown

- **Vercel**: Free (hobby plan)
- **Resend**: Free (3,000 emails/month)
- **Calendly**: Free (1 event type)
- **Total**: $0/month

## Next Steps

1. Set up Resend account
2. Add environment variables
3. Test locally
4. Deploy to Vercel
5. Start using for job applications!
