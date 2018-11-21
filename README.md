# Distributed Computation Center

Software package intended for research teams, for distributed computations. Software at current version supports computations that has sequential nature. Software supports unlimited number of participants, that can request at anytime. All requests will be placed into queue, and executed in the order they arrived. From here can be inferred the kind of models that can be computed by this software package. That is, only models which has state at every given moment, and can be updated at any given step, regardless of requests waiting in queue. Nevertheless, this is the default behaviour expected from software, and there is freedom to design the application in a way, so it can be used for parallel and non sequential models. Sequential modeling is available off-the-shelf. At current version request supported only by HTTP protocol.

System provides logging available in server, where the software is running. All logs are collected through the most known logging stack that is [ELK](hhttps://www.elastic.co/elk-stack), hence, all logs are visualized by [Kibana](https://www.elastic.co/products/kibana). Logging is configurable and can be disabled. As ELK stack runs as separate micro-service, it can be used for storing any user generated data and visualized in Kibana. Software provides embedded module for writing data into this stack.

To have easy experience with environment we've wrapped the software into [Docker](https://www.docker.com/) containers, which is known enterprise container platform. This gives freedom to operate with any operating system without infrastructure lock-ins. All is needed for application to work is the Docker Community Edition. 

Requirements: [Docker Community Edition](https://www.docker.com/community-edition)

Install [Docker](https://www.docker.com/products/docker-engine#/download) version 17.05+

Install [Docker Compose](https://docs.docker.com/compose/install/) version 1.6.0+


To start the app run: `docker-compose up` in the folder `process-monitoring`.
After the process is finished run the following in the root folder: `docker-compose up`
To start process in background run: `docker-compose up -d`.

For testing the computation center in stand-alone mode download [Postman](https://www.getpostman.com/apps)

## Default Behavior

Computation center is up on 
```sh
    localhost:3000
```

Kibana is up on 
```sh
    localhost:5601
```

Elasticsearch is up on 
```sh
    localhost:9200
```

# Endpoints

## Default methods when extending from provided main class
```sh
    HTTP:GET /toJson returns json of the model
```
```sh
    HTTP:GET /export returns model as encrypted string
```
```sh
    HTTP:POST /fromJson recovers model from given json
```
```sh
    HTTP:POST /import recovers model from given encrypted string
```

# Docker Helper

List all docker containers 
```sh
    docker ps -a
```
Stop all docker containers 
```sh
    docker stop $(docker ps -aq)
```
Remove all docker containers
 
```sh
    docker rm $(docker ps -aq)
```
List all docker images

```sh
    docker images -a
```
Remove all docker images (images will be downloaded again on start)

```
    docker rmi $(docker images -q) [ --force ]
```
With exact Id

```
    docker rmi @id
```
```
    docker stop @id
```
