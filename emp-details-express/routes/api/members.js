const express = require('express');
const router = express.Router();

const members = require('../../Members');

//Gets all members
router.get('/', (req, res) => {
    res.json(members);
})

//Get single member
router.get('/:id', (req, res)=> {
   //res.send(req.params.id);
   const found = members.some(member => member.id === parseInt(req.params.id) );
   if(found){
   res.json(members.filter(member => member.id === parseInt(req.params.id) ));
   }
   else {
       res.status(400).json({msg: `No Member with id of ${req.params.id}`});
   }
})
//Create member
router.post('/', (req, res)=>{
    // res.send(req.body);
    const newMember = {
        id: req.body.id,
        name: req.body.name
    }
    if(!newMember.id){
        return res.status(400).json({msg: 'Please include an id'});
    }
    members.push(newMember);
    res.json({msg: `Member ${req.body.name} is added`});
});

//Update a member
router.put('/:id', (req, res)=> {
    //res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id) );
    if(found){
    const updateMember = req.body;
    members.forEach(member => {
        if( member.id === parseInt(req.params.id)){
            member.name = updateMember.name ? updateMember.name : member.name;
            res.json({msg: `Member ${member.name} is updated `});
        }
    });
    }
    else {
        res.status(400).json({msg: `No Member with id of ${req.params.id}`});
    }
 })

 //Delete single member
router.delete('/:id', (req, res)=> {
    //res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id) );
    if(found){
    res.json({msg: 'Member deleted',member: members.filter(member => member.id !== parseInt(req.params.id) )});
    }
    else {
        res.status(400).json({msg: `No Member with id of ${req.params.id}`});
    }
 })

module.exports = router;