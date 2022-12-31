const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { application } = require('express')


// midleware 
app.use(cors())
app.use(express.json())



//mongodb connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.psswf3w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const practiceCollection = client.db("practice").collection("user")
        app.get('/users', async (req, res) =>{
            const query = {}
            const cursor = practiceCollection.find(query)
            const user = await cursor.toArray()
            res.send(user)
        })
        app.get('/user/:id', async (req, res) =>{
            const id = req.params.id 
            const query = {_id: ObjectId(id)}
            const result = await practiceCollection.findOne(query)
            res.send(result)
        })
        app.put('/user/:id', async (req, res) =>{
            const id = req.params.id
            const body = req.body 
            const filter = {_id: ObjectId(id)}
            const options = { upsert: true };
            const updateDoc = {
                $set : {
                    name: body.name,
                    address: body.address,
                    number: body.number 
                }
            }
            const result = await practiceCollection.updateOne(filter, updateDoc, options)
            res.send(result)
        })
        app.post('/user', async (req, res) => {
            const user = req.body
            const result = await practiceCollection.insertOne(user)
            res.send(result)
        })
        app.delete('/users/:_id', async (req, res) =>{
            const id = req.params._id
            const query = {_id: ObjectId(id)}
            const result = await practiceCollection.deleteOne(query)
            res.send(result)

        })
    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir)



app.listen(port, () => {
    console.log('running this server on port :', port)
})

































// const express = require('express')
// const cors = require('cors')
// require('dotenv').config()
// const app = express()
// const port = process.env.PORT || 5000

// //MIDLE-WARE
// app.use(cors())
// app.use(express.json())


// app.get('/' , async(req, res) =>{
//     res.send('running the practice server')
// })

// app.listen(port, () =>{
//     console.log('listening port', port)
// })