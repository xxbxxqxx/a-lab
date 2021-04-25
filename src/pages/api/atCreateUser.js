import { table, minifyRecords } from './utils/Airtable';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
    const { user } = getSession(req, res);
    const profile = req.body;
    try {

        const createdRecords = await table.create([
            { fields: {
                uid: user.sub,
                email: profile.email,
                description: profile.description,
            } },
        ]);

        const createdRecord = {
            id: createdRecords[0].id,
            fields: createdRecords[0].fields,
            //id: user.sub
        };
        res.statusCode = 200;
        res.json(createdRecord);
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
});