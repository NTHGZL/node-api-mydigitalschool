const router = require('express').Router();

const Note = require('../../models/note')

function getNotes(){
    return new Promise((resolve, reject)=>{
        Note.find((error, notes)=>{
            if(error){
                reject(error)
             
            }
            resolve(notes);
            
        })
    })
}

router.route('/')
.get((req, res) => {
   getNotes()
   .then(notes => res.send(notes))
   .catch(error => res.status(500).send(error))
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
        const note = new Note();
        note.title = title
        note.description = description
        //on ajoute la note à la BDD
        note.save((error, notes) =>{
            if(error){
                // return res.status(500).send(error)
                console.error(error)
            }

            //Récup de la liste mis à jour
            getNotes()
            .then(notes => res.send(notes))
            .catch(error => res.status(500).send(error))
        })
    }
})
.delete((req, res) =>{
    const note = new Note();
    const id = req.body.id

    if(!id){
        res.status(500).send('id manquant')
    }else{
        Note.findByIdAndDelete({"_id":id}, (error, notes)=>{
                if(error){
                  return  res.status(500).send(error)
                }
                getNotes()
                .then(notes => res.send(notes))
                .catch(error => res.status(500).send(error))
            })
    }
})
.put((req, res)=>{
    const id = req.body.id
    const title = req.body.title
    const description = req.body.description
    const isEnabled = req.body.isEnabled
    const isFavorite = req.body.isFavorite
    
    if(!id){
        res.status(500).send('id manquant')
    }else{
       const _note = {
           title, 
           description,
           isEnabled,
           isFavorite
       }

       Note.findByIdAndUpdate(id, _note, {upsert: true, setDefaultsOnInsert: true},(error, notes) => {
           if (error){
               return res.status(500).send(error)
           }
            getNotes()
            .then(notes => res.send(notes))
            .catch(error => res.status(500).send(error))
           
       })
    }
})

module.exports = router