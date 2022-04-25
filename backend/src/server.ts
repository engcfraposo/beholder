import "reflect-metadata";
import db from './database';
import app from './app';
import appEm from "./app.em";
import appWS from "./app.ws";
import settingsRepository from './modules/sessions/repositories/settings.repository';

db.authenticate()
.then(() => {
  console.log('🚀 Database connected on Azure SQL');
})
.catch(error => {
  console.log('Database connection error');
  console.log(error);
});

settingsRepository.getDefaultSettings().then(settings => {
  const server = app.listen(process.env.PORT || 3333, () => {
    console.log(`🚀 Server started on port ${process.env.PORT || 3333}!`);
  });
  const wss = appWS(server);
  appEm(settings, wss);

})

