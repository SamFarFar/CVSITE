
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import TowerPage from './towerPage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
<Route path="/" element={<TowerPage/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App