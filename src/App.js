import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './component/Home';
import Books from './component/pages/Books';
import Wishlist from './component/pages/Wishlist';
import Cart from './component/pages/Cart';
import Signin from './component/pages/Signin';
import Signup from './component/pages/Signup';
import Checkout from './component/pages/Checkout';
import NewPassword from './component/pages/NewPassword';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Header />
      <Books />
      <Footer /> */}

      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/new_password' element={<NewPassword/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
