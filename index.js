const app = require("./app")
const userRouter = require('./routes/user');
const mainRouter = require('./routes/main');
const routesRouter = require('./routes/routes');



app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
})

app.use(userRouter);
app.use(mainRouter);
app.use(routesRouter);

