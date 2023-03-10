const mongoose=require('mongoose');
const express=require('express');
const app=express();
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json());
const database=module.export=()=>{
    const connectionparams={
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    try{
      mongoose.connect("mongodb+srv://abdullah:hero124421@cluster0.qmfb9vc.mongodb.net/?retryWrites=true&w=majority",
      connectionparams)
      console.log("database sucessfully copnnected");
    }
    catch(error)
    { 
        console.log(error,"error");

    }
}
database();
const schema=mongoose.Schema(
    {
      title:'String',
      content:'String'
    },
    {timestamps:true}
)
const Post=mongoose.model('Post',schema);
app.post('/',async(req,res)=>{
    const {title,content}=req.body;
    try
    {
        const newpost=await Post.create(({title,content}));
        res.json(newpost);
    }
    catch(error)
    {
        res.status(500).send(error)
    }
})
app.get('/',async(req,res)=>{
    try{
    const posts=await Post.find();
    res.json(posts);
    }
    catch(error)
    {
        res.status(500).send(error);
    }
})  
app.get("/:id",async(req,res)=>{
    const {id}=req.params;
    try{
     const posts=await Post.findById(id);
     res.json(posts);
    }
    catch(error)
    {
        res.status(500).send(error);

    }
})
app.delete("/:id",async (req,res)=>{
    const {id}=req.params;
    try{
    const posts=await Post.findByIdAndDelete(id)
     await posts.remove();
     res.send("sucessfully deleted")
    }
    catch(error)
    {
        res.status(500).send(error);
    }
})
app.put("/:id", async (req,res)=>{
    const {id}=req.params;
    const {title,content}=req.body;
    try{
     const posts=await Post.findByIdAndUpdate(id,{title,content});
     res.json(posts);
     res.send("updated sucessfully");
    }
    catch(error)
    {
        res.status(500).send(error);
    }

})
// app.get("/:title",async (req,res)=>{
//     const {title}=req.body;
//     try{
//    const posts=await Post.findOne(title);
//    res.json(posts);

//     }
//     catch(error){
//    res.status(500).send(error);
//     }
// })

app.listen(4000,()=>{
    console.log("running");
})








