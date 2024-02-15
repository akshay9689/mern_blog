const express = require("express");

const cors = require('cors')

const mongoose = require('mongoose');
const User = require('./models/User')
const Post = require('./models/Post')
const bcrypt = require('bcrypt')

const exp = express();
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const jwt = require('jsonwebtoken')
const secret = "5uyf4td445dtdhkujb";

const cookieparser = require('cookie-parser')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const fs = require('fs');
//exp.use(express.static('uploads'));
exp.use('/uploads',express.static(__dirname+'/uploads'))

exp.use(cors({credentials:true,origin:'https://blog-frontend-hce6.onrender.com'}));
exp.use(express.json())
exp.use(cookieparser())
mongoose.connect('mongodb+srv://blog:cPnR039pVgOEfd1p@cluster0.6ghps9h.mongodb.net/?retryWrites=true&w=majority')

exp.get('/post', async(req,res) =>{

    res.json(
        await Post.find()
        .populate('author',['username'])
        .sort({createdAt:-1})
        .limit(20)
    );

})


exp.post('/register', async(req, res) =>{

    const {username, password} = req.body;
    try{
const result = await User.create({
    username,
    password:bcrypt.hashSync(password,salt)
})
res.json(result)

    }
    catch(e){
   console.log(e)
   res.status(400).json(e)
    }

})


exp.post('/login', async(req,res) =>{

const {username, password} = req.body;
const result = await User.findOne({username})
const passok = bcrypt.compareSync(password, result.password); // true
  if(passok){

    jwt.sign({username, id:result._id}, secret, {}, (err, token) => {
        if(err) throw err;
        res.cookie('token', token).json({
          id:result._id,
          username
        })
      })

  }
  else{
    res.status(400).json("invalid credential")
  }

})


exp.get('/profile', async(req,res) =>{

  const {token} =  req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });

})

exp.post('/post', upload.single('file'), async(req, res) =>{
   
    const {originalname,path} = req.file;
    const parts = originalname.split('.')
    const ext =parts[parts.length-1]
    const newPath = path+'.'+ext
    fs.renameSync(path, newPath)
   
    const {token} = req.cookies;

    jwt.verify(token, secret, {}, async (err,info) => { 

      if (err) throw err;
      
      const {title, summary, content} = req.body;
      
      const postDoc = await Post.create({
          title,
          summary,
          content,
          cover:newPath,
          author:info.id

      })
  
      res.json(postDoc)
  
     })

})

exp.get('/post/:id', async(req,res)=>{
    const {id} = req.params
    const data = await Post.findById(id).populate('author', ['username']);
    res.json(data)
  })


exp.post('/logout', async(req,res) =>{
    res.cookie('token','').json('ok');
})

exp.put('/post',upload.single('file'), async (req,res) => {
    //console.log(req.body);
    let newPath = null;
    if (req.file) {
      
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ ext;
      fs.renameSync(path, newPath);
  
    }
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {id,title,summary,content} = req.body;
      const postDoc = await Post.findById(id);
      console.log(postDoc);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('you are not the author');
      }
      
      //try{
      await postDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });
      
    // }
    // catch(error){
    //   console.log(error)
    // }
  
      res.json(postDoc);
    });
  
  });
  


exp.listen(4000);