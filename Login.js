import Axios from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react';
import './Login.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login=props=>{
    const [studentname, setName]=useState("")
  const [studentphonenumber, setPhoneNumber]=useState("")
  const [studentclass, setClass]=useState("")
  const [studentSchool,setSchool]=useState("")
  const [studentpinCode,setPincode]=useState("")
  const [responseFrom, setResponse]=useState("")
  const [loginstudentname, setLoginName]=useState("")
  const [loginstudentphonenumber,setLoginPhoneNumber]=useState("")
  const [loginResponse, setLoginResponse]=useState("")

  const register=()=>{
    if (studentname && studentphonenumber && studentclass && studentSchool && studentpinCode !==""){
    Axios.post("http://localhost:3001/register", {studentname:studentname, studentclass:studentclass,phonenumber:studentphonenumber,pincode:studentpinCode,school:studentSchool })
    .then((response)=>{
      console.log(response)
      if(response.data.message){
        setResponse(response.data.message)
      }
      
    })
  }
  else{
    setResponse("Please fill all the required fields")
  }

}
  const login=()=>{
    if(loginstudentname && loginstudentphonenumber!==""){
    Axios.post("http://localhost:3001/login", {loginstudentname:loginstudentname,loginstudentphonenumber:loginstudentphonenumber,studentname:studentname, studentclass:studentclass,phonenumber:studentphonenumber,pincode:studentpinCode,school:studentSchool})
    .then((response)=>{
      Cookies.set("jwt_token",loginstudentname,{expires:2,path:'/'})
      console.log(response)
      if(response.data.message){
        setLoginResponse(response.data.message)
      }
      else{
        setLoginResponse("Succesfully Logged In")
        setTimeout(() => {
          const {history}=props
            history.replace(`/quizz/${response.data[0].id}/${response.data[0].phonenumber}`)
            }, 2000);
      }
    })
  }
  else{
    setLoginResponse("Enter Required")
  }
  setLoginName("")
    setLoginPhoneNumber("")
  }
  return (
    <>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    ></Box>
      
    <div className="Login-container">
      <div className="New-Registration">
      <h1 className="Registration-heading">New Student Registration </h1>
  
     <TextField type="text" placeholder="Phone Number" label="Phone Number" style={{marginBottom:10}} id="PhoneNumber" className="Reg-TextField" value={studentphonenumber}  onChange={(event)=>{
       setPhoneNumber(event.target.value)
     }}/>
     <TextField type="text" placeholder="Name" style={{marginBottom:10}} label="Name" id="Name" className="Reg-TextField" value={studentname} onChange={(event)=>{
       setName(event.target.value)
     }}/>
     <TextField type="text" placeholder="Class" label="Class" id="Class" style={{marginBottom:10}} className="Reg-TextField" value={studentclass} onChange={(event)=>{
       setClass(event.target.value)
     }}/>
     <TextField type="text" placeholder="School Name" label="School Name" id="School" style={{marginBottom:10}} className="Reg-TextField" value={studentSchool} onChange={(event)=>{
       setSchool(event.target.value)
     }}/>
     <TextField type="text" placeholder="Pincode" id="PinCode" label="Pincode" style={{marginBottom:10}} className="Reg-TextField" value={studentpinCode} onChange={(event)=>{
       setPincode(event.target.value)
     }}/>
     <Button variant="contained" onClick={register} style={{marginTop:20,marginBottom:20}}>Register</Button>
     <p style={{color:"red"}}>{responseFrom}</p>
     </div>
     <div className="Already-Registered-container">
       <h1 className="Registered-Heading">Already Registerd</h1>
     <TextField type="text" placeholder="Phone Number" id="RegPhoneNumber" style={{marginBottom:20}}  label="Phone Number" onChange={(event)=>{
       setLoginPhoneNumber(event.target.value)
     }}/>
     <TextField type="text" placeholder="Name" label="Name"  id="RegName"  style={{marginBottom:20}} onChange={(event)=>{
       setLoginName(event.target.value)
     }}/>
     <Button variant="contained" style={{marginBottom:20}} onClick={login}>Login</Button>
     <p style={{color:"red"}}>{loginResponse}</p>
     </div>
    </div>
    </>
    )
}

export default Login