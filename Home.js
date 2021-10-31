import './Home.css'
import Button from '@mui/material/Button';
const Home=props=>{
    const goToLogin=()=>{
        const {history}=props
        history.replace("/login")
    }
    return(
    <div className="Home-container">
        <div className="student-card-container">
        <h1 className="Welcome-heading">Welcome To Quizz Student</h1>
        <Button variant="contained" onClick={goToLogin}>Register or Login</Button>
        </div>
    </div>)
}

export default Home