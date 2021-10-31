import { Component } from "react";
import {Link} from 'react-router-dom'
import Cookies from "js-cookie";
import categories from './categories'
import Button from '@mui/material/Button';
import './Quizz.css'


class Quizz extends Component{
    state={difficulty:"easy",category:9, questions:5} 
    changeDifficulty=event=>{
        this.setState({difficulty:event.target.value})
    }

    changeCategory=event=>{
        this.setState({category:event.target.value})
    }

    changeNoOfQuestions=event=>{
        this.setState({questions:event.target.value})
    }

    
    render(){
        const studentname=Cookies.get("jwt_token")
        const {difficulty,category,questions}=this.state 
        const  {match}=this.props
        const {params}=match
        const {id,phonenumber}=params
        return(
            <>
            <div className="Quiz-container">
                <div className="Quiz-card">
                <h1>Select Your Categories {studentname}</h1>
                <label htmlFor="selectCategory" className="Reg-Labels">Select Category</label>
                <select id="selectCategory" onChange={this.changeCategory} className="Reg-TextField" >
                    {categories.map(eachCat=>(
                        <option key={eachCat.id} value={eachCat.id}>{eachCat.name}</option>
                    ))}
                </select>
                <label htmlFor="selectDifficulty" className="Reg-Labels">Select Difficulty</label>
                <select onChange={this.changeDifficulty}  className="Reg-TextField" >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <label htmlFor="selectQuestions" className="Reg-Labels" onChange={this.changeNoOfQuestions}>No of Questions</label>
                    <select id="selectQuestions"  className="Reg-TextField">
                        <option value="5">5</option>
                    </select>
                    <Link to={`/${id}/${phonenumber}/${category}/${difficulty}/${questions}`} className="link-style"><Button variant="contained">Get Questions</Button></Link>
            </div>
            </div>
            </>
        )
    }
}
export default Quizz