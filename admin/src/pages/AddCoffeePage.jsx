import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Spinner from "../components/spinner";

const AddCoffeePage = () => {
    const { sendRequest: sendRequestPOST, loading: loadingRequest } = useRequest({ url: '/api/v1/coffees', method: 'POST' });
    const { response, loading: loadingFetch, resendRequest } = useFetch({ url: '/api/v1/coffees', method: 'GET' });
    const {sendRequest: sendRequestDELETE} = useRequest({method: 'DELETE'})
    const [newCoffee, setNewCoffee] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const navigate = useNavigate();
    const coffeeList = response?.items.map(item => {
        return{
          coffee: item.newCoffee,
          price: item.newPrice,
          id: item._uuid
          }
      }) || []
    
    const handleCoffeeChange = (e) => {
        setNewCoffee(e.target.value);
    };

    const handlePriceChange = (e) => {
        setNewPrice(e.target.value);
    };

    const handleAddCoffee = (e) => {
        e.preventDefault();
        if (newCoffee.trim() === '' || newPrice.trim() === '') {
            alert('Please fill in both fields');
            return;
          }
        sendRequestPOST([{ newCoffee, newPrice }])
            .then(() => {
                setNewCoffee('');
                setNewPrice('');
                console.log(response)
                return resendRequest();
            })
            .catch(error => console.error('Error adding coffee:', error));
    };

    const handleDelete = (coffeeId) => {
        sendRequestDELETE(null, `/api/v1/coffees/${coffeeId}`).then(() => resendRequest())
    };

    if (loadingFetch || loadingRequest) return <Spinner/>;


    return (
        <div className="container">
            <div className="add">
            <button onClick={() => navigate('/')} className="back">Back</button>
            <form onSubmit={handleAddCoffee} className="add-form">
                <input 
                    type="text"
                    value={newCoffee}
                    placeholder="Add coffee"
                    onChange={handleCoffeeChange}
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
           {coffeeList.map((item) => 
                <div key={item.id} className="option">
                        <h3>{item.coffee}</h3>
                        <h4>{item.price} GEL</h4>
                        <div className="icons">
                            <FontAwesomeIcon icon={faPenToSquare}  className="icon" onClick={() => navigate(`/update-coffee/${item.id}`)}/>
                            <FontAwesomeIcon icon={faTrash} className="icon" onClick={() => handleDelete(item.id)}/>
                        </div>
                </div>
            )}  
           </div>
        </div>
        </div>
    );
};

export default AddCoffeePage;
