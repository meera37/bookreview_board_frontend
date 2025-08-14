import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/booklist' element={<BookList/>}/>
        <Route path='/bookdetails/:id' element={<BookDetails/>}/>

      </Routes>
    </>
  )
}

export default App
