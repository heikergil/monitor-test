const mongoose = require('mongoose');
const Ingreso = require('./models/ingresos');
const { DateTime } = require("luxon");

// connection to mongoDB with mongoose
mongoose.connect('mongodb://localhost:27017/monitor-test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('CONECTED TO DBS')
})
.catch((err) => {
    console.log('ERROR CONNECTING TO DB')
    console.log(err)
});

const date = DateTime.now();
console.log(date);


// const seedIngresos = [
//     {
//         lote: 1236023,
//         proveedor: 'wijuga',
//         piscina: '56',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 8,
//         remitido: 7200
//     },
//     {
//         lote: 1237000,
//         proveedor: 'wijuga',
//         piscina: '0E',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 10,
//         remitido: 9000
//     },
//     {
//         lote: 1237000,
//         proveedor: 'wijuga',
//         piscina: '0E',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 10,
//         remitido: 9000
//     },
//     {
//         lote: 1236023,
//         proveedor: 'wijuga',
//         piscina: '56',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 8,
//         remitido: 7200
//     },
//     {
//         lote: 1236023,
//         proveedor: 'wijuga',
//         piscina: '56',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 8,
//         remitido: 7200
//     },
//     {
//         lote: 1237040,
//         proveedor: 'produmar',
//         piscina: '4-04',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 8,
//         remitido: 9000
//     },
//     {
//         lote: 1237040,
//         proveedor: 'produmar',
//         piscina: '4-04',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 10,
//         remitido: 9000
//     },
//     {
//         lote: 1237041,
//         proveedor: 'produmar',
//         piscina: '5-05',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 10,
//         remitido: 9000
//     },
//     {
//         lote: 1237041,
//         proveedor: 'produmar',
//         piscina: '5-05',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 8,
//         remitido: 8000
//     },
//     {
//         lote: 1237050,
//         proveedor: 'cachugran',
//         piscina: '99',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 8,
//         remitido: 7200
//     },
//     {
//         lote: 1237010,
//         proveedor: 'PUNA',
//         piscina: '808',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 9,
//         remitido: 9000
//     },
//     {
//         lote: 1237010,
//         proveedor: 'PUNA',
//         piscina: '808',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 10,
//         remitido: 1000
//     },
//     {
//         lote: 1237010,
//         proveedor: 'PUNA',
//         piscina: '808',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 10,
//         remitido: 1000
//     },
//     {
//         lote: 1237010,
//         proveedor: 'PUNA',
//         piscina: '808',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 10,
//         remitido: 1000
//     },
//     {
//         lote: 1237010,
//         proveedor: 'PUNA',
//         piscina: '808',
//         fecha: dia,
//         llegada: hora,
//         numeroBines: 10,
//         remitido: 1000
//     }



// ]


// Ingreso.insertMany(seedIngresos)
//     .then(res => {
//         console.log(res)
//     })
//     .catch(e => {
//         console.log(e)
//     })