import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import routes from './routes/router';

function App() {
  return <RouterProvider router={createBrowserRouter(routes)}/>
}

export default App;