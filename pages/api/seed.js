import User from '../../models/User';
import data from '../../utils/data';
import db from '../../utils/db';

// handler özel bir isimdir. burası bir api endpointi olacak.
const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();

  // dizideki alanlarla veritabanındaki alanlar birbirini karşılarsa diziyi çoklu olarak veritabanına ekler
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({
    message: 'seed is ready',
  });
};

export default handler;
