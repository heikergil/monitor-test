const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Ingreso = require('./models/ingresos');
const methodOverride = require('method-override');
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

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
res.send('This is monitor test APP, please go to  http://localhost:3000/index ')
})

app.get('/index', async (req, res) => {
    const { fechaBusqueda } = req.query;
    const fechaAuto = DateTime.now().toISODate();
    if (fechaBusqueda) {
        
        const ingresos = await Ingreso.find({"fecha" : fechaBusqueda});
        
        res.render('index.ejs', { ingresos, fecha: fechaBusqueda });
    } else {
        const ingresos = await Ingreso.find({"fecha" : fechaAuto});
        res.render('index.ejs', { ingresos, fechaBusqueda: fechaAuto, fecha: fechaAuto });
    }
         
})

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Ingreso.findByIdAndDelete(id);
    console.log('deleted');
    res.redirect('/index');
})



app.get('/show/:lote', async (req, res) => {
    const { lote } = req.params;
    console.log(lote);
    const ingresos = await Ingreso.find({"lote":lote})
    var totalRemitido = 0;
    for (let ingreso of ingresos) {
        totalRemitido = totalRemitido + ingreso.remitido;
    }
    console.log(totalRemitido)
    res.render('show', { ingresos, totalRemitido  })
})


app.post('/new', async (req, res) => {
    console.log(req.body)
    const nuevoIngreso = new Ingreso(req.body)
    await nuevoIngreso.save()
    res.redirect('index')
})


app.get('/ingreso/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const ingreso = await Ingreso.findById(id);
    res.render('ingreso', { ingreso })
  
})

app.get('/update/:id', async (req, res)=> {
    const { id } = req.params;
    const ingreso = await Ingreso.findById(id);
    res.render('update', { ingreso })
})

app.put('/ingreso/update/:id', async (req, res) => {
    const { id } = req.params;
    const ingreso = await Ingreso.findByIdAndUpdate(id, req.body, {runValidators: true, new: true, useFindAndModify: false })
    res.render('ingreso', { ingreso }) 
})

app.listen(3000, () => {
    console.log('MonitorApp listening on port 3000');
})