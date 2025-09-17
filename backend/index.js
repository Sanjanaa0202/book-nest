const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 6060

// app.use(cors())
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your React app's URL
  credentials: true
}));

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const uri = "mongodb+srv://sanjanaa020206_db_user:Sanj0202@cluster0.0z9mfeb.mongodb.net/nest?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: false,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const nest = client.db("nest");
    const col = nest.collection("signup");

    app.post('/upload', async (req, res) => {
       try {
          const {firstName, lastName, email, password} = req.body;
          console.log(firstName, lastName, email, password," inside upload")
          
          if (!firstName || !lastName || !email || !password) {
            console.log("not registered")
            return res.status(400).json({ success: false, message: "All fields are required" });
          }

          const existingUser = await col.findOne({ email });
          if (existingUser) {
            console.log("user already exists")
            return res.status(409).json({ success: false, message: "User already exists" });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const result = await col.insertOne({
            firstName,
            lastName,
            email,
            password: hashedPassword
          });

          res.status(201).json({ success: true, message: "User registered successfully", userId: result.insertedId });
        }
        catch (error){
          console.error('Error in /upload:', error);
          res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
  );
  
  app.post("/signin", async (req, res) => {
        try {
          const { email, password } = req.body;
          if (!email || !password) {
            console.log("email and password not provided")
            return res.status(400).json({ success: false, message: "Email and password required" });
          }

          const user = await col.findOne({ email });
          if (!user) {
            console.log("user not found")
            return res.status(401).json({ success: false, message: "Invalid email or password" });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            console.log("password does not match")
            return res.status(401).json({ success: false, message: "Invalid email or password" });
          }

          res.status(200).json({ success: true, message: "Login successful", user: { name: user.firstName, email: user.email,_id:user._id } });

        } catch (error) {
              console.error("Error in /login:", error);
              res.status(500).json({ success: false, message: "Server error" });
          }
    }
  );

  app.put("/reset_password", async (req, res) => {
      const { email, newPassword } = req.body;
      if (!email || !newPassword) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
      }

      const user = await col.findOne({email});
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await col.updateOne(
        {email}, 
        {$set: { password: hashedPassword } }
      );

      res.json({message: "Password reset Successful", success: true});
    });
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
  finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(
    port,
    () => console.log(`🚀 Server is running on http://localhost:${port}`)
)