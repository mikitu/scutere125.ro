import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Toate câmpurile obligatorii trebuie completate.' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'Verificarea reCAPTCHA este obligatorie.' },
        { status: 400 }
      );
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'Verificarea reCAPTCHA a eșuat. Te rugăm să încerci din nou.' },
        { status: 400 }
      );
    }

    // Get client info
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Save to Strapi
    const strapiResponse = await fetch(`${STRAPI_URL}/api/contact-messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          name,
          email,
          phone: phone || null,
          message,
          ipAddress,
          userAgent,
          emailSent: false,
        },
      }),
    });

    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      console.error('Strapi error:', errorData);
      throw new Error('Failed to save message to database');
    }

    const savedMessage = await strapiResponse.json();

    // TODO: Send email notification
    // You can integrate with Resend, SendGrid, or other email service here
    // For now, we just log it
    console.log('Contact message saved:', savedMessage.data.id);

    return NextResponse.json({
      success: true,
      message: 'Mesajul tău a fost trimis cu succes!',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la procesarea mesajului. Te rugăm să încerci din nou.' },
      { status: 500 }
    );
  }
}

