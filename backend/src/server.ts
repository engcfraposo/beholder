import "reflect-metadata";
import db from './database';
import app from './app';

db.initialize()
.then(() => {
  console.log('🚀 Database connected on Azure SQL');
})
.catch(error => {
  console.log('Database connection error');
  console.log(error);
});

app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 Server started on port ${process.env.PORT || 3333}!`);
});