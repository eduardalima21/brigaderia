const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
var Usuario = require('./model/usuario');
var Doce = require('./model/doce');

var upload = require('./config/configMulter.js');
const mongoose = require ('mongoose')
const url ="mongodb+srv://eduardarodriues:ritavirila@brigaderia.kisgfjd.mongodb.net/?retryWrites=true&w=majority"

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res) {
    Usuario.find({}).exec(function (err, docs) {
        res.render('index.ejs', { Usuarios: docs });
    })

})

app.post('/doces', upload.none(), async function (req, res) {
    console.log(req.body)
    const nome = req.body.txtNome;
    console.log(nome)
  
    try {
      // Cria um novo objeto Doce
      const novoDoce = new Doce({
        nome: nome
      });
  
      // Salva o novo doce no banco de dados
      const doceSalvo = await novoDoce.save();
  
      console.log('Doce criado com sucesso:', doceSalvo);
      // res.status(200).send('Doce criado com sucesso');
    } catch (err) {
      console.error('Erro ao criar o doce:', err);
      res.status(500).send('Erro ao criar o doce');
    }
  });



app.get('/add', function (req, res) {
    res.render('adiciona.ejs')
});


app.get('/del/:id', function (req, res) {
    Usuario.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            console.log()
        } else {
            res.redirect('/')
        }
    })
})
app.get('/edit/:id', function (req, res) {
    Usuario.findById(req.params.id, function (err, docs) {
        if (err) {
            console.log(err)
        } else {

        }
        res.render('edita.ejs', { Usuario: docs })
    })

})
app.post('/edit/:id',upload.single("txtFoto"), function (req, res) {
    Usuario.findByIdUpdate(req.params.id, 
        { 
        nome: req.body.txtNome, 
        email: req.body.txtEmail, 
        senha: req.body.txtSenha, 
        foto: req.file.filename
    },function(err,docs){
        res.redirect('/')
    }
    )
})

app.get('/usuarios-dale', (req, res) => {
    // Criar um usuário falso
    const novoUsuario = new Usuario({
      nome: 'João',
      email: 'joao@example.com',
      idade: 25
    });
  
    // Salvar o usuário no banco de dados
    novoUsuario.save()
      .then(usuario => {
        res.json(usuario); // Retornar o usuário criado como resposta
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Ocorreu um erro ao criar o usuário' });
      });
  });

app.listen(3000, function () {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso');
    console.log("conexão inicializada http://localhost:3000");
  })
   
})
