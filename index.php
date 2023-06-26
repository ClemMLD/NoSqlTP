<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Exemple DynamoDB</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body>
<div class="container">
    <h1 class="mt-5">Exemple DynamoDB</h1>

    <div class="mt-5">
        <div id="info">Chargement en cours...</div>

        <div class="form-group">
            <label for="school-select">Sélectionnez une école :</label>
            <select id="school-select" class="form-control" disabled>
                <option value="">Sélectionnez une école</option>
            </select>
        </div>

        <table id="table" class="table mt-3">
            <thead>
            <tr id="tr">
                <th>Titre</th>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Département</th>
                <th>Pays</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th></th>
            </tr>
            </thead>
            <tbody id="contact-result-tbody">
            <tr>
                <td colspan="8" class="text-center">Le sélecteur s'active quand tout est fin prêt</td>
            </tr>
            </tbody>
        </table>

        <div id="school-nb-result"></div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="js/gestionDB.js" type="module"></script>
<script src="https://sdk.amazonaws.com/js/aws-sdk-2.7.16.min.js"></script>
</body>
</html>
