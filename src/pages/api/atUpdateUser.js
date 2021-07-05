import { table, getMinifiedRecord } from './utils/Airtable';

export default async (req, res) => {
    //const { id, fields } = req.body;
    const record = req.body;
    try {
        //const updatedRecords = await table.update([{ id, fields }]);
        const updatedRecords = await table.update(record.id, record.fields, {typecast: true});
        res.statusCode = 200;
        res.json(getMinifiedRecord(updatedRecords));
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
};