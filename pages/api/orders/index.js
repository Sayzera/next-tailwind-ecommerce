import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { user } = session;
  console.log('user', user);
  await db.connect();

  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });

  const order = await newOrder.save();

  await db.disconnect();

  return res.status(201).send(order);
};

export default handler;
