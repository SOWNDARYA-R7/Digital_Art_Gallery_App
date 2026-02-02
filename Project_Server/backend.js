const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require('./models/Post');
// const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(cors());
app.use(express.json({limit:"20mb",extended:true}));


const mongoUrl = "mongodb://127.0.0.1:27017/Digital_gallery";

mongoose.connect(mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.get("/", (req, res) => {
  res.send("Backend is Working");
});
app.get("/user/:username",async(req,res)=>{
  const user = await User.findOne({ username: req.params.username});
  res.json(user);
});

app.get("/posts/users/:username", async (req, res) => {
  try {
    const posts = await Post.find({ owner: req.params.username })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error("Fetch user posts error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Fetch all posts error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  console.log("/Logedin");
  console.log(req.body);

  try {
    const { logininfo, password } = req.body;

    if (!logininfo || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const user = await User.findOne({
      $or: [
        { email: logininfo },
        { phoneNumber: logininfo }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      message: "Login successful",
      username: user.username
    });
  } catch (error) {
    console.error("Login error", error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/signup", async (req, res) => {
  console.log("/signedup");

  try {
    const { username, email, phoneNumber, password, birthday, bornPlace } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password required"
      });
    }

    const newUser = await User.create({
      username,
      email,
      phoneNumber,
      password,
      birthday,
      bornPlace
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser
    });
  } catch (error) {
    console.error("Signup Error:", error.message);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    return res.status(500).json({
      message: "Server error"
    });
  }
});

app.post("/forgetPassword",async(req,res)=>{
try{
  const {email,bornPlace,newPassword} = req.body;

  const user = await User.findOne({email,bornPlace});

  if(!user){
    return res.status(400).json({ message:"Invalid username or Security key" })
  }
  user.password = newPassword;
  await user.save();
  res.json({message:"New Password Upadated"});
}
catch(error){
  console.error("Error:", error.message);
  res.status(500).json({message:"Server error"});
}
});

app.post("/posts", async (req, res) => {
  try {
    const { image, caption, style, owner } = req.body;

    if (!image || !caption || !style || !owner) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPost = await Post.create({
      image,
      caption,
      style,
      owner,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/posts/:id",async(req,res) => {
  try{
    const postId = req.params.id;
    const deleted = await Post.findByIdAndDelete(postId);
    if(!deleted){
      return res.status(404).json({message:"Post not Found"});
    }
    res.json({message:"Post Deleted"});
  }
  catch(err){
    console.error("Deleted Error:",err);
    res.status(500).json({message:"Server error"});
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});