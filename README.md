# NoSqlTP
Student project with NoSQL databases

## Installation

### 1. Clone the repository
```bash
git clone git@github.com:ClemMLD/NoSqlTP.git
```

### 2. Move it to Apache server
```bash
sudo cp -r NoSqlTP/* /var/www/html
```

### 3. Install php (Linux)

Install php and run development server
```bash
sudo dpkg -l | grep php | tee packages.txt

sudo apt install apt-transport-https lsb-release ca-certificates wget -y
sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg 
sudo sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
sudo apt update

sudo apt install php8.2 php8.2-cli php8.2-{bz2,curl,mbstring,intl}

sudo apt install php8.2-fpm

sudo a2enconf php8.2-fpm

sudo apt install apt-transport-https lsb-release ca-certificates 
software-properties-common
sudo add-apt-repository ppa:ondrej/php # Press enter when prompted.
sudo apt update

sudo apt install php8.2 php8.2-cli php8.2-{curl,bz2,mbstring,intl}

sudo apt install libapache2-mod-php8.2
sudo a2enmod php8.2
sudo service apache2 restart

php -v
cd /var/www/html
php -S localhost:8001
# Test installation
```

### 4. Install DynamoDB
cd
Download [DynamoDB](https://s3.eu-central-1.amazonaws.com/dynamodb-local-frankfurt/dynamodb_local_latest.tar.gz)
```bash
tar .xf <dynamoDBFile>.tar.gz
```

### 5. Install and start Java Runtime Environment
Download [JRE](https://javadl.oracle.com/webapps/download/AutoDL?BundleId=248233_ce59cff5c23f4e2eaf4e778a117d4c5b)
Exctract and run it
```bash
tar -xf <jre_filename>.tar.gz
cd <jre_path>/bin
./java -Djava.library.path=../../DynamoDBLocal_lib -jar ../../DynamoDBLocal.jar -sharedDb -port 8002 -cors *
```

### 6. Install AWS cli
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### 7. Create table and fill it
```bash
cd /var/www/html
aws dynamodb create-table   --table-name contacts   --attribute-definitions AttributeName=title,AttributeType=S AttributeName=name,AttributeType=S   --key-schema AttributeName=name,KeyType=HASH   --provisioned-throughput ReadCapacityUnits=20000,WriteCapacityUnits=20000   --global-secondary-indexes 'IndexName=name-index,KeySchema=[{AttributeName=name,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=20000,WriteCapacityUnits=20000}'   --endpoint-url http://localhost:8002   --tags Key=allowDuplicates,Value=true

aws dynamodb batch-write-item --request-items file://contacts.json --endpoint-url http://localhost:8002
```

Now, you can [open](http://localhost:8001) the project in your browser


## Usage
- Select a school from the dropdown menu to retrieve and display contacts for that school.
- The contact details, including title, address, department, country, telephone, and email, will be displayed in a table.
- The count of contacts for the selected school will be shown.


