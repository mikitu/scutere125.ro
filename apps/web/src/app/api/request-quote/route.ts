import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { name, email, phone, scooter, message, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
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
    const strapiResponse = await fetch(`${STRAPI_URL}/api/quote-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          name,
          email,
          phone,
          scooter: scooter || null,
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
      throw new Error('Failed to save quote request to database');
    }

    const savedRequest = await strapiResponse.json();
    const requestId = savedRequest.data.id;

    // Send email notification
    let emailSent = false;
    let emailSentAt = null;

    try {
      await resend.emails.send({
        from: 'Scutere125.ro <contact@scutere125.ro>',
        to: ['contact@scutere125.ro'],
        subject: `🚀 Solicitare Ofertă Nouă de la ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #e63946;">🚀 Solicitare Ofertă Nouă - Scutere125.ro</h2>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Detalii Client:</h3>
              <p><strong>Nume:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>
              ${scooter ? `<p><strong>Scuter de interes:</strong> <span style="color: #e63946; font-weight: bold;">${scooter}</span></p>` : '<p><em>Nu a selectat un model specific</em></p>'}
            </div>

            ${message ? `
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #e63946; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Ce îl interesează:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            ` : ''}

            <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f4a261;">
              <p style="margin: 0; color: #856404;">
                <strong>⚡ Acțiune necesară:</strong> Contactează clientul cât mai curând pentru a-i oferi o ofertă personalizată!
              </p>
            </div>

            <div style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p><strong>Informații tehnice:</strong></p>
              <p>IP: ${ipAddress}</p>
              <p>User Agent: ${userAgent}</p>
              <p>Data: ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}</p>
              <p>ID Solicitare: ${requestId}</p>
            </div>
          </div>
        `,
      });

      emailSent = true;
      emailSentAt = new Date().toISOString();

      // Update Strapi record with email status
      await fetch(`${STRAPI_URL}/api/quote-requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            emailSent: true,
            emailSentAt,
          },
        }),
      });

      console.log('Quote request saved and email sent:', requestId);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails, request is already saved
    }

    return NextResponse.json({
      success: true,
      message: 'Solicitarea ta a fost trimisă cu succes!',
    });
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la procesarea solicitării. Te rugăm să încerci din nou.' },
      { status: 500 }
    );
  }
}

