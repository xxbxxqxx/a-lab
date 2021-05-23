import aws from 'aws-sdk';

export default async (req, res) => {
  aws.config.update({
    accessKeyId: process.env.AWS_R_ACCESS_KEY,
    secretAccessKey: process.env.AWS_R_SECRET_KEY,
    region: process.env.AWS_R_REGION,
    signatureVersion: 'v4',
  });

  const s3 = new aws.S3();
  var params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: req.query.file,
    Expires: 180, // seconds
  };

  s3.getSignedUrl(
    'getObject',
    params,
    (err, url) => {
      if (err) {
        res.json({ msg: "Cloudn't get URL...!" });
      } else {
        res.json({ msg: url });;
      }
    }
  )
}