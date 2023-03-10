import express from 'express'


const app = express()
const port = 3000

const jsonBodyMiddleWare = express.json()
app.use(jsonBodyMiddleWare)

type PeopleType = {
    id: number,
    fname: string
}

const db = {
    people: [
        {id: 1, fname: 'Mike Tanchuk'},
        {id: 2, fname: 'Yurii Pidlisnyi'},
        {id: 3, fname: 'Dymich'}
    ],
}

app.get('/people', (req, res) => {
    let people = db.people

    if(req.query.fname){
        people = people.filter(p => p.fname.indexOf(req.query.fname as string) > -1)
    }

    res.json(people)
})


app.get('/people/:id', (req, res) => {
    console.log(`${+req.params.id}`)

    const personFiltered = db.people.find(p => p.id === +req.params.id)

    if(!personFiltered) {
        res.send(404)
        return
    }

    res.json(personFiltered);
})

app.post('/people', (req, res) => {

    if(!req.body.name){
        res.sendStatus(400)
        return
    }

    let newPerson = {
        id: +(new Date()),
        fname: req.body.name
    };
    db.people.push(newPerson)
    res.status(201)
        .json(newPerson)
})

app.delete('/people/:id', (req, res) => {

    const personFiltered = db.people.find(p => p.id === +req.params.id)

    if(!personFiltered) {
        res.send(404)
        return
    }

    db.people = db.people.filter(p => p.id !== +req.params.id)

    res.status(202);
})

app.put('/people/:id', (req, res) => {

    if(!req.body.name){
        res.sendStatus(400)
        return
    }

    const personFiltered = db.people.find(p => p.id === +req.params.id)

    if(!personFiltered) {
        res.send(404)
        return
    }

    personFiltered.fname = req.body.name

    res.status(200)
        .json(personFiltered);
})
app.listen(port, () => {
    console.log(`${port}`)
})