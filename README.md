# e-commerce Rules And Integration

## Prerequisites

* `node`
* `docker`

## Running locally
Run all docker-compose files


- Run kafka
```
    docker-compose up -d --build
```

- Run orders-api
```
    cd orders-api
    docker-compose up -d --build
```

- Run delivery-service
```
    cd delivery-service
    docker-compose up -d --build
```
