const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const FoodModel = require("./models/Food");

dotenv.config();
app.use(cors());
app.use(express.json());
app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });

  food.save();
  res.json("dodano post");
});

app.get("/", (req, res) => {
  res.send("hello to crud api");
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
  // FoodModel.find({$where: {foodName:"Apple"}},)
});

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;
  // console.log(id);
  await FoodModel.findById(id, (err, updatedFood) => {
    updatedFood.foodName = newFoodName;
    updatedFood.save();
    res.send("update");
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  // const id = req.body.id;
  await FoodModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

// const URL='mongodb://localhost:27017/test'
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Serwer work at ${PORT}`)))
  .catch((error) => console.log(error));

// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();

// const FoodModel = require("./models/Food")

// app.use(express.json)

// mongoose.connect(
//     'mongodb://localhost:27017/test',
//     {
//         useNewUrlParser: true
//     }
// );

// app.get('/',async (req,res)=>{
//     const food = new FoodModel({foodName:'Apple', daysSinceIAte: 3})

//     try {
//         await food.save();
//         console.log('jea');
//     } catch (err) {
//         console.log('propblem');
//     }
// });

// app.listen(5000, ()=>{
//     console.log('Serwer work at 5000');
// });
