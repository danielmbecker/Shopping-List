const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const path = require("path");
const e = require('express');
const PORT = 3000;
require('dotenv').config();
const username = process.env.USERNAME
const password = process.env.PASSWORD
const database_url = process.env.DATABASEURL
const dbName = process.env.DBNAME
const dbCollection = process.env.DBCOLLECTION

// console.log(process.env)

// CRUD 
// CREATE = POST
// READ = GET
// UPDATE = PUT
// DELETE = DELETE

console.log("we have lift off")

MongoClient.connect(`mongodb+srv://${username}:${password}@${database_url}`, {
useUnifiedTopology: true})
    .then (client => {
        console.log('Connected to Database')
        const db = client.db(`${dbName}`)
        const quotesCollection = db.collection(`${dbCollection}`)

        // console.log(quotesCollection[0].name);
        app.set('view engine', 'ejs')
        
        app.use(bodyParser.urlencoded({ extended: true }))
        // app.get('/', (req, res) => {res.sendFile('/Users/daniel/Documents/File\ Cabinet/100Devs/Video-and-Reading-Work-Throughs/Node-Express-MongoDB/index.html')
        // })
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(bodyParser.json())
        
      //let listValues
        

        app.get('/', (req, res) => {
          const cursor = db.collection('quotes').find()
          db.collection('quotes').find().toArray()
            .then(results => {

              let itemStoreData = []
              results.forEach(e => itemStoreData.push(e.store))
              itemStoreData = itemStoreData.sort()
              let storesAlphabetizedNoDuplicates = itemStoreData.filter((e,i,arr) => arr[i] !== arr[i+1]);

              let userSavedStores = results.filter(e=> e.type === 'storeName')
              // console.log(userSavedStores)
              
              res.render('revised-index.ejs', {submittedValues: results,
                                               storeList: storesAlphabetizedNoDuplicates,
                                              dropDownValues: userSavedStores})
            })
            .catch(error => console.error(error))


          //   const storesDrop = db.collection('stores').find()
          // db.collection('stores').find().toArray()
          //   .then(results => {
          //     console.log('collection 2 fired')
          //     // results.forEach( e => console.log(e.StoreName))
          //     res.render('revised-index.ejs', {storeCollection: results})
          //   })
          //   .catch(error => console.error(error))
        })

    //     app.get('/', function(req, res){
    //       dbReadOne.find({}, '', function(errorOne, dataOne){
    //           if(errorOne)
    //              throw new Error(errorOne);
    //           dbReadTwo.find({},'', function(errorTwo, dataTwo){
    //              if(errorTwo)
    //                  throw new Error(errorTwo);
    //              res.json({
    //                  dataOne: dataOne,
    //                  dataTwo: dataTwo
    //              });
    //           });
    //       });
    //  });




      //  app.post('/quotes', (req, res) => {
      //    if (req.body.type !== 'storeName' && req.body.name !== ''){

      //     // let nameFormatted 
      //     let nameFormatFunc = function (){
      //       nameFormatted =req.body.name.toLowerCase().trim().split('')
      //       for (let i = 0; i < nameFormatted.length ; i++){
      //         if (i === 0 || nameFormatted[i-1] === ' '){
      //           nameFormatted[i] = nameFormatted[i].toUpperCase()
      //         }
      //       }
      //       nameFormatted = nameFormatted.join('')
      //       return nameFormatted
      //     }
          
      //     // let storeFormatted 
      //     let storeFormatFunc = function (){
      //       storeFormatted = req.body.store.toLowerCase().trim().split('')
      //       for (let i = 0; i < storeFormatted.length ; i++){
      //         if (i === 0 || storeFormatted[i-1] === ' '){
      //           storeFormatted[i] = storeFormatted[i].toUpperCase()
      //         }
      //       } 
      //       storeFormatted = storeFormatted.join('')
      //       return storeFormatted
      //     } 

      //     nameFormatFunc()
      //     storeFormatFunc()

      //       quotesCollection.insertOne(
      //         { name: nameFormatted,
      //           quote: req.body.quote,
      //           st: false,
      //           store: storeFormatted,
      //           type: "item"}
      //       )
      //       .then(result => {
      //         res.redirect('/')
      //       })
      //       .catch(error => console.error(error))
      //     }else{
      //       console.log('no values submitted')
      //       .then(result => {
      //         res.redirect('/')
      //       })
      //     }
      //   })

        app.put('/quotes', (req, res) => {
          const val = req.body.st
            quotesCollection.findOneAndUpdate(
              { name: req.body.name,
                quote: req.body.quote,
                store: req.body.store},
              { $set: { st: !val, } },
              { upsert: false }
            )
            .then(result => {
              // console.log(".then triggered")
              // console.log(result)
              res.render('./views/index.ejs')
            })
            .catch(error => console.error(error))
        })





      app.post('/quotes', (req, res) => {
        if (req.body.type !== 'storeName' && req.body.name !== ''){
          console.log("storeName Add")

         // let nameFormatted 
         let nameFormatFunc = function (){
           nameFormatted =req.body.name.toLowerCase().trim().split('')
           for (let i = 0; i < nameFormatted.length ; i++){
             if (i === 0 || nameFormatted[i-1] === ' '){
               nameFormatted[i] = nameFormatted[i].toUpperCase()
             }
           }
           nameFormatted = nameFormatted.join('')
           return nameFormatted
         }
         
         let storeFormatted 
         let storeFormatFunc = function (){
           storeFormatted = req.body.store.toLowerCase().trim().split('')
           for (let i = 0; i < storeFormatted.length ; i++){
             if (i === 0 || storeFormatted[i-1] === ' '){
               storeFormatted[i] = storeFormatted[i].toUpperCase()
             }
           } 
           storeFormatted = storeFormatted.join('')
           return storeFormatted
         } 
      
         nameFormatFunc()
         storeFormatFunc()

            // quotesCollection.findOneAndUpdate(
            //  { name: nameFormatted,
            //    store: req.body.store,
            //    type:  "item"},
            //  { $set: { st: false,
            //         quote: req.body.quote  } },
            //  { upsert: true }
            // )   
            quotesCollection.deleteOne(
            { name: nameFormatted,
              store: storeFormatted,
              type: "item"})
      
           quotesCollection.insertOne(
             { name: nameFormatted,
               quote: req.body.quote,
               st: false,
               store: storeFormatted,
               type: "item"}
           )
           .then(result => {
            res.redirect('/')
           })
           .catch(error => console.error(error))
         }else if(req.body.type === 'storeName'){
          

          let dropDownFormatted 
          let dropDownFormattedfunc = function (){
            dropDownFormatted = req.body.storeName.toLowerCase().trim().split('')
           for (let i = 0; i < dropDownFormatted.length ; i++){
             if (i === 0 || dropDownFormatted[i-1] === ' '){
              dropDownFormatted[i] = dropDownFormatted[i].toUpperCase()
             }
           } 
           dropDownFormatted = dropDownFormatted.join('')
           return dropDownFormatted
         } 
          dropDownFormattedfunc()


          quotesCollection.deleteOne(
            { storeName: dropDownFormatted,
              type: "storeName"})

          console.log(`storeName Add ${dropDownFormatted}`)
          //  console.log(req.body)
          //  console.log(req.body.storeName)
           quotesCollection.insertOne(
             { storeName: dropDownFormatted,
               type: "storeName"}
           )
           .then(result => {
            res.redirect('/')
           })
           .catch(error => console.error(error))
         }
         // else{
         //   console.log('no values submitted')
         //   .then(result => {
         //     res.redirect('/')
         //   })
         // }
       })




          // app.delete('/quotes', (req, res) => {
          //   // console.log(req.body);
          //   //if(req.body.name !== '')

          //   {
          //     quotesCollection.deleteOne(req.body)
          //       .then(result => {
          //         res.json('Success')
          //        })
          //       .catch(error => console.error(error))
          //   }
          //   // else if(req.body.name === ''){
          //   //   quotesCollection.deleteMany({})
          //   //   .then(result => {
          //   //     if (result.deletedCount === 0) {
          //   //       return res.json('No quote to delete')
          //   //     }
          //   //     res.json(`Deleted All Entries`)
          //   //   })
          //   //   .catch(error => console.error(error))
          //   // }
          // })



          app.delete('/quotes', (req, res) => {
            // console.log(req.body);
            if(req.body.type !== 'storeName') {
              console.log("delete func called for one grocery item")
              quotesCollection.deleteOne(req.body)
                .then(result => {
                  res.json('Success')
                  console.log(`delete of grocery item: "${req.body.name}" was successful`)
                 })
                .catch(error => console.error(error))
            }else if(req.body.type === 'storeName') {
              console.log("delete func called for one store name")
              quotesCollection.deleteOne(req.body)
                .then(result => {
                  res.json('Success')
                  console.log(`delete of store name: "${req.body.storeName}" was successful`)
                 })
                .catch(error => console.error(error))
            }
            // else if(req.body.name === ''){
            //   quotesCollection.deleteMany({})
            //   .then(result => {
            //     if (result.deletedCount === 0) {
            //       return res.json('No quote to delete')
            //     }
            //     res.json(`Deleted All Entries`)
            //   })
            //   .catch(error => console.error(error))
            // }
          })









        app.listen(process.env.PORT || PORT, function() {
          console.log('Connected to server')
       })
  })
  .catch(console.error) 