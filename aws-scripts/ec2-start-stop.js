const AWS = require('aws-sdk');
exports.handler = (event, context, callback) => {
    const ec2 = new AWS.EC2({ region: event.instanceRegion });

    if (event.Action == 'START') {
        event.instanceId.forEach((id) => {
            ec2.startInstances({ InstanceIds: [id] })
                .promise()
                .then(() =>
                    callback(null, `Successfully Started ${id} EC2 Instance`)
                )
                .catch((err) => callback(err));
        });
    } else if (event.Action == 'STOP') {
        event.instanceId.forEach((id) => {
            ec2.stopInstances({ InstanceIds: [id] })
                .promise()
                .then(() =>
                    callback(null, `Successfully Stopped ${id} EC2 Instance`)
                )
                .catch((err) => callback(err));
        });
    } else {
        callback('Invalid Action provided', null);
    }
};
