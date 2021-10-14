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

## Example 
Sending new order to api and verifying the produced result on delivery-service

* Post "localhost:3010/orders/new"
```json
    {
        "amount":10,
        "destiny": {
            "state":"SP",
            "city":"Jaguariúna",
            "address":"R. José Alves Guedes, 1003 - Jardim Sonia"
        },
        "item":"Bola de futebol - nike, modelo 123"
    }
```

* Verify the result on delivery-service container
