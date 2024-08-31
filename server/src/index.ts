import express from 'express'
import morgan from 'morgan'


import rolesRouter from './routes/roles.routes'
import departamentosRouter from './routes/departamentos.routes'

const app = express()

app.use(morgan('tiny'));

app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
    console.log('someone pinged here!!')
    res.send('pong')
})

app.use('/api/roles', rolesRouter)
app.use('/api/departamentos', departamentosRouter)
// app.use('/api/')




app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})