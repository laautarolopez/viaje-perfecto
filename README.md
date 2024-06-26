# Viaje Perfecto

Viaje Perfecto aplicación es una solución integral para la gestión de información de viajes. Permite a los usuarios administrar eficientemente una amplia gama de datos relacionados con sus viajes, incluyendo destinos, recibos, contratos de alquiler de autos, notas y más, todo desde una plataforma centralizada. Con un enfoque en la organización y la facilidad de uso, nuestra aplicación ayuda a los viajeros a mantenerse organizados y a gestionar todos los aspectos de sus viajes de manera efectiva. Ya sea planificando un viaje de negocios o unas vacaciones familiares, nuestra aplicación es la herramienta perfecta para mantener todo bajo control y disfrutar de una experiencia de viaje sin estrés.

![logo de Viaje Perfecto](https://github.com/laautarolopez/viaje-perfecto/blob/main/public/images/logo.jpeg) 

Stack tecnológico:
- Node.js
- Next.js 14
- Tailwind
- TypeScript
- Postgres
- Vercel Blob

Casos de uso:

![image](https://github.com/laautarolopez/viaje-perfecto/assets/73248047/f8a5cc29-bf83-4c1a-b094-b82ac0a2bdb7)

Referencias:
- Verde: Nuevo caso de uso.
- Amarillo: Caso de uso modificado.
- Blanco: Caso de uso existente.
  
Como usuario quiero ver la informacion mas importante del proximo viaje.
- El usuario accede a su cuenta y entra a la home.
- El sistema le muestra cual es su proximo viaje, cuantos dias le faltan para viajar, un calendario con las fechas y la duracion del viaje, una checklist con la informacion y recordatorios mas importande del mismo.

Como usuario quiero administrar notas del próximo viaje.
- El usuario accede a su cuenta, entra a la home y navega hasta la checklist.
- El usuario agrega una nueva nota, cambia el estado de una existente o la elimina.
- El sistema agrega una nueva nota o camia el estado de una existente.

Como usuario quiero administrar viajes.
- El usuario accede a su cuenta y entra a la home.
- El usuario clickea en el boton para agregar o editar un viaje.
- El sistema le muestra un formulario de agregado o edicion de un viaje.
- El usuario completa o modifica el formulario.
- El sistema agrega o edita un viaje.

Como usuario quiero ver los futuros viajes programados.
- El usuario accede a su cuenta, entra a la home y navega hasta la seccion de futuros viajes.
- El sistema le muestra sus proximos viajes programados, con su respectivo nombre y fecha inicial.

Como usuario  quiero ver la informacion de los vuelos relacionados al proximo viaje.
- El usuario accede a su cuenta y entra a la home.
- El sistema le muestra el proximo viaje con su menu de navegacion.
- El usuario clickea en el boton de los vuelos.
- El sistema le muestra la pantalla de los vuelos y todas su respectiva informacion.

Como usuario quiero administrar los archivos mas importantes de cada vuelo relacionado al viaje.
- El usuario accede a su cuenta y entra a la home.
- El sistema le muestra el proximo viaje con su menu de navegacion.
- El usuario clickea en el boton de los vuelos.
- El sistema le muestra la pantalla de los vuelos y todas su respectiva informacion.
- El usuario navega hasta el vuelo deseado y clickea en agregar o borrar un archivo.
- El sistema agrega o elimina el archivo.

Como usuario quiero administrar vuelos de un viaje
- El usuario accede a su cuenta y entra a la home.
- El usuario navega hasta la seccion de vuelos de un viaje.
- El usuario clickea en el boton para agregar, editar o eliminar un vuelo del viaje.
- El sistema le muestra un formulario/modal de agregado, edicion o eliminacion de un vuelo del viaje.
- El usuario completa/modifica el formulario; o confima la eliminacion.
- El sistema agrega, edita o elimina un vuelo del viaje.

Como usuario quiero ver detalles de los hospedajes relacionados al viaje.
- El usuario accede a su cuenta y entra a la home.
- El sistema le muestra el proximo viaje con su menu de navegacion.
- El usuario clickea en el boton de los hospedajes.
- El sistema le muestra la pantalla de los hospedajes y todas su respectiva informacion.

Como usuario quiero administrar archivos importantes en cada hospedaje.
- El usuario accede a su cuenta y entra a la home.
- El sistema le muestra el proximo viaje con su menu de navegacion.
- El usuario clickea en el boton de los hospedajes.
- El sistema le muestra la pantalla de los hospedajes y todas su respectiva informacion.
- El usuario navega hasta el hospedaje deseado y clickea en agregar o borrar un archivo.
- El sistema agrega o elimina el archivo.

Como usuario quiero hacer uso de mi cuenta para administrar mis viajes
-  El usuario entra a la url de Viaje Perfecto.
-  El sistema le muestra la pantalla de logueo.
-  El usuario pone sus credenciales y accede o primero se registra y accede.
-  El sistema le muestra la home

Como usuario quiero administrar mis notificaciones visuales
- El usuario accede a su cuenta y entra a la home.
- El usuario clickea en el boton del footer de notificaciones.
- El sistema le redirecciona a la sección de notificaciones.
- El usuario puede aceptar/rechazar una invitación y confirmar (marcar como leída) una notificación.
- El sistema acepta/rechaza una invitación o confirma una notificación.

Como usuario quiero administrar mis notificaciones push
- El usuario entra a la url de Viaje Perfecto.
- El sistema pide permisos de uso de notificaciones.
- El usuario permite las notificaciones.
- El sistema envía notificaciones push al usuario correspondiente en caso de tenerlas.
- El usuario recibe la notificación push en el dispositivo correspondiente y si quiere clickearla, esta misma redirecciona a la sección de notificaciones.

Como usuario quiero ver mi historial de viajes
- El usuario accede a su cuenta y entra a la home.
- El usuario clickea en el botón de historial de viajes
- El sistema le redirecciona al historial de viajes.

Como usuario quiero administrar fotos de un viaje
- El usuario accede a su cuenta y entra a la home.
- El usuario navega hasta la seccion de fotos de un viaje.
- El usuario puede ver, descargar, eliminar o agregar las fotos relacionadas a ese viaje.
- El sistema muestra, descarga, elimina o agrega la foto relacionada a ese viaje.

Como usuario quiero administrar hospedajes de un viaje
- El usuario accede a su cuenta y entra a la home.
- El usuario navega hasta la seccion de hospedajes de un viaje.
- El usuario clickea en el boton para agregar, editar o eliminar un hospedaje del viaje.
- El sistema le muestra un formulario/modal de agregado, edicion o eliminacion de un hospedaje del viaje.
- El usuario completa/modifica el formulario; o confima la eliminacion.
- El sistema agrega, edita o elimina un hospedaje del viaje.

Como usuario quiero compartir viajes a un usuario
- El usuario accede a su cuenta y entra a la home.
- El usuario navega hasta la seccion de compartir un viaje.
- El usuario puede compartir o eliminar la invitación/posesión de un viaje a un usuario.
- El sistema comparte o elimina la invitación/posesión de un viaje al otro usuario.

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


Diagrama Entidad-Relacion:

![image](https://github.com/laautarolopez/viaje-perfecto/assets/73248047/4c8d931a-fa51-4e60-b5be-5299cd42f947)

