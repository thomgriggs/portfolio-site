import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Thomas Griggs - Senior Frontend Developer';
    const description = searchParams.get('description') || 'Building accessible, performant web experiences';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0b0b0c',
            backgroundImage: 'linear-gradient(135deg, #0b0b0c 0%, #1a1a1c 100%)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              textAlign: 'center',
              maxWidth: '1000px',
            }}
          >
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: '#eaeaea',
                marginBottom: '20px',
                lineHeight: 1.1,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '32px',
                color: '#9aa0a6',
                marginBottom: '40px',
                lineHeight: 1.4,
              }}
            >
              {description}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                fontSize: '24px',
                color: '#7bd7ff',
              }}
            >
              <span>React • Next.js • TypeScript</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: unknown) {
    console.error('Failed to generate OG image:', e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
