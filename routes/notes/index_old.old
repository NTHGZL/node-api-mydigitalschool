const router = require('express').Router();

var notes = [
    { 
        id: 1,
        title : 'Ma note',
        description : 'Ma description ',
        isEnabled : true,
        isFavorite : false,
    },
    { 
        id: Math.random().toString(36).substr(2, 9),
        title : 'Ma note 2',
        description : 'Ma description 2',
        isEnabled : true,
        isFavorite : false,
    },
    { 
        id: Math.random().toString(36).substr(2, 9),
        title : 'Ma note 3',
        description : 'Ma description 3',
        isEnabled : true,
        isFavorite : false,
    },  
]

router.route('/')
.get((req, res) => {
    res.send(notes)
})
.post((req, res) => {
    console.log(req.body)
    const title = req.body.title
    const description = req.body.description

    if(!title){
        res.status(500).send('Le titre est manquant')
    }else if(!description){
        res.status(500).send('La description est manquante')
    }else{
        //la data est ok

        //on ajoute la note à la liste
        notes.push({
            id: Math.random().toString(36).substr(2, 9),
            title: title,
            description: description,
            isEnabled: true,
            isFavorite: false
        })
        res.send(notes)
    }
})
.delete((req, res) =>{
    const id = req.body.id

    if(id){
        res.send(notes.filter(note => note.id !== id))
    }else{
        res.status(500).send('id manquant')
    }
})
.put((req, res)=>{
    const id = req.body.id
    const title = req.body.title
    const description = req.body.description
    
    if(id){
        notes.forEach(note => {
            if (note.id === id){
                note.description = description
                note.title = title
            }
        })
        res.send(notes)
    }
})

module.exports = router