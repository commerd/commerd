import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, recaptchaToken } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token (using regular reCAPTCHA v3)
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      );
    }

    // Get access token using service account
    const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}');
    
    // Create JWT for service account authentication
    const jwt = require('jsonwebtoken');
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: serviceAccount.client_email,
      scope: 'https://www.googleapis.com/auth/cloud-platform',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };
    
    const token = jwt.sign(payload, serviceAccount.private_key, { algorithm: 'RS256' });
    
    // Get access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token,
      }),
    });
    
    const { access_token } = await tokenResponse.json();
    
    // Use Enterprise reCAPTCHA assessment endpoint
    const projectId = 'golden-shine-471813-t7';
    const recaptchaResponse = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          event: {
            token: recaptchaToken,
            siteKey: '6LcyvMUrAAAAANTt4qju8lXOVvM4WPoO8eT8xB5v',
            userAgent: request.headers.get('user-agent') || '',
            userIpAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
            expectedAction: 'CONTACT_FORM',
          },
        }),
      }
    );

    const recaptchaResult = await recaptchaResponse.json();

    // Check if token is valid and score is acceptable
    if (!recaptchaResult.tokenProperties?.valid || 
        (recaptchaResult.riskAnalysis?.score && recaptchaResult.riskAnalysis.score < 0.5)) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter using nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@commerd.com',
      to: 'contact@commerd.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This message was sent from the contact form on commerd.com</em></p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
        
        This message was sent from the contact form on commerd.com
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
