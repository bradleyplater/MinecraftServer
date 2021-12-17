const AWS = require('aws-sdk');
exports.handler = (event, context, callback) => {
    const ec2 = new AWS.EC2({ region: event.instanceRegion });
    event.instanceId.forEach((id) => {
        ec2.startInstances({ InstanceIds: [id] })
            .promise()
            .then(() =>
                callback(null, `Successfully Started ${id} EC2 Instance`)
            )
            .catch((err) => callback(err));
    });
};
