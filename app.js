const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Ingreso = require('./models/ingresos')
const methodOverride = require('method-override');




// connection to mongoDB with mongoose
mongoose.connect('mongodb://localhost/monitor-test', {useNewUrlParser: true, useUnifiedTopology: true})
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

app.get('/', async (req, res) => {
    // const date = new Date();
    // const dia = new Date(date.setHours(-5,0,0));
    // const noche = new Date(date.setHours(-5,0,0) + 1)
    const ingresos = await Ingreso.find({});
    console.log(ingresos);
    res.render('index.ejs', { ingresos });
    
})


app.listen(3000, () => {
    console.log('MonitorApp listening on port 3000');
})