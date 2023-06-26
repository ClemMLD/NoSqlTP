import "./createSchoolList.js";
import "./getContactBySchool.js";

AWS.config.update({
    region: "us-east-1",
    endpoint: "http://localhost:8002",
    accessKeyId: "YOUR_ACCESS_KEY_ID",
    secretAccessKey: "YOUR_SECRET_ACCESS_KEY"
});

const dynamodb = new AWS.DynamoDB();

const describeTable = () => {
    const params = {
        TableName: 'contacts',
    };

    dynamodb.describeTable(params, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            document.dispatchEvent(new Event('dbCreated'));
        }
    });
};

describeTable();
