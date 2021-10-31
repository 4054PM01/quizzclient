
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Quizz from './Quizz'
import QuizQuestions from './Quizquestions'
import GetScore from './GetScore'
import ProtectedRoute from './ProtectedRoute'
import NotFound from './NotFound'
import './App.css';

function App() {
return(
    <BrowserRouter>
    <Switch>
      <ProtectedRoute exact path="/"  component={Home}/>
      <Route exact path="/login" component={Login}/>
      <ProtectedRoute exact path="/quizz/:id/:phonenumber/" component={Quizz}/>
      <ProtectedRoute exact path="/:id/:phonenumber/:category/:difficulty/:questions" component={QuizQuestions}/>
      <ProtectedRoute exact path="/:name/:score/:id/:phonenumber" component={GetScore}/>
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
    </BrowserRouter>
)
}

export default App;

