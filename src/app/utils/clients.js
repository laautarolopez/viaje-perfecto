let clients = new Map();

const setClient = (id, socket) => {
  clients.set(id, socket);
  console.log('SET Clients:', Array.from(clients.keys()));
};

const removeClient = (id) => {
  delete clients[id];
  console.log('REMOVE Clients:', Array.from(clients.keys()));
};

const getClients = () => {
  console.log('GET Clients:', Array.from(clients.keys()));
  return clients;
};

module.exports = { setClient, removeClient, getClients };