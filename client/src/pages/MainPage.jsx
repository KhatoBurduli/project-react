import { useNavigate } from "react-router-dom"

const MainPage = () => {
    const navigate = useNavigate()
    return(
        <div className="container">
            <div className="main-page">
                    <button onClick={() => navigate('/coffee-order')}>Coffee</button>
                    <button onClick={() => navigate('/ingredient-order')}>Ingredients</button>
            </div>
        </div>
    )
}

export default MainPage