# GET LAMBDA


## Las tecnologías usadas son las siguientes

- Serverless Framework: Framework para nodejs
- Typescript: lenguaje tipado para javascript
- Logger Pino: Librería para los logs
- Jest: Librería para los unit test

## Crear la base de datos en el motor MySQL
Ejecutar el script database.sql que se encuentra en la raiz del proyecto

## Documentación en swagger 
Se una pequeña documentación en swagger

## Curl para la consulta
```
curl --location 'http://localhost:3003/dev/sala-cine/75'
```

## Comandos de ayuda para el proyecto
#### Iniciar la app en modo local
```
npm run start
```

#### Ejecutar los Unit Test
```
npm run test
```

#### Ejecutar lint para detectar código con potencial a generar error
```
npm run lint

npm run lint:fix
```

#### Ejecutar format para detectar código con potencial a generar error
```
npm run format

npm run format:fix
```
