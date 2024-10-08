import React from 'react'
// leyauts
import HomeLayout from './layouts/HomeLayout'
// pages
import {Home,About,Contact,LikedImg,Nopage,Download,ImageInfo} from './pages'
// routers
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// action
import { action as HomeAction  } from './pages/Home'


const App = () => {

    const routers = createBrowserRouter([
        {
            path:"/",
            element:<HomeLayout/>,
            children:[
                {
                    index:true,
                    element:<Home/>,
                    action:HomeAction
                },
                {
                    path:"about",
                    element:<About/>,
                },
                {
                    path:"contact",
                    element:<Contact/>,
                },
                {
                    path:"download",
                    element:<Download/>,
                },
                {
                    path:"likedimg",
                    element:<LikedImg/>,
                },
                {
                    path:"imageinfo/:id",
                    element:<ImageInfo/>,
                },
                {
                    path:"*",
                    element:<Nopage/>,
                },
                
            ]
        }
    ]
    ) 

  return (
    <>
        <RouterProvider router={routers}/>
    </>
  )
}

export default App