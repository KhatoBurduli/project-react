import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import useRequest from "../hooks/useRequest";
import Spinner from "../components/spinner";

const UpdateIngredientPage = () => {
  const navigate = useNavigate();
  const { ingredientId } = useParams();
  const { response, loading, error } = useFetch({ url: `/api/v1/ingredients/${ingredientId}`, method: "GET" });
  const { sendRequest } = useRequest({ url: `/api/v1/ingredients/${ingredientId}`, method: "PUT" });

  const [newIngredient, setNewIngredient] = useState('');
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    if (response) {
      setNewIngredient(response.newIngredient);
      setNewPrice(response.newPrice); 
    }
  }, [response]);

    const handleIngredientChange = (e) => {
        setNewIngredient(e.target.value);
    };

    const handlePriceChange = (e) => {
        setNewPrice(e.target.value);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newIngredient.trim() === '' || newPrice.trim() === '') {
        alert('Please fill in both fields');
        return;
      }
    sendRequest({ newIngredient, newPrice })
      .then(() => navigate("/add-ingredient-options"))
      .catch((err) => console.log(err)); 
  };

  if (loading) return <Spinner/>;
  if (error || !response) return <p>:(</p>;

  return (
    <div className="container">
      <div className="update">
      <button className="back"onClick={() => navigate("/add-ingredient-options")}>Back</button>
      <form className="update-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newIngredient}
          placeholder="Update ingredient"
          onChange={handleIngredientChange}
        />
         <input
          type="text"
          value={newPrice}
          placeholder="Update price"
          onChange={handlePriceChange}
        />
        <button type="submit">Update</button>
      </form>
      </div>
    </div>
  );
};

export default UpdateIngredientPage;

