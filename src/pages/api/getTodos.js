import { table, minifyRecords } from './utils/Airtable';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
    try {
        const { user } = getSession(req, res);
        const records = await table.select({}).firstPage();
        const minifiedRecords = minifyRecords(records);
        res.statusCode = 200;
        res.json(minifiedRecords);
    } catch (err) {
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
});