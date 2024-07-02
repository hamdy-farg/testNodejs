const express = require("express");
const  monogs = require("mongoose");

const app = express();

const articale = require("./models/artical.js");



monogs.connect("mongodb+srv://farghamdy:OavjRHMwFDyV6dyw@cluster0.nfiitbr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").
then(()=>{
    console.log("connected successfully");
}).catch((error)=>{

});
//! to return json obj
app.use(express.json());
app.get("/hello", (req, res)=>{

    res.send("hello");
});



app.get("/number", (req, res)=>{
    let number = ""
    for (let i = 0; i <= 100; i++){
        number +=  i +" - "  
    }
    // res.sendFile(__dirname + "/views/number.html") //? to send html file 
    res.render("number.ejs",{
        "name": "Hamdy",
        
    })//? to use ejs extention

});

//! path params
// app.get("/sayHello/number1/number2", (req, res)=>{
//     const num1 = req.params.number1;
//     const num2 = req.params.number2;
//     res.send(`${parseInt(num1) + parseInt(num2)}`)
// });


//! body params 
// app.get("/sayHello", (req, res)=>{
//     console.log(req.body);
//     res.send(`${req.body.name}`)
// });

//! queury params
app.get("/sayHello", (req, res)=>{
    // console.log(req.body);
    // console.log(req.query);
    // res.send(`${req.query.age}`)
    res.json({
        name: req.body.name,
        age: req.query.age
    });
});
app.put("/", (req, res)=>{
    res.send("hello in node js project")
});

app.delete("/testingdelete", (req, res)=>{
    res.send()
});
app.post("/addComment", (req, res)=>{
    res.send("post request on add comment")
});


// ============= ARTICALS END POINT======
app.post("/articles", async (req, res)=>{

    const arttitle = req.body.aritcalTitle;
    const artbody = req.body.articalbody
    res.send(`${req.body.aritcalTitle  } + ${artbody}`)
    const new_articale =  new articale();

    new_articale.title = arttitle;
    new_articale.body = artbody;
    new_articale.number_of_likes = 100;  
    await new_articale.save();


    res.send("the new articale has been stored");
});

app.get( "/articles/:articaleId", async(req,res)=>{
    const id = req.params.articaleId;
    console.log(id);
  try{  

    const  articales = await articale.findById(`${id}`);
    res.json(articales);
return
  }catch (e) {
    console.log("erorr", e)
return res.send("error");
  }

});
app.delete( "/articles/:articaleId", async(req,res)=>{
    const id = req.params.articaleId;
    console.log(id);
  try{  

    const  articales = await articale.findByIdAndDelete(`${id}`);
    res.json(articales);
return
  }catch (e) {
    console.log("erorr", e)
return res.send("error");
  }

});
app.listen(3000, ()=>{
    console.log("I'me listening in port 3000")
});


app.get("/showArticales",async (req, res)=>{
    const articales = await articale.find();
    console.log(articales)
    res.render("articales.ejs", {"articales": articales});

});