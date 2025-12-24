import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const bookingsFile = path.join(dataDir, 'bookings.json');
const messagesFile = path.join(dataDir, 'messages.json');

// Helper to read data
const readData = (filePath) => {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    try {
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Helper to write data
const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.post('/api/bookings', (req, res) => {
    const booking = req.body;
    
    if (!booking.service || !booking.date || !booking.name || !booking.email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const bookings = readData(bookingsFile);
    const newBooking = {
        id: Date.now(),
        ...booking,
        createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    writeData(bookingsFile, bookings);

    console.log('New booking received:', newBooking);
    res.status(201).json({ message: 'Booking submitted successfully', booking: newBooking });
});

app.post('/api/contact', (req, res) => {
    const message = req.body;

    if (!message.name || !message.email || !message.message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const messages = readData(messagesFile);
    const newMessage = {
        id: Date.now(),
        ...message,
        createdAt: new Date().toISOString()
    };

    messages.push(newMessage);
    writeData(messagesFile, messages);

    console.log('New message received:', newMessage);
    res.status(201).json({ message: 'Message sent successfully', messageData: newMessage });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
