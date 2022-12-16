# Think && Dev Hackathon

## Prueba de concepto de un minecraft decentralizado

Objetivos:
- Motor grafico en threejs, corre sobre el browser sin validaciones
- Mundo infito deterministo, para estp simplemente harcodeamos la semilla del algoritmo de generacion
- Cada usuario puede realizar modificaciones solo en su rectangulo, cada rectangulo es un nft de 30 cubos por 30 cubos y 60
 cubos de altura
- Un servicio de socketio sirve para dar una sensacion de realtime
- La coneccion al socket io es a travez de una firma
- La persitencia de los bloques se hace a travez de un sqlite implementado en cartesi

## Trabajo realizado

Dado el tiempo limitado minificamos el alcance para poder lograr una prueba de concepto, tomamos una demo sencilla single player y empezamos a iterar sobre ella, preparamos las lands y el servicio de socket io.

## Demo time
En este poc se podra conectarse usando metamask, interactuar con el mundo, crear bloques y ver bloques de otros jugadores

[http://34.67.45.107](http://34.67.45.107)
