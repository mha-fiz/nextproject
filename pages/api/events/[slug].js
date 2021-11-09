const { events } = require('./data.json');

export default (req, res) => {
  const eventDetail = events.filter(ev => ev.slug === req.query.slug);

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
  res.status(200).json(eventDetail);
};
