import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://Torba2207:Levis_2009@task-tracker-db.tqcka2w.mongodb.net/?retryWrites=true&w=majority&appName=task-tracker-db";

app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
