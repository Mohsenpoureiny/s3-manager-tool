var AWS = require('aws-sdk');

var s3 = new AWS.S3({
    accessKeyId: '',
    secretAccessKey: '',
    endpoint: 'https://s3.ir-thr-at1.arvanstorage.com',
    s3ForcePathStyle: true, // needed with minio?
    signatureVersion: 'v4'
});

const bucketName = 'ropomoda-public-staticfiles-dev';


// 

var bucketParams = {
    Bucket: bucketName, /* required */
    MaxKeys: 5000,
};

s3.listObjects(bucketParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        var objects = [];
        for (var k in data['Contents']) {
            objects.push({ Key: data['Contents'][k].Key });
        }
        const options = {
            Bucket: bucketName,
            Delete: {
                Objects: objects,
                Quiet: false
            }
        };
        s3.deleteObjects(options, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);           // successful response
        });
    }
});
