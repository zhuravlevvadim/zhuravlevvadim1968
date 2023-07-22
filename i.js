const express = require( 'express' )
const  app = express()
const PORT = 3000

const MongoClient = require("mongodb").MongoClient;
const URL = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(URL);


// ------Запуск сервера в порту 3000 ------
app.set( 'view engine', 'ejs' )
app.use(express.static('connect'))

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/knife', (req, res) => {
    
    async function run() {
    try {
        
        await mongoClient.connect();
        console.log("Успешное подключение к БД");
        const db = mongoClient.db("knives");
        const collection = db.collection("my_knives");
        const rez_obj  = await collection.findOne({ "Длина": "15см"});
        const rez_mas = Object.entries(rez_obj);
        
        console.log(rez_mas);
         
    
    

        res.render('knife', {rez_mas: rez_mas});

    


    }  catch(err) {
        console.log("Возникла ошибка");
        console.log(err);
    }   finally {
        
        await mongoClient.close();
        console.log("Подключение закрыто");
    }
}
run ().catch(console.error);

})


 








app.get('/crafts', (req, res) => {
    res.render('crafts')
})

app.get('/icons', (req, res) => {
    res.render('icons')
})

let events = require('events');
let myemit = new events.EventEmitter();

app.listen(PORT, ( ) => {
     console.log(`Сервер запущен в порту:${PORT}`)
})




