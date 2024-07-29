import AddCoffeePage from "../pages/AddCoffeePage"
import AddIngredientPage from "../pages/AddIngredientPage"
import MainPage from "../pages/MainPage"
import UpdateCoffeePage from "../pages/UpdateCoffeePage"
import UpdateIngredientPage from "../pages/UpdateIngredientPage"

const routes = [
        {
            element: <MainPage/>,
            path: "/"
        },{
            element: <AddCoffeePage/>,
            path: "/add-coffee-options"
        },{
            element: <AddIngredientPage/>,
            path: "/add-ingredient-options"
        },{
            element: <UpdateCoffeePage/>,
            path: "/update-coffee/:coffeeId"
        },{
            element: <UpdateIngredientPage/>,
            path: "/update-ingredient/:ingredientId"
        }
]

export default routes