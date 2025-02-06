const express = require('express');
const path = require('path');
const QRCode = require('qrcode');
const app = express();
const port = process.env.PORT || 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Home route - Display the form for inputting phone number
app.get('/', (req, res) => {
  res.render('index');
});

// QR page route - Show the QR code based on the phone number
app.post('/generate-qr', (req, res) => {
  const { phoneNumber } = req.body;  // Assuming you handle body parsing for form submission
  const qrData = `https://wa.me/${phoneNumber}`; // QR Code will link to WhatsApp number
  QRCode.toDataURL(qrData, (err, url) => {
    if (err) {
      return res.status(500).send('Error generating QR code');
    }
    res.render('qrpage', { qrCodeUrl: url });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
