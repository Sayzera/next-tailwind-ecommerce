import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  // id = folder name
  const product = await Product.findOne({ slug: req.query.id }).lean();
  await db.disconnect();

  res.send(product);
};

export default handler;
