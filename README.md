# Viaje Perfecto

Viaje Perfecto aplicación es una solución integral para la gestión de información de viajes. Permite a los usuarios administrar eficientemente una amplia gama de datos relacionados con sus viajes, incluyendo destinos, recibos, contratos de alquiler de autos, notas y más, todo desde una plataforma centralizada. Con un enfoque en la organización y la facilidad de uso, nuestra aplicación ayuda a los viajeros a mantenerse organizados y a gestionar todos los aspectos de sus viajes de manera efectiva. Ya sea planificando un viaje de negocios o unas vacaciones familiares, nuestra aplicación es la herramienta perfecta para mantener todo bajo control y disfrutar de una experiencia de viaje sin estrés.

![logo de Viaje Perfecto](https://github.com/laautarolopez/viaje-perfecto/blob/main/public/images/logo.jpeg) 

Stack tecnológico:
- Node.js
- Next.js 14
- Tailwind
- TypeScript
- Vercel Postgres
- Vercel Blob

Casos de uso:

![image](https://github.com/laautarolopez/viaje-perfecto/assets/73248047/2e7e96cd-6c85-43af-ae92-ae9d3df3c4e1)

Referencias:
- Verde: Nuevo caso de uso.
- Amarillo: Caso de uso modificado.
- Blanco: Caso de uso existente.
  
Como usuario quiero ver la informacion mas importante del proximo viaje.
- El usuario entra a la home.
- El sistema le muestra cual es su proximo viaje, cuantos dias le faltan para viajar, un calendario con las fechas y la duracion del viaje, una checklist con la informacion y recordatorios mas importande del mismo.

Como usuario  quiero ver la informacion de los vuelos relacionados al proximo viaje.
- El usuario entra a la home.
- El sistema le muestra el proximo viaje con su menu de navegacion.
- El usuario clickea en el boton de los vuelos.
- El sistema le muestra la pantalla de los vuelos y todas su respectiva informacion.

Como usuario quiero administrar los archivos mas importantes de cada vuelo relacionado al viaje.
- El usuario entra a la home.
- El sistema le muestra el proximo viaje con su menu de navegacion.
- El usuario navega hasta el vuelo deseado y clickea en agregragar, agregar o modificar archivo.
- El sistema agrega, modifica o elimina el archivo.


Diagrama de arquitectura:

![image](https://github.com/laautarolopez/viaje-perfecto/assets/73248047/ee2b0ae1-fa99-4eed-8e05-cb4888a7a945)

#Home
- Es la pagina principal donde muestra la informacion importante del proximo viaje y provee una forma de navegarlo. Es un server component, y al ser llamado
  fetchea la informacion necesaria, llamando a la funcion fetchNextTrip del services/trip, para poder hidratar la pagina y retornarla al cliente

#services/trip/fetchNextTrip
- Es el encargado de comunicarse de pedirle al enpoint de api/next-trip, para fetchear la informacion del proximo viaje del usuario y retornarla.

#api/next-trip
- Es la ruta de la api encargada de manejar las peticiones del proximo viaje del usuario dado, en este caso al ser un get, hace la query a la db del proximo viaje del usuario dado y lo retorna.

#db
- Recibe la query acerca viaje(trip) mas proximo a la fecha actual del usuario dado, lo busca y lo retorna.
