import { HomePage } from "./Pages/HomePage/HomePage";
import {
    BrowserRouter,
    createBrowserRouter,
    Navigate,
    Route,
    RouterProvider,
    Routes,
    useNavigate,
  } from "react-router-dom";
import { Services } from "./Pages/ServicesPage/Services";
import { Login } from "./Pages/Login/Login";
import { SignUp } from "./Pages/SignUp/SignUp";
import { DashBoard } from "./Pages/DashBoard/DashBoard";
import { Favorites } from "./Pages/Favorites/Favorites";
import { SingleRecipe } from "./Pages/SingleRecipe/SingleRecipe";
import { Profile } from "./Pages/Profile/Profile";
import { MealPlanning } from "./Pages/MealPlanning/MealPlanning";
import { useSelector } from "react-redux";
import { Children } from "react";

function App(){

    const currentUser = useSelector((state) => state.user.currentUser);
    
    const RequireAuth = ({children}) =>{
        if (currentUser) return children
        return <Navigate to={'/login'}/>
    }

    const RequireNoAuth = ({children}) =>{
        if (!currentUser) return children
        return <Navigate to={'/feed'}/>
    }
    return(
         <div className="container">
            <BrowserRouter>
                <Routes>
                <Route path="/">
                    <Route index element={<HomePage></HomePage>} />
                    <Route path="services" element={<Services></Services>} />
                    <Route path="login" element={ <RequireNoAuth> <Login></Login> </RequireNoAuth> } />
                    <Route path="signUp" element={<RequireNoAuth> <SignUp></SignUp> </RequireNoAuth> } />
                    <Route path="feed" element={<RequireAuth> <DashBoard/> </RequireAuth> } />
                    <Route path="favorites" element={<RequireAuth> <Favorites/> </RequireAuth> } />
                    <Route path="recipeSingle" element={ <RequireAuth> <SingleRecipe/> </RequireAuth> } />
                    <Route path="profile">
                        <Route index element={<RequireAuth> <Profile isMine={true}/> </RequireAuth> } />
                        <Route path="find/:userID" element={<RequireAuth><Profile isMine={false}/></RequireAuth> } />
                    </Route>
                    <Route path="meal-planning" element={<RequireAuth><MealPlanning/></RequireAuth> } />
                </Route>
                </Routes>
            </BrowserRouter>
            
         </div>

         
    )
}
export default App;