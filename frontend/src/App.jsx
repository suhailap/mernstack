import React from "react";

//react hook to collect data from form and club as json. We need to install this useForm through
//"npm i --save react-hook-form in frontend folder"
import { useForm } from "react-hook-form";

import { useState,useEffect } from "react";
import axios from "axios";

export default function App() {
  const { register, handleSubmit } = useForm(); //useFrom
  const [data, setData] = useState(""); // using state to create a variable named data that is initially a null string
  const [product,setProduct] = useState([])

  const onSubmit = async (data) => {
    //useForm submit function that collects data and store it in "data variable" create by useState above
    setData(data); //setting varibale "data's" value to the form values
    console.log(data); // consoling the form values , which is in json format

    //! sending to backend
    //we are using a npm package called axios. install using npm i axios in frontend folder

    await sendData(data);
  };

  const sendData = async (data) => {
    try {
      const send = await axios.post("http://localhost:4578/addData", data);
      console.log(send);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(()=>{
    getData()
  },[])

const getData = async (data) => {
  try {
    const incomingData = await axios.get("http://localhost:48956/getData")
    console.log(incomingData.data);
    setProduct(incomingData)


  } catch (error) {
    console.log(error);
  }
}

  return (
    <div>
      <h1 className="text-center mt-3 ">
        Data Insert from frontend to Mongodb through backend
      </h1>

      {/* when form gets submitted a function "handleSubmit" gets activates to trigger "onSubmit" function */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Title</label>

        {/* ...register ("field_name") means to collect the data/value inserted by the user through input field and register it in json */}
        <input placeholder="Title" {...register("title")} />

        <label htmlFor="">Price</label>
        <input placeholder="Price" {...register("price")} />

        <label htmlFor="">Image</label>
        <input placeholder="Image" {...register("image")} />

        <button
          className=" flex justify-center p-2 rounded-md w-1/2 self-center bg-gray-900  text-white hover:bg-gray-800"
          type="submit"
        >
          <span>Submit</span>
        </button>
      </form>





    </div>
  );
}