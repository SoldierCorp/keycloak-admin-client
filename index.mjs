import express from 'express'
import cors from 'cors'

import userRouter from './router/userRouter.mjs'
import groupRouter from './router/groupRouter.mjs'
import clientRouter from './router/clientRouter.mjs'
import resourceRouter from './router/resourceRouter.mjs'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', userRouter)
app.use('/api', groupRouter)
app.use('/api', clientRouter)
app.use('/api', resourceRouter)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

