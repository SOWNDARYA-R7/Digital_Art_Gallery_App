import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from'./Digital_art_gallery_login';

import './D_login.css';

import CreateAccount from './Digital_art_accountCreation';

import './D_accountCreation.css';

import Home from './Digital_art_gallery_home';

import './D_home.css';

import Search from './Digital_art_gallery_search';
import './D_search.css';

function App(){

return(

<BrowserRouter>

<Routes>

  <Route path="/" element={<Login />} />

  <Route path="/signup" element={<CreateAccount />}/>

  <Route path="/home" element={<Home />}/>

  <Route path='/search' element={<Search />}/>

</Routes>

</BrowserRouter>

);

}

export default App;