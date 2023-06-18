const express = require('express');
const app = express();
const PORT = 48956 //PORT
const mongoose = require('mongoose'); //mongoose for DB
const cors = require('cors'); // to remore cor issue
app.use(cors())  // cor policy activation
app.use(express.json()); // to render json req from frontend
app.use(express.urlencoded({ extended: true })); // to render form data from frontend

//connect backend with DB
mongoose.connect("mongodb+srv://userone:userone@cluster0.fgjorlm.mongodb.net/MES")//!insert your username
    .then(() => { console.log("MongoDB connected successfully") })//*success message
    .catch((err) => { console.log("Error connecting to MongoDB " + err) });//*fail message

// CRUD operation 
// C-Create - POST 
//R-READ-GET
//U-Update -PUT
//D-Delete - DELETE


const PRODUCT = require("./model/product")


//CREATE
app.post('/addData', async (req, res) => {
    try {

        let item = req.body
        console.log(item)


        const saveData = await PRODUCT(item) //PRODUCT is a model. we cross check the form data with the model we created before saving it
        await saveData.save()  // through this code we save the incoming data from front end to db 
        res.send((saveData))


    } catch (error) {
        res.send(error);
    }
})

//READ

app.get('/getData', async (req, res) => {
    try {
        console.log("reading data")
        const data = await PRODUCT.find({}) //code that find all data from backend
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


// For deleteing and updating we are using "ids" of entry and then do the procedd

//UPDATE


app.put('/updateData/:id', async (req, res) => {
    try {

        let id = req.params.id
        let updateData = { $set: req.body }
    
        const updated = await PRODUCT.findByIdAndUpdate(id, updateData)
    
        res.json(updated)
        
    }  catch (error) {
        console.log(error)
        res.send('error')
    }

})


//DELETE
app.delete('/deteData/:id', async (req, res) => {
    try {
        let id = req.params.id
        console.log('id check', id)

        const updated = await PRODUCT.findByIdAndDelete(id)

        res.send("deleted successfully")

    } catch (error) {
        console.log(error)
        res.send('error')
    }
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});