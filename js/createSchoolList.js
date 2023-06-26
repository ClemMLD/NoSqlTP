document.addEventListener('DOMContentLoaded', function () {

    AWS.config.update({
        region: 'us-east-1',
    });

    const dynamodb = new AWS.DynamoDB();

    const schools = [];

    const schoolListCreatedEvent = new Event('schoolListCreated');

    const params = {
        TableName: 'contacts',
        ProjectionExpression: 'title',
    };

    dynamodb.scan(params, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        data.Items.forEach(function (item) {
            const schoolName = item.title.S;

            if (!schools.includes(schoolName)) {
                schools.push(schoolName);

                const option = document.createElement('option');
                option.value = schoolName;
                option.textContent = schoolName;
                document.getElementById('school-select').appendChild(option);
            }
        });

        document.dispatchEvent(schoolListCreatedEvent);
    });
});

document.addEventListener('schoolListCreated', function () {
    document.getElementById('school-select').disabled = false;

    const infoP = document.getElementById('info');

    infoP.textContent = 'Choisissez une école :';
    infoP.classList.remove('text-danger');
    infoP.classList.add('text-success');
});
