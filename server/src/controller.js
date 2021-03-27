export default class Controller {
  #users = new Map();

  constructor({socketServer}) {
    this.socketServer = socketServer
  }

  onNewConnection(socket) {
    const {id} = socket
    console.log('connection stablished with', id)
    const userData = {id, socket}
    this.#updateGlobalUserData(id, userData)

    socket.on('data', this.#onSocketData(id))
    socket.on('error', this.#onSocketClose(id))
    socket.on('end', this.#onSocketClose(id))
  }

  #onSocketClose(id) {
    return data => {
      console.log('onSocketClose', data.toString());
    }
  }

  #onSocketData(id) {
    return data => {
      console.log('onSocketData', data.toString());
    }
  }

  #updateGlobalUserData(socketID, userData) {
    const users = this.#users
    const user = users.get(socketID) ?? {}
    
    const updatedUserData = {
      ...user,
      ...userData
    }

    users.set(socketID, updatedUserData)

    return users.get(socketID)
  }
}