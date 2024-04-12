const mongoose = require("mongoose");
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.itzqwuj.mongodb.net/${process.env.DB_NAME}`
async function connect() {

  try {
    let connection = await mongoose.connect(URI)
    if (connection) console.log("Conexion a BD establecida")  
  } catch (error) {
     throw new Error(error)
  }
 
}

function disconnect() {
  mongoose.disconnect()
}

module.exports = {
  connect,
  disconnect
}

