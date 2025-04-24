import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';



const app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config()


mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Successful connection to Database")
    })
    .catch((err)=>{
        console.error("Connection to Database has been failed:",err)
    })

app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
