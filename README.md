# Think & Dev Hackathon
<center>
 <img src="/Screenshot%202022-12-16%20at%2016.19.22.png" alt="Screenshot #1" style="width:400px;"/>
 <img src="/Screenshot%202022-12-16%20at%2016.20.01.png" alt="Screenshot #2" style="width:400px;"/>
</center>


## Prueba de concepto de un minecraft decentralizado

**Tecnologias:**
- Threejs
- Socket.io
- EVM solidity
- Cartesi

**Objetivos:**
- Motor grafico en [threejs](https://threejs.org/), corre sobre el browser sin validaciones.
- Mundo infito deterministico, para esto simplemente harcodeamos la semilla (seed) del algoritmo de generacion del escenario.
- Cada usuario puede realizar modificaciones solo en su rectangulo o parcela, cada rectangulo o parcela es un nft de 30 cubos por 30 cubos y 60
 cubos de altura
- Usamos [socketio](https://socket.io/) para dar la sensacion de realtime (comunicacion peer to peer entre usuarios)
- La conexion al socket io es a travez de una firma desde la wallet de cada usuario
- La persitencia de los bloques se hace a travez de un sqlite implementado en cartesi

## Trabajo realizado

Dado el tiempo limitado minificamos el alcance para poder lograr una prueba de concepto, tomamos una demo sencilla single player y empezamos a iterar sobre ella, preparamos las lands y el servicio de socket io.

- Contrato de lands [nft-lands](https://github.com/nicobevilacqua/think-dev/tree/master/nft-lands) [`0xab33f99f641d7085549e3816c3e2ba0299c1948a`](https://goerli.etherscan.io/address/0xab33f99f641d7085549e3816c3e2ba0299c1948a#code) [Test](https://github.com/nicobevilacqua/think-dev/blob/master/nft-lands/test/Lands.t.sol#L7)
- Server [socket.io](https://github.com/nicobevilacqua/think-dev/blob/master/server/index.js)
- Client [motor threejs](https://github.com/nicobevilacqua/think-dev/tree/master/client/src)
- Implementacion de [sqlite para persistencia de bloques con cartesi](https://github.com/nicobevilacqua/think-dev/tree/master/sqlite)

## Lands

Cada land tiene el eje x,y,z donde comienza, como siempre tienen las mismas dimensiones con una sola coordenada se puede almacenar, el id principal con el que se inserta en el sqlite de Cartesi es el hash `keccak256(x,y,z)`
El socket io que hace de facilitador para mantener la impresion de realtime es el que se encargar de mandar en baches las modificaciones de los diferentes usuarios a Cartesi.

## Demo time
En este poc se podra conectarse usando metamask, interactuar con el mundo, crear bloques y ver bloques de otros jugadores

[http://34.67.45.107](http://34.67.45.107)

- [x] Motor grafico, corre sobre el browser sin validaciones.
- [x] Mundo infito deterministico
- [x] Cada usuario puede realizar modificaciones (para la demo se cualquiera puede hacer cualquier cosa)
- [x] Multiplayer, varios usuarios pueden editar el mismo mundo, pero no esta la persistencia en **Cartesi** usando sqlite

