import express from 'express';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes/routes';
import { EnvInstance as Env } from './globals/Env'

const MemoryStore: any = require('memorystore')(session)

var app: express.Express = express();
app.use(express.json())
app.use(session({
    cookie: { maxAge: 14400000 },
    store: new MemoryStore({
        checkPeriod: 14400000 // prune expired entries every 8h
    }),
    secret: 'catito',
    resave: false,
    saveUninitialized: true
}));

const swaggerDocument = require('./../build/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app);

app.listen(Env.port, () => console.log(`Listening on port ${Env.port}`));
