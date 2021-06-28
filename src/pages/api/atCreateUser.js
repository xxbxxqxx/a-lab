import { table, minifyRecords } from './utils/Airtable';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
    const { user } = getSession(req, res);
    const profile = req.body;
    try {

        const createdRecords = await table.create(profile);

        //const createdRecord = {
        //    //id: createdRecords[0].uid,
        //    id: createdRecords.uid,
        //    fields: createdRecords.fields,
        //    //id: user.sub
        //};
        res.statusCode = 200;
        res.json(createdRecords);
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
});