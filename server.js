const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load .env variables (for local development)

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Nodemailer Transport Configuration (SECURE)
const transporter = nodemailer.createTransport({
<<<<<<< HEAD
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // from .env or Render env
    pass: process.env.EMAIL_PASS  // from .env or Render env
  }
=======
    service: 'gmail',
    auth: {
         user: process.env.EMAIL_USER,      // your Gmail
        pass: process.env.EMAIL_PASS // your App password
    }
>>>>>>> 43ca54992dd46c6909cddc50124153b6f2352f51
});

// ✅ Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, lastname, email, message } = req.body;

  if (!name || !lastname || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Contact Form Submission',
    text: `
You received a new message from your portfolio website:

Name: ${name} ${lastname}
Email: ${email}
Message:
${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Email sending failed:', err.message);
    res.status(500).json({ error: 'Failed to send email.', details: err.message });
  }
});

// ✅ Fallback: Serve index.html for any unknown routes (SPA behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
