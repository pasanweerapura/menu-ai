import {useState,useEffect} from "react"
import alanBtn from '@alan-ai/alan-sdk-web';


function App() {


  const [cart,setCart] = useState([])

  const [menuItems,setmenuItems] = useState([])

  useEffect(()=>{
    alanBtn({
      key: '8693c2812dc0c078e5745f0f21fe8c9f2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === "getMenu") {
          setmenuItems(commandData.data)
          console.log(commandData)
         }
         else if (commandData.command === "addToCart") {
          setCart((currentCart) => [...currentCart, commandData.data])
         }
      }
  });
  },[])





  const addToCart=  (menuItem) =>{

    setCart((oldCart)=>{

        return [...oldCart,menuItem]

    })

  }



   return ( <div className="App"> 
  {menuItems.map((menuItem) => (
    <li key={menuItem.name}>
      {menuItem.name} - ${menuItem.price} - {menuItem.category}
      {/* <button onClick={()=>addToCart(menuItem)}>add to cart</button> */}
    </li>
  ))}

  <h2>Cart</h2>
      {cart.map((cartItem) => (
        <li key={cartItem.name}>
          {cartItem.name} - {cartItem.price} - {cartItem.category}
        </li>

))}
  
  </div>
  
)
}

export default App
