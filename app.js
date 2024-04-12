require('dotenv').config();
//*importa express a proyecto
const express = require('express');
//*crea servidor
const app = express();
//*identificar puerto
const port = 3000;
const postsRoutes = require('./routes/posts')
const usersRoutes = require('./routes/users')
const db = require('./utils/db');

const JWT_SECRET = process.env.JWT_SECRET;
//*middlewares
app.use(express.json());

db.connect();

//*mensaje que ayuda a saber si esta funcionando la conexion
app.get('/', (req, res) => {
    res.status(200).send('ok')
})

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);

//inicio de servidor (hilo ejecucion)
app.listen(port, () =>{
    console.log("Conexion establecida port 3000");
});

