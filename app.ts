import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import categoryRoutes from './routes/categoryRoutes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/users', bookRoutes);
app.use('/api/v1/books', categoryRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});