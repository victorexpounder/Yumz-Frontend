import { HomePage } from "./Pages/HomePage/HomePage";
import {
    BrowserRouter,
    createBrowserRouter,
    Navigate,
    Route,
    RouterProvider,
    Routes,
  } from "react-router-dom";
import { Services } from "./Pages/ServicesPage/Services";
import { Login } from "./Pages/Login/Login";
import { SignUp } from "./Pages/SignUp/SignUp";
import { DashBoard } from "./Pages/DashBoard/DashBoard";
import { Favorites } from "./Pages/Favorites/Favorites";
import { SingleRecipe } from "./Pages/SingleRecipe/SingleRecipe";
import { Profile } from "./Pages/Profile/Profile";

function App(){
    return(
         <div className="container">
            <BrowserRouter>
                <Routes>
                <Route path="/">
                    <Route index element={<HomePage></HomePage>} />
                    <Route path="services" element={<Services></Services>} />
                    <Route path="login" element={<Login></Login>} />
                    <Route path="signUp" element={<SignUp></SignUp>} />
                    <Route path="feed" element={<DashBoard/>} />
                    <Route path="favorites" element={<Favorites/>} />
                    <Route path="recipe Single" element={<SingleRecipe/>} />
                    <Route path="profile" element={<Profile isMine={false}/>} />
                </Route>
                </Routes>
            </BrowserRouter>
            
         </div>

         
    )
}
export default App;