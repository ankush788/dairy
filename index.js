//jshint esversion:6
///////////////////////////////////////////
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { response } = require("express");
 const _ = require('lodash');
const path =require("path");
//////////////////////////////////////////////

const homeStartingContent = "Hello! Feels happy to see you here . This  is Daily Journal.  you can use this platform to share your new finding on daily basis “learning is new every day “ you motto .Hope you share and get some Knowledge from here";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//////////////////////////////////////////////
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));

///////////////////////////////////////
let posts =[];
const port = process.env.PORT || 3000;


////////////////////////////////////////
app.get("/", function(req, res){

  
res.render("index",{home_content:homeStartingContent , posts:posts}); 
});

app.get("/about" ,function(req,res)
{
res.render("about",{about_content:aboutContent});
});

app.get("/contact" ,function(req,res)
{
res.render("contact",{contact_content:contactContent});
});


app.get("/compose" ,function(req,res)
{
res.render("compose");
});

/////////////////////////////////////////

app.get('/post/:postName',function(req,res)
{

  for( let post of posts)
{
 let given_title= _.lowerCase(post.title);
 let required_title = _.lowerCase(req.params.postName);

  if( required_title===given_title) 
  { 
 
    res.render("post" ,{ posted:post});
   }  

}

});


///////////////////////////////////////////////
app.post("/compose", function(req,res)
{
   const obj ={
    title:req.body.title,
    post:req.body.post
   }

   posts.push(obj);

   res.redirect("/");
});

////////////////////////////////////////
app.listen(port , function() {
   
  console.log("Server started on port 3000");
});
