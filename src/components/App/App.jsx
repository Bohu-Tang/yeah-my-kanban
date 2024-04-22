import {Route, Routes} from "react-router-dom";
import React,{Suspense} from "react";
import Nav from "../../common/nav/Nav.jsx";
import router from "../../routes/router.js";

function App() {
    return (
        <>
            <Nav></Nav>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {
                        router.map((item, index)=>{
                            return <Route key={index} path={item.path} element={<item.element />}></Route>
                        })
                    }
                </Routes>
            </Suspense>

        </>

    )
}

export default App;