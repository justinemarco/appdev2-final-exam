const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const faker = require('faker');
const dotenv = require('dotenv');
const User = require('./models/User');
const Event = require('./models/Event');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany();
    await Event.deleteMany();
    console.log('Cleared existing users and events');

    const users = [];

    const hashedPassword = await bcrypt.hash('secret123', 10);

    for (let i = 0; i < 5; i++) {
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: hashedPassword
      });
      await user.save();
      users.push(user);
    }

    console.log(`Created ${users.length} users`);

    const events = [];

    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const event = new Event({
        title: faker.lorem.words(3),
        location: faker.address.city(),
        date: faker.date.future(),
        description: faker.lorem.sentences(2),
        userId: randomUser._id
      });

      await event.save();
      events.push(event);
    }

    console.log(`Created ${events.length} events`);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seed();
