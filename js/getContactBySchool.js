document.getElementById('school-select').addEventListener('change', function (e) {
    const school = e.target.value;

    const contacts = {};

    const contactResult = document.getElementById('contact-result-tbody');
    const nbContactDiv = document.getElementById('school-nb-result');

    contactResult.innerHTML = '';

    const dynamodb = new AWS.DynamoDB();

    const contactsRetrievedEvent = new Event('contactsRetrieved');

    const params = {
        TableName: 'contacts',
        IndexName: 'title-index',
        KeyConditionExpression: 'title = :title',
        ExpressionAttributeValues: {
            ':title': { S: school },
        }
    };

    dynamodb.query(params, function (err, data) {
        if (err) {
            console.error('Error querying DynamoDB:', err);
            return;
        }

        data.Items.forEach(function (item) {
            const contactEmail = item.email.S;

            if (!contacts[contactEmail]) {
                contacts[contactEmail] = true;

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.title.S}</td>
                    <td>${item.name.S}</td>
                    <td>${item.address.S}</td>
                    <td>${item.department.S}</td>
                    <td>${item.country.S}</td>
                    <td>${item.tel.S}</td>
                    <td>${item.email.S}</td>
                    <td></td>
                `;
                contactResult.appendChild(tr);
            }
        });

        nbContactDiv.textContent = 'Nombre de contact : ' + Object.keys(contacts).length;

        document.dispatchEvent(contactsRetrievedEvent);
    });
});
