const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomHandler } = require('./middlewares/error.handler');

const app = express();
const port = proccess.env.ṔORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin){
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res)=>{
  res.send('Bienvenido a mi server en Express');
});

app.get('/nueva-ruta', (req, res)=>{
  res.send('Hola soy un nuevo end-point');
});

routerApi(app);

app.use(logErrors);
app.use(boomHandler);
app.use(errorHandler);


app.listen(port, ()=>{
  console.log('Escuchando el puerto '+ port);
});
