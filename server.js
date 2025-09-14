const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Seed initial contact data (for demonstration)
const seedContact = async () => {
    const count = await Contact.countDocuments();
    if (count === 0) {
        await Contact.create({
            name: 'Hari Hara Sai Kishan',
            email: 'hariharsaikishan.a23@iiits.in',
            phone: '+91 9119988388'
        });
        console.log('Contact data seeded');
    }
};
seedContact();

// API Endpoint to fetch contact details
app.get('/api/contact', async (req, res) => {
    try {
        const contact = await Contact.findOne();
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});