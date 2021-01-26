### Create docker:
* docker build -t aero-mysql .
* docker run -d --name aero-mysql-container -p 5566:3306 aero-mysql

### Run/stop docker container:
* docker start aero-mysql-container
* docker stop aero-mysql-container