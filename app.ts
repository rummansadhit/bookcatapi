import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import categoryRoutes from './routes/categoryRoutes';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(req.body);
    next();
});
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/books', bookRoutes);
//app.use('/api/v1/categories', categoryRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});