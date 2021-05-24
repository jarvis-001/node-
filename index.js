const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const app = express();
const members =require('./Members')

//app.use(logger);

//handlebar middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//home page route
app.get('/',(req,res)=>res.render('index',{
    title:'Members App',members
}));

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

// app.get('/', (req,res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })


const PORT = process.env.PORT||5000;

app.listen(PORT, ()=>{
    console.log(`started on port ${PORT}`);
});