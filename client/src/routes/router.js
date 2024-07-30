import React from 'react';
import CoffeeOrder from "../pages/CoffeeOrderPage";
import IngredientOrder from "../pages/IngredientOrderPage";
import MainPage from "../pages/MainPage";
import { CartProvider } from '../components/CartContext';

const routes = [
    {
        element: (
            <CartProvider>
                <MainPage />
            </CartProvider>
        ),
        path: '/'
    },{
        element: (
            <CartProvider>
                <IngredientOrder />
            </CartProvider>
        ),
        path: '/ingredient-order'
    },{
        element: (
            <CartProvider>
                <CoffeeOrder />
            </CartProvider>
        ),
        path: '/coffee-order'
    }
]

export default routes;
