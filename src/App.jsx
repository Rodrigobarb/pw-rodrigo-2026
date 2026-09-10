import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenuPublico from "./MenuPublico";
import Login from "./Login";
import Usuario from "./Usuario";
import Home from "./Home";
import MenuPrivado from "./MenuPrivado";
import Categorias from "./Categorias";
import Produtos from "./Produtos";

const router = createBrowserRouter([{
path: "/",
element: <MenuPublico />,
children: [
{
  index: true,
  element: <Home/>,
},
{
path: "usuario",
element: <Usuario/>,
},
{
path: "login",
element: <Login/>,
}
]
    
},
{
path: "/privado",
element: <MenuPrivado />,
children: [
  {
    index: true,
    element: <Home/>,
  },
  {
    path: "usuario",
    element: <Usuario/>,
  },
  {
    path: "categoria",
    element: <Categorias/>,
  },
  {
    path: "produto",
    element: <Produtos/>,
  }
]
}
])

function App() { 
  return(
<RouterProvider router={router} />);
  }

  export default App;
