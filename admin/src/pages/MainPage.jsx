import { useNavigate } from "react-router-dom"

const MainPage = () => {
    const navigate = useNavigate()
    return(
        <div className="container">
            <div className="main-page">
                <button onClick={() => navigate('/add-coffee-options')}>Add Coffee Options</button>
                <button onClick={() => navigate('/add-ingredient-options')}>Add Ingredient Options</button>
            </div>
        </div>
    )
}

export default MainPage