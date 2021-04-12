import { table } from '../utils/Airtable';

const ownsRecord = (handler) =>
  async (req, res) => {
    const { user } = await auth0.getSession(req);

    const { id } = req.body;

    try {
      const existingRecord = await table.find(id);

      if (!existingRecord || user.sub !== existingRecord.fields.uid) {
        res.statusCode = 404;
        return res.json({ msg: 'Record not found' });
      }

      req.record = existingRecord;
      return handler(req, res);
    } catch (error) {
      console.error(err);
      res.statusCode = 500;
      return res.json({ msg: 'Something went wrong' });
    }
  };

export default ownsRecord;