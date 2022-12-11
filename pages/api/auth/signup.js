import User from '../../../models/User';
import db from '../../../utils/db';
import bcrypt from 'bcryptjs';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { name, email, password } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !name ||
    name.trim() === '' ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: 'Invalid input - password should be at least 7 characters long.',
    });
    return;
  }

  await db.connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(422).json({
      message: 'User already exists.',
    });

    await db.disconnect();
    return;
  }

  const hashPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashPassword,
    isAdmin: false,
  });

  await user.save();

  await db.disconnect();

  res.status(201).json({
    message: 'Created user!',
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}

export default handler;
