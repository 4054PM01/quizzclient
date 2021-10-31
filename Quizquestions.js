import { Component } from "react"
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import Button from '@mui/material/Button';
import './QuizQuestions.css'

class QuizQuestions extends Component{
    state={questionData:[], isLoading:false,
    value:0,questionNumber:1, questionsEnded:true,score:0, rightAnswer:0 ,bonus:0}

    componentDidMount(){
        this.goToQuery()
    }

    updateScore=()=>{
        const {match}=this.props
        const {params}=match
        const {id}=params
        const {score,rightAnswer,bonus}=this.state
        console.log(this.props)
        Axios.put("http://localhost:3001/updatescore", {score:score, id:id,rightAnswer:rightAnswer,bonus:bonus})
    .then((response)=>{
        console.log(response)
    })
    }

    getTotalScore=()=>{
        const {score,rightAnswer,bonus}=this.state
        const name=Cookies.get("jwt_token")
        if(score===50){
            this.setState({score:score+20,bonus:20})
        }
        return(
            <>
            <h1 className="view-score-heading">Hi {name} you have totally scored {score} marks and got {rightAnswer} questions right</h1>
            <p  className="view-score-heading">Your bonus is {bonus} marks</p>
            </>)
    }

    getStyle=(event)=>{
        const {questionData,value}=this.state
        const {correctAnswer}=questionData[`${value}`]
        if(event.target.value===correctAnswer){
            this.setState(prevState=>({score:prevState.score+10}))
            this.setState(prevState=>({rightAnswer:prevState.rightAnswer+1}))
            this.changeQuestion()
        }
        else{
            this.changeQuestion()
        }
    }

    changeQuestion=()=>{
        const{value}=this.state
        if(value<=5){
            this.setState(prevState => ({
                value: prevState.value + 1,questionNumber:prevState.questionNumber+1
              }));
        }
        else{
            this.setState({questionsEnded:false})
        }
    }
    goToQuery=async()=>{
        const {match}=this.props
        const {params}=match
        const {category,questions,difficulty}=params
        const url=`https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${difficulty}&type=multiple`
        const options={
            method:"GET"
        }
        const response= await fetch(url,options)
        if(response.ok){
            const fetchedData=await response.json()
            const updatedData=fetchedData.results.map(eachQuestion=>({
                category:eachQuestion.category,
                correctAnswer:eachQuestion.correct_answer,
                difficulty:eachQuestion.difficulty,
                incorrectAnswers:eachQuestion.incorrect_answers,
                question:eachQuestion.question,
            }))
            this.setState({questionData:updatedData, isLoading:true})
        }
    }

   renderLoading=()=>(
    <Loader type="ThreeDots" color="#00BFFF" height="50" width="50"/>
   )
   
   renderPreview=()=>{
       const {questionData,value,questionNumber,score,}=this.state
       const {match}=this.props
        const {params}=match
        const{id,phonenumber}=params
       const name=Cookies.get("jwt_token")
       const buttonName=value<4?"Next Question":"Submit Quizz"
       if(value<=4){
            const {correctAnswer,incorrectAnswers,question}=questionData[`${value}`]
            console.log(correctAnswer)
       incorrectAnswers.push(correctAnswer)
       incorrectAnswers.sort()

       return(
           <div className="quiz-questions-background-container">
           <h1 className="quizz-questions">{question}</h1>
               <div className="quiz-questions-container">
               <h1 className="question-number">{`${questionNumber}/5`}</h1>
           <div className="answers-button">
            {incorrectAnswers.map(eachAnswer=>(
                <Button key ={eachAnswer} onClick={this.getStyle} style={{marginBottom:20, height:50}} variant="contained" value={eachAnswer
                } className="answer-buttons">{eachAnswer}</Button>
            ))}
            </div>
            <Button  onClick={this.changeQuestion}>{buttonName}</Button>
       <h1 className="currentScore">Current Score:{score}</h1>
       <p className="Note">Note Getting all answers right gives you an additional 20marks</p>
            </div>
            
            </div>
            
       )}
       return(
           <div className="View-score-container">
           {this.getTotalScore()}
           {this.updateScore()}
           <Link to={`/${name}/${score}/${id}/${phonenumber}`} className="link-style"><Button variant="contained">View Your Attempts </Button></Link>
           </div>
       )
   }

    render(){
        const {isLoading}=this.state
        console.log(isLoading)
     return isLoading?this.renderPreview():this.renderLoading()
        
    }
}
export default QuizQuestions