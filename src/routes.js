const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const Post = require('./models/Post');

// Listagem dos filmes favoritos
routes.get('/movies', async(req, res)=>{
  const movies = await Post.find();

  return res.json(movies);
})

// criando a lista do filme
routes.post('/movies', multer(multerConfig).single('file'), async (req, res) => {
  const { originalname: name, size, key, location: url = '' } = req.file;
  
  const movies = await Post.create({
    name,
    size,
    key,
    url
  })
  
  
  return res.json(movies);
});

/** e editando o filme
routes.put('/movies/:id', async(req, res) => {
  const movies = await Post.findOne(req.params.id);

  return 

});*/


// deletando o filme
routes.delete('/movies/:id', async(req, res) => {
  const movies = await Post.findById(req.params.id);

  await movies.remove();

  return res.send();
})


module.exports = routes;