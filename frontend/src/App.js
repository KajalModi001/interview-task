import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminRegister from './pages/AdminRegister';
import CustomerRegister from './pages/CustomerRegister';
import AdminLogin from './pages/AdminLogin';
import Header from './pages/Header';

function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/adminregister' element={<AdminRegister/>}></Route>
          <Route path='/userregister' element={<CustomerRegister/>}></Route>
          <Route path='/adminlogin' element={<AdminLogin/>}></Route>
        </Routes>
      </BrowserRouter>
      <h3>Note: I used token for verify email and it sent using local backend server so it's only verify mail when backend server is running
        </h3>
    <h4>
    used mysql database<br/><br/>
      first step: create backend api<br/><br/>
      second step: check all api in postman<br/><br/>
      
      third step: create frontend<br/><br/>
      fourth step: implement all api- <br/>
      1. user,admin register which is common but it will set the role of admin and customer, <br/><br/>
      2. admin login api<br/><br/>
      3. verify-email api
    </h4>
    </>
  );
}

export default App;
