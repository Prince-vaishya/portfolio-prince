const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = 3000;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Contact API endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        // Email to the user (Prince)
        await transporter.sendMail({
            from: `"Prince Vaishya Portfolio" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: process.env.EMAIL_USER,
            subject: `New Message from ${name}: ${subject}`,
            text: `You have a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
            html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 40px 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; border-top: 4px solid #6c5ce7;">
            <div style="padding: 30px;">
              <h2 style="color: #2d3436; margin-top: 0; font-size: 24px;">New Contact Form Submission</h2>
              <p style="color: #636e72; font-size: 16px;">You received a new message from your portfolio website.</p>

              <div style="background-color: #f1f2f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0; color: #2d3436;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 0 0 10px 0; color: #2d3436;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #6c5ce7; text-decoration: none;">${email}</a></p>
                <p style="margin: 0 0 10px 0; color: #2d3436;"><strong>Subject:</strong> ${subject}</p>
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dfe6e9;">
                  <strong style="color: #2d3436;">Message:</strong>
                  <p style="color: #636e72; line-height: 1.6; white-space: pre-wrap; margin-top: 5px;">${message}</p>
                </div>
              </div>

              <p style="color: #b2bec3; font-size: 12px; text-align: center; margin-top: 30px;">This email was sent from your portfolio website contact form.</p>
            </div>
          </div>
        </div>
      `,
        });

        // Auto-reply to the sender
        await transporter.sendMail({
            from: `"Prince Vaishya" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `I've received your message! - ${subject}`,
            text: `Hi ${name},\n\nThanks for reaching out! I've received your message regarding "${subject}" and will get back to you as soon as possible.\n\nBest regards,\nPrince Vaishya`,
            html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5; padding: 40px 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.05);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Prince Vaishya</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Data Scientist & ML Enthusiast</p>
            </div>

            <!-- Body -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #2d3436; margin-top: 0; font-size: 22px;">Hello ${name},</h2>
              <p style="color: #636e72; line-height: 1.6; font-size: 16px;">Thanks for reaching out! I wanted to let you know that I've received your message regarding <strong>"${subject}"</strong>.</p>
              <p style="color: #636e72; line-height: 1.6; font-size: 16px;">I'm currently reviewing it and will get back to you as soon as possible. In the meantime, feel free to check out my latest projects on GitHub.</p>

              <div style="margin: 30px 0; text-align: center;">
                <a href="https://github.com/Prince-vaishya" style="background-color: #6c5ce7; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 30px; font-weight: 600; display: inline-block; transition: background-color 0.3s;">View My Work</a>
              </div>

              <hr style="border: none; border-top: 1px solid #dfe6e9; margin: 30px 0;">

              <!-- Social Links -->
              <div style="text-align: center;">
                <p style="color: #b2bec3; font-size: 14px; margin-bottom: 15px;">Connect with me:</p>
                <a href="https://www.linkedin.com/in/princevaishya/" style="text-decoration: none; margin: 0 10px;">
                  <img src="https://img.icons8.com/fluency/48/000000/linkedin.png" alt="LinkedIn" style="width: 24px; height: 24px; vertical-align: middle;">
                </a>
                <a href="https://github.com/Prince-vaishya" style="text-decoration: none; margin: 0 10px;">
                  <img src="https://img.icons8.com/fluency/48/000000/github.png" alt="GitHub" style="width: 24px; height: 24px; vertical-align: middle;">
                </a>
                <a href="https://x.com/PrinceNative911" style="text-decoration: none; margin: 0 10px;">
                  <img src="https://img.icons8.com/fluency/48/000000/twitter.png" alt="Twitter" style="width: 24px; height: 24px; vertical-align: middle;">
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #f1f1f1;">
              <p style="color: #b2bec3; font-size: 12px; margin: 0;">&copy; 2025 Prince Vaishya. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
        });

        return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error sending email: " + error.message });
    }
});

// Serve the index.html file at the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
