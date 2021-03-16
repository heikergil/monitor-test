const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Ingreso = require('./models/ingresos');
const methodOverride = require('method-override');
const { DateTime } = require("luxon");
const AppError = require('./AppError')
const morgan = require('morgan')
const engine = require('ejs-mate');



app.use(morgan('tiny'));

app.use(express.static(__dirname + '/public'));

// connection to mongoDB with mongoose
mongoose.connect('mongodb://localhost:27017/monitor-test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('CONECTED TO DBS')
})
.catch((err) => {
    console.log('ERROR CONNECTING TO DB')
    console.log(err)
});

app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

app.get('/', (req, res) => {

res.send('This is monitor test APP, please go to  http://localhost:3000/index ')
})


app.post('/new', wrapAsync(async (req, res, next) => {
        const nuevoIngreso = new Ingreso(req.body)
        if (nuevoIngreso.fecha) {
            nuevoIngreso.fecha = new Date(nuevoIngreso.fecha);
            await nuevoIngreso.save()
            console.log(nuevoIngreso);
            res.redirect('bitacora'); 
        } else {
            var date = new Date();
            console.log(date);
            nuevoIngreso.fecha = date;
            await nuevoIngreso.save()
            console.log(nuevoIngreso);
            res.redirect('bitacora')  
        }
       
}))


app.get('/show/:id', wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const ingreso = await Ingreso.findById(id);
    if (!ingreso) {
        return next(new AppError('Ingreso No Encontrado', 404));
    }
        res.render('show', { ingreso }) 
}))

app.get('/update/:id', wrapAsync(async (req, res, next)=> {
        const { id } = req.params;
        const ingreso = await Ingreso.findById(id);
        const fecha = date.toISODate();
        const llegada = new DateTime(ingreso.fecha);
        const hora = date.toFormat('HH:mm');
        res.render('update', { ingreso, fecha, llegada:hora })   
}))

app.put('/ingreso/update/:id', wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const ingreso = await Ingreso.findByIdAndUpdate(id, req.body, {runValidators: true, new: true, useFindAndModify: false })
        res.render('ingreso', { ingreso })     
}))

app.use((err, req,res, next) => {
    const { status = 500, message = 'Something Went Wrong' } = err;
    res.status(status).send(message);
})


app.get('/bitacora', wrapAsync(async (req, res, next) => {
    
    const { fechaBusqueda } = req.query;

    const date = new Date(fechaBusqueda)
    date.setUTCHours(0,0,0,0);
    const datePlus = new Date(date);
    datePlus.setDate(datePlus.getDate() + 1)

    const fechaAuto = new Date();
    const horaAuto = fechaAuto.setUTCHours(0,0,0,0);
    console.log(horaAuto);
    console.log('fechaauto');
    const autoPlus = new Date(horaAuto);
    autoPlus.setDate(autoPlus.getDate() + 1)

if (fechaBusqueda) {
    console.log(date)
    console.log(datePlus)
    const ingresos = await Ingreso.find({"fecha" : {$gte: date, $lt: datePlus}});
    res.render('bitacora', { ingresos, fecha: fechaBusqueda });
} else {
    const options = {year: 'numeric', month: 'numeric', day: 'numeric' };
    console.log(fechaAuto)
    console.log(autoPlus)
    const ingresos = await Ingreso.find({"fecha" : {$gte: fechaAuto, $lt: autoPlus}});
    res.render('bitacora', { ingresos, fechaBusqueda: fechaAuto, fecha: fechaAuto.toLocaleDateString('en-GB', options)});
}

     
}
))

app.get('/lote/:lote', wrapAsync( async (req, res, next) => {
    
    const { lote } = req.params;
    const ingresos = await Ingreso.find({"lote":lote})
    var totalRemitido = 0;
    var totalBines = 0;
        for (let ingreso of ingresos) {
            totalRemitido += ingreso.remitido;
            totalBines += ingreso.numeroBines
            }
    res.render('lote', { ingresos, totalRemitido, totalBines, lote })

}))

app.delete('/delete/:id', wrapAsync(async(req, res, next) => {
        const { id } = req.params;
        const ingreso = await Ingreso.findByIdAndDelete(id)
        res.redirect('/ingreso')
}))

app.listen(3000, () => {
    console.log('MonitorApp listening on port 3000');
})