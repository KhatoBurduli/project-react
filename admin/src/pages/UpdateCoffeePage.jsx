import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import useRequest from "../hooks/useRequest";
import Spinner from "../components/spinner";

const UpdateCoffeePage = () => {
  const navigate = useNavigate();
  const { coffeeId } = useParams();
  const { response, loading, error } = useFetch({ url: `/api/v1/coffees/${coffeeId}`, method: "GET" });
  const { sendRequest } = useRequest({ url: `/api/v1/coffees/${coffeeId}`, method: "PUT" });

  const [newCoffee, setNewCoffee] = useState('');
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    if (response) {
      setNewCoffee(response.newCoffee);
      setNewPrice(response.newPrice); 
    }
  }, [response]);

    const handleCoffeeChange = (e) => {
        setNewCoffee(e.target.value);
    };

    const handlePriceChange = (e) => {
        setNewPrice(e.target.value);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCoffee.trim() === '' || newPrice.trim() === '') {
        alert('Please fill in both fields');
        return;
      }
    sendRequest({ newCoffee, newPrice }) 
      .then(() => navigate("/add-coffee-options")) 
      .catch((err) => console.log(err)); 
  };

  if (loading) return <Spinner />;
  if (error || !response) return <p>:(</p>;

  return (
    <div className="container">
      <div className="update">
      <button className="back" onClick={() => navigate("/add-coffee-options")}>Back</button>
      <form className="update-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newCoffee}
          placeholder="Update coffee"
          onChange={handleCoffeeChange}
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

export default UpdateCoffeePage;

