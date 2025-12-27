import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage for Vercel/Serverless environment
let inMemoryBookings = [];
let inMemoryMessages = [];

// Ensure data directory exists (only if not in serverless environment)
const dataDir = path.join(__dirname, 'data');
if (!process.env.VERCEL && !fs.existsSync(dataDir)) {
    try {
        fs.mkdirSync(dataDir);
    } catch (err) {
        console.warn('Could not create data directory, falling back to in-memory storage');
    }
}

const bookingsFile = path.join(dataDir, 'bookings.json');
const messagesFile = path.join(dataDir, 'messages.json');

// Helper to read data
const readData = (filePath, inMemoryData) => {
    if (process.env.VERCEL) return inMemoryData;
    
    if (!fs.existsSync(filePath)) {
        return [];
    }
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Helper to write data
const writeData = (filePath, data, updateInMemory) => {
    if (process.env.VERCEL) {
        updateInMemory(data);
        return;
    }
    
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.warn('Write failed, updating in-memory only');
        updateInMemory(data);
    }
};

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', environment: process.env.VERCEL ? 'vercel' : 'local' });
});

app.post('/api/bookings', (req, res) => {
    const booking = req.body;
    
    if (!booking.service || !booking.date || !booking.name || !booking.email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const bookings = readData(bookingsFile, inMemoryBookings);
    const newBooking = {
        id: Date.now(),
        ...booking,
        createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    writeData(bookingsFile, bookings, (data) => { inMemoryBookings = data; });

    console.log('New booking received:', newBooking);
    res.status(201).json({ message: 'Booking submitted successfully', booking: newBooking });
});

app.post('/api/contact', (req, res) => {
    const message = req.body;

    if (!message.name || !message.email || !message.message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const messages = readData(messagesFile, inMemoryMessages);
    const newMessage = {
        id: Date.now(),
        ...message,
        createdAt: new Date().toISOString()
    };

    messages.push(newMessage);
    writeData(messagesFile, messages, (data) => { inMemoryMessages = data; });

    console.log('New message received:', newMessage);
    res.status(201).json({ message: 'Message sent successfully', messageData: newMessage });
});

if (process.env.VERCEL) {
    // Export for Vercel
    app.listen = () => {}; // Disable listen in Vercel
} else {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;
