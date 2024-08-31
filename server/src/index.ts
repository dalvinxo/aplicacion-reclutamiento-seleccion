import express from 'express'
import morgan from 'morgan'


import rolesRouter from './routes/roles.routes'
import puestosRouter from './routes/puestos.routes'
import idiomasRouter from './routes/idiomas.routes'
import competenciasRouter from './routes/competencias.routes'
import departamentosRouter from './routes/departamentos.routes'
import puestosIdiomasRouter from './routes/puestosIdiomas.routes'
import puestosCompetenciasRouter from './routes/puestosCompetencias.routes'

import personasRouter from './routes/personas.routes'
import candidatosRouter from './routes/candidatos.routes'
import capacitacionesRouter from './routes/capacitaciones.routes'
import estadosCandidatos from './routes/estadosCandidatos.routes'
import personasIdiomasRouter from './routes/personasIdiomas.routes'
import experienciasLaboralesRouter from './routes/experienciasLaborales.routes'
import personasCompetenciasRouter from './routes/personasCompetencias.routes'

const app = express()

app.use(morgan('tiny'));

app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
    console.log('someone pinged here!!')
    res.send('pong')
})

app.use('/api/roles', rolesRouter)
app.use('/api/idiomas', idiomasRouter)
app.use('/api/puestos', puestosRouter)
app.use('/api/competencias', competenciasRouter)
app.use('/api/departamentos', departamentosRouter)
app.use('/api/puestosIdiomas', puestosIdiomasRouter)
app.use('/api/puestosCompetencias', puestosCompetenciasRouter)
app.use('/api/personas', personasRouter)
app.use('/api/candidatos', candidatosRouter)
app.use('/api/capacitaciones', capacitacionesRouter)
app.use('/api/estadosCandidatos', estadosCandidatos)
app.use('/api/personasIdiomas', personasIdiomasRouter)
app.use('/api/experienciasLaborales', experienciasLaboralesRouter)
app.use('/api/personasCompetencias', personasCompetenciasRouter)

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})