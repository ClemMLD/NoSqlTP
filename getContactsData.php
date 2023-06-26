<?php
try {
    $sdk = new Sdk([
        'region' => 'us-east-1',
        'version' => 'latest',
    ]);
    $dynamodb = $sdk->createDynamoDb();

    $tableName = 'contacts';

    if (($handle = fopen('contacts.csv', 'r')) !== FALSE) {
        $contacts = [];

        fgetcsv($handle);

        while (($data = fgetcsv($handle)) !== FALSE) {
            $contacts[] = [
                'title' => $data[0],
                'name' => $data[1],
                'address' => $data[2],
                'realAddress' => $data[3],
                'department' => $data[4],
                'country' => $data[5],
                'tel' => $data[6],
                'email' => $data[7],
            ];
        }
        fclose($handle);

        if (empty($contacts)) {
            throw new Exception('No data found', 401);
        }

        foreach ($contacts as $contact) {
            $marshaler = new Marshaler();
            $item = $marshaler->marshalItem($contact);

            $params = [
                'TableName' => $tableName,
                'Item' => $item,
            ];

            $result = $dynamodb->putItem($params);
        }

        echo json_encode($contacts);

        http_response_code(200);
    } else {
        throw new Exception('Error while opening the file', 500);
    }
} catch (Exception $e) {
    http_response_code($e->getCode());
    echo $e->getMessage();
    return false;
}
?>
