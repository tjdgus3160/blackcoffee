import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`This server is listening at port: ${PORT}`);
});
