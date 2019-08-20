const express = require('express')
const server = express()
const port = process.env.PORT || 3000

server.use(express.json())

const projects = [{id:1, title: 'Projeto1', tasks:[]},
                  {id:2, title: 'Projeto2', tasks:[]},
                  {id:3, title: 'Projeto3', tasks:[]}
                 ]

let count = 1

const existeProjeto = (req, res, next) => {    
    const { id } = req.params
    const projetoExiste = projects.filter( project => project.id == id)
    console.log(projetoExiste)
    if(projetoExiste == ''){        
        return res.json({error: 'Id nao encontrado'})
    }
    return next()
}

server.use((req, res, next) => {    
    if(req){
        console.log(`${count} Requisicoes foram feitas`)
        count++
        return next()
    }
    
})


server.post('/projects', (req, res) => {
    const { id, title, tasks } = req.body
    projects.push({
        id,
        title,
        tasks
    })
    res.json(projects)
})

server.post('/projects/:id/tasks', existeProjeto, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const project = projects.find( project => project.id == id)
    project.tasks.push({
        title
    })
    res.json(projects)
})

server.get('/projects', (req, res) => {
    res.json(projects)
})

server.put('/projects/:id', existeProjeto, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    let project = projects.find( project => project.id == id)
    project.title = title

    res.json(projects)
})

server.delete('/projects/:id', existeProjeto,  (req, res) => {
    const { id } = req.params
    const project = projects.filter(project => project.id == id)
    projects.splice(project,1)
    res.json(projects)
})



server.listen(port, ()=>console.log(`Rodando na porta ${port}`))