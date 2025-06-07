const Event = require('../models/Event');
const pug = require('pug');
const path = require('path');
const transporter = require('../config/nodemailer');

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('userId', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, location, date, description } = req.body;

    const event = new Event({
      title,
      location,
      date,
      description,
      userId: req.user._id 
    });

    await event.save();

    const html = pug.renderFile(
      path.join(__dirname, '../emails/eventCreated.pug'),
      {
        name: req.user.name,
        title: event.title,
        location: event.location,
        date: new Date(event.date).toLocaleString()
      }
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.user.email,
      subject: 'Your Event Has Been Created!',
      html
    });


    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user._id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    getAllEvents,
    createEvent,
    getMyEvents
};