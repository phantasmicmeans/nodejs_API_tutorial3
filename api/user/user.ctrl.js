let users = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bek'},
  {id: 3, name: 'Chris'}
]

const index =(req,res) => {

  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  console.log("limit:", limit)
  if (Number.isNaN(limit)){
    res.status(400).end();
  }
  else {
    res.json(users.slice(0, limit));
  }
}
 
const show = (req,res) =>{

  const id  = parseInt(req.params.id, 10);
  if (Number.isNaN(id))
  {
    return res.status(400).end();
  }
  const user = users.filter(user => user.id === id)[0];

  if (!user){
    return res.status(404).end();
  }

  res.json(user);
}

const destroy = (req,res) => {

  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id))
  {
    return res.status(400).end();

  }
  users = users.filter (user => user.id !== id);
  res.status(204).end();

}


const create = (req,res) => {

  const name = req.body.name; //request의 body에서 name추출
  if (!name)
  {
    return res.status(400).end();
  }

  const found = users.filter(user => user.name === name).length;
  //users의 name중 위에서 받아온 name과 같은게 있다면 길이가 1
  if(found) {
    return res.status(409).end();
  }

  const id = Date.now();
  const user = {id, name};
  users.push(user);
  res.status(201).json(user);
}



module.exports = {index, show, destroy, create};

