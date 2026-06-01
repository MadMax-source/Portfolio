import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, subject, message } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📩 ${subject}`,
      html: `
    <div style="
      max-width: 700px;
      margin: auto;
      font-family: Arial, sans-serif;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
    ">
      
      <div style="
        background: linear-gradient(135deg,#06b6d4,#3b82f6);
        padding: 30px;
        text-align: center;
      ">
        <h1 style="
          color:white;
          margin:0;
          font-size:28px;
        ">
          New Portfolio Contact
        </h1>
      </div>

      <div style="padding:30px;">
        
        <div style="
          background:#f8fafc;
          padding:20px;
          border-radius:10px;
          margin-bottom:20px;
        ">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>

        <h3 style="
          color:#111827;
          margin-bottom:10px;
        ">
          Message
        </h3>

        <div style="
          background:#f3f4f6;
          padding:20px;
          border-radius:10px;
          line-height:1.7;
          color:#374151;
        ">
          ${message.replace(/\n/g, '<br/>')}
        </div>

      </div>

      <div style="
        background:#111827;
        color:white;
        text-align:center;
        padding:15px;
      ">
        Sent from your portfolio website
      </div>

    </div>
  `,
    });

    return NextResponse.json({
      success: true,
      message: 'Email sent',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send email',
      },
      { status: 500 },
    );
  }
}
