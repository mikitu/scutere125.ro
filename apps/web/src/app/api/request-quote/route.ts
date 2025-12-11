import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, scooter, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Implement email sending logic
    // For now, we'll just log the data and return success
    console.log('Quote request received:', {
      name,
      email,
      phone,
      scooter,
      message,
      timestamp: new Date().toISOString(),
    });

    // In production, you would send an email here using a service like:
    // - Resend
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES
    
    // Example email content:
    const emailContent = `
Solicitare Ofertă Nouă - Scutere125.ro

Detalii Client:
- Nume: ${name}
- Email: ${email}
- Telefon: ${phone}
${scooter ? `- Scuter de interes: ${scooter}` : ''}

Mesaj:
${message}

---
Trimis la: ${new Date().toLocaleString('ro-RO')}
    `.trim();

    console.log('Email content:', emailContent);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      { success: true, message: 'Quote request received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

