import Axios from 'axios'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import './GetScore.css'
import { Button } from '@mui/material'
import Cookies from 'js-cookie'


class GetScore extends Component{
    state={marksList:[],isLoading:false}
    componentDidMount(){
        this.getMarks()
    }

    logout=()=>{
        Cookies.remove("jwt_token")
        const {history}=this.props
        history.replace("/")
    }

    getMarks=()=>{
        const {match}=this.props
    const {params}=match
    const {phonenumber,name}=params
      Axios.post("http://localhost:3001/score",{phonenumber:phonenumber,name:name})
        .then((response)=>{
            this.setState({marksList:response.data})
        })
        this.setState({isLoading:true})
    }

    renderPreview=()=>{
        const {marksList}=this.state
        console.log(marksList)
        return(
            <div className="table-container">
            <div className="table-title">
                <h1>Date</h1>
                <h1>Name</h1>
                <h1>Score</h1>
                <h1>Right Answer</h1>
                <h1>Bonus</h1>
            </div>
            {marksList.map(eachMarks=>(
                <div className="table-contents">
                <p className="date">{eachMarks.date}</p>
                <p className="name">{eachMarks.studentname}</p>
                <p className="score">{eachMarks.score}</p>
                <p className="rightAnswer">{eachMarks.rightanswer}</p>
                <p className="bonus">{eachMarks.bonus}</p>
                </div>
            ))}
            <Button variant="contained" onClick={this.logout}>Logout</Button>
            </div>
        )
    }
    renderLoading=()=>(
        <Loader type="ThreeDots" color="#00BFFF" height="50" width="50"/>
       )

    render(){
        const {isLoading}=this.state
        console.log(isLoading)
     return isLoading?this.renderPreview():this.renderLoading()
        
    }
    
}
    
export default GetScore