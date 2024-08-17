const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const app = express()

// Regular middleware
app.use(express.json());
app.use(cors());

// routers
const landDetailsRouter = require('./routes/landDetails')
app.use('/landDetails', landDetailsRouter)

const SellingLandRouter = require('./routes/SellingLand')
app.use('/SellingLand', SellingLandRouter)

const userDetailsRouter = require('./routes/userDetails')
app.use('/userDetails', userDetailsRouter)

const verifyOtpRouter = require('./routes/verifyOtp')
app.use('/otp', verifyOtpRouter)

const landSchema = new mongoose.Schema({
    name: String,
    area: Number,
    state: String,
    district: String,
    taluka: String,
    price: Number,
    PID: String,
    survay: String,
    status:{
      type:Number,
      default:0
    }
  });
  
  // Create a Model
  const Land = mongoose.model("Land", landSchema);
  app.post("/add/lands", async (req, res) => {
    try {
      console.log(req.body)
      await Land.create({
        name:req.body.name,
        area:req.body.area,
        state:req.body.state,
        district:req.body.district,
        taluka:req.body.taluka,
        price:req.body.price,
        PID:req.body.PID,
        survay:req.body.survay,
      });
      res.status(201).json('success');
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.get('/lands/fetch',async(req,res)=>{
    try {
        const {status} = req.query;
        if(status){
          const fetchedLands = await Land.find({status:Number(status)});
          return res.status(200).json(fetchedLands);
        }
        const fetchedLands = await Land.find();
        return res.status(200).json(fetchedLands);
    } catch (error) {
      res.status(400).json({ message: err.message });
        
    }
  })

  app.put('/lands/update/:pid',async(req,res)=>{
    try {
      const {pid} = req.params;
      const doc = await Land.findOne({PID:pid});
      console.log(doc)
      doc.status=1;
      await doc.save();
      return res.status(200).send('done');
  } catch (error) {
    res.status(400).json({ message: err.message });
      
  }
  })
// PORT
const port = process.env.PORT || 8000;

// MONGODB Connect
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log(`DB connected successfully`))
.catch(error =>{
    console.log(`DB connection failed`);
    console.log(error);
    process.exit(1);
})

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});