import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Spinner from "../components/spinner";

const AddIngredientPage = () => {
    const { sendRequest: sendRequestPOST, loading: loadingRequest } = useRequest({ url: '/api/v1/ingredients', method: 'POST' });
    const { response, loading: loadingFetch, resendRequest } = useFetch({ url: '/api/v1/ingredients', method: 'GET' });
    const {sendRequest: sendRequestDELETE} = useRequest({method: 'DELETE'})
    const [newIngredient, setNewIngredient] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const navigate = useNavigate();
    const ingredientList = response?.items.map(item => {
        return{
          ingredient: item.newIngredient,
          price: item.newPrice,
          id: item._uuid
          }
      }) || []

    const handleIngredientChange = (e) => {
        setNewIngredient(e.target.value);
    };

    const handlePriceChange = (e) => {
        setNewPrice(e.target.value);
    };

    const handleAddIngredient = (e) => {
        e.preventDefault();
        if (newIngredient.trim() === '' || newPrice.trim() === '') {
            alert('Please fill in both fields');
            return;
          }
        sendRequestPOST([{ newIngredient, newPrice }])
            .then(() => {
                setNewIngredient('');
                setNewPrice('')
                console.log(response)
                return resendRequest();
            })
            .catch(error => console.error('Error adding ingredient:', error));
    };

    const handleDelete = (ingredientId) => {
        sendRequestDELETE(null, `/api/v1/ingredients/${ingredientId}`).then(() => resendRequest())
    };

    if (loadingFetch || loadingRequest) return <Spinner />;

    return (
        <div className="container">
            <div className="add">
            <button onClick={() => navigate('/')} className="back">Back</button>
            <form onSubmit={handleAddIngredient} className="add-form">
                <input 
                    type="text"
                    value={newIngredient}
                    placeholder="Add ingredient"
                    onChange={handleIngredientChange}
                />
                  <input 
                    type="text"
                    value={newPrice}
                    placeholder="Add price"
                    onChange={handlePriceChange}
                />
                <button type="submit">Add</button>
            </form>
            <div className="options">
            {ingredientList.map((item) => 
                <div key={item.id} className="option">
                    <h3>{item.ingredient}</h3>
                    <h3>{item.price} GEL</h3>
                    <div className="icons">
                    <FontAwesomeIcon icon={faPenToSquare} className="icon" onClick={() => navigate(`/update-ingredient/${item.id}`)}/>
                    <FontAwesomeIcon icon={faTrash} className="icon" onClick={() => handleDelete(item.id)}/>
                    </div>
                </div>
            )}
            </div>
         </div>
        </div>
    );
};

export default AddIngredientPage;
