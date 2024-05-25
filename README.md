# lean_tech_challenge

## 1. Resolución Caso

La empresa Lean Factory requiere un sistema de facturación electrónica para cada uno de sus puntos de venta ubicados en Colombia (más de 1.000 puntos de venta). En cada punto de venta el sistema debe capturar la información de la compra y generar una factura física para el cliente en ese instante. También se debe generar un documento electrónico de dicha debidamente firmado y estampado para asegurar la integridad y autenticidad del mismo. Por último, este documento debe ser almacenado de tal manera que se pueda acceder a él en el futuro de manera fácil y segura.

- Problema a resolver:
El problema a resolver consiste en entregarle la copia física a la persona de inmediato (máximo 1
minuto de espera) pero se debe asegurar que en algún momento del tiempo se genere y conserve
la factura electrónica debidamente firmada y estampada.

- Restricciones y condiciones:
    1. Para que los documentos sean firmados/estampados digitalmente, se debe consumir un servicio que ya existe en un REST api, este puede tomar varios minutos (Entre 7 y 10 minutos). Una vez se realiza este proceso, se puede almacenar la factura. Suponga que ya existe un componente que hace firma y estampa, sólo debe ser consumido.
    2. Cuando un cliente se acerca a un punto de venta para adquirir un producto o servicio, requiere una copia inmediata física de la factura, pero la evidencia electrónica final de la misma, será la información de la factura en un XML, que debe estar debidamente firmada/estampada.
    3. Se debe asegurar alta disponibilidad del sistema 24/7.
    4. Se debe tener en cuenta el nivel transaccional que tendrá la aplicación. Más de 1.000 puntos de venta, cada uno emitiendo un volumen promedio de 1.000 facturas durante el día.
    5. Finalmente debe tomar en cuenta la respuesta ante fallos, ¿qué pasa si en el proceso de firma/estampa se presenta un problema/error y la factura no puede ser emitida? Debe enunciar un mecanismo para respuesta ante fallos.


Diseñe un sistema que resuelva el problema y cumpla con todas las restricciones dadas. Debe
contar con un diagrama del mismo y texto explicativo del funcionamiento. No debe entrar en
detalles técnicos de lenguaje o tecnologías, pero se espera que haga uso de conceptos, patrones o
principios de diseño e incluso estilos arquitecturales si lo desea.

Tip: Para que pueda enfocar mejor su solución, tenga en cuenta que la idea es entregar de
inmediato la copia física al cliente, pero asegurarse que en algún momento de tiempo se genere y
persista la factura electrónica debidamente firmada/estampada.



## 2. Implementación de caso

Desarrollar una aplicación en TypeScript que controle el movimiento de un vehículo en una matriz,
respetando comandos de desplazamiento y límites de la matriz.

- Descripción:
    1. El vehículo se puede mover en 4 direcciones. Norte (N), Sur(S), Este (E), Oeste(O). Y en cada dirección puede avanzar/desplazar un número determinado de pasos.
    2. El vehículo se desplazará en una superficie representada por una matriz de n x m casillas. Donde n representa el número de filas y m el número de columnas.
    3. El vehículo siempre debe iniciar su recorrido desde la parte inferior izquierda de la matriz, o punto 0,0.
    4. El vehículo no debe salir de los límites de la superficie. Por lo tanto, si la ejecución de un comando hace que salga de los límites, debe parar su desplazamiento e informar que no puede continuar con el mensaje. “Se ha detenido el avance por salir de los límites”
    5. Los comandos sobre el vehículo serán en formato <Desplazamiento>,<Dirección>. Por lo tanto si deseamos que el vehículo se desplace 10 pasos en dirección norte se debe enviar el comando 10,N
    6. Siempre que el vehículo se desplace en alguna dirección, deberá informar su posición final de la forma. (fila, columna) por lo tanto si el vehículo luego de un desplazamiento quedó en la fila 0 y columna 5, la posición a mostrar deberá ser (0,5)
    7. **Opcional**: El vehículo deberá estar en la capacidad de procesar una serie o lista de comandos separados por el signo ; (punto y coma). Por ejemplo, si se quiere que el vehículo avance 5 pasos al Este, 2 pasos al Norte y 3 pasos al sur, la serie será de la forma: 5,E;2,N;3,S
    8. **Opcional**: Crear un comando por consola que liste el historial de todos los comandos ejecutados previamente.

- Objetivos del problema:
Deberá desarrollar una aplicación TypeScript por consola que cumpla con las condiciones del problema y realice lo siguiente:

    1. Por consola configurar la superficie de desplazamiento.
    2. Luego de configurada la superficie, por consola enviar un comando o una serie de comandos, respetando el formato especificado.
    3. Cada vez que se avance, se deberá mostrar por consola el comando aplicado, y el punto final luego de cada desplazamiento.

- Entregables:
    1. Implementación de la solución en TypeScript. Puede desarrollar la solución utilizando un framework.
    2. Subir la solución en un repositorio de Github, recordando subir a GitHub, GitLab, u otro.


- Bonus: 
    1. Funcionalidades que mejoren la experiencia gráfica y facilidad para el usuario.
    2. Patrones o principios de programación utilizados y su beneficio.