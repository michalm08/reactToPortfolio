
//https://www.youtube.com/watch?v=wgGkF4k9c7A
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import './App.css';
// import { update } from "../../server/models/Food";

// const url = "http://localhost:5000"
const url = "https://crud5-01.herokuapp.com"
function App() {
  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [newFoodName, setNewFoodName] = useState('')
  const [foodList, setFoodList] = useState([])

  useEffect(()=>{
    Axios.get(`${url}/read`).then((response)=>{
      if(foodList!==response.data){
        setFoodList(response.data)
        
      }
    })
  },[foodList])

  const addToList = () =>{
    console.log(foodName+days);
    Axios.post(`${url}/insert`, {
      foodName: foodName,
      days: days,
    })
  };

  const updateFood=(id)=>{
    Axios.put(`${url}/update`,{
      id:id, 
      newFoodName:newFoodName
    })
  }

  const deleteFood=(id)=>{
    Axios.delete(`${url}/delete/${id}`,{
      // id:id, 
      // newFoodName:newFoodName
    })
  }


  return (
    <div className="App">
      <h1>Crud app with mern</h1>

      <label>Food Name:</label>
      <input 
      type="text" 
      onChange={(event)=>{
         setFoodName(event.target.value)
        }} 
      />
      <label>Day since You Ate It:</label>
      <input 
        type="number" 
        onChange={(event)=>{
          setDays(event.target.value)
          }} 
        />
      <button onClick={addToList} >Add To list</button>
      
      <h1>FoodList</h1>

      {foodList.map((val,key) => {
        return (
        <div key={key} className='food'>
          <h1>{val.foodName}</h1>
          <h1>{val.daysSinceIAte}</h1>
          <input 
          type="text" 
          placeholder="New Food Name..." 
          onChange={(event)=>{
            setNewFoodName(event.target.value)
          }} />
          <button onClick={()=>updateFood(val._id)}>Update</button>
          <button onClick={()=>deleteFood(val._id)}>Delete</button>
        </div>
        )
      })}

    </div>
  );
}

export default App;
