import './App.css';
import { FaSearch } from 'react-icons/fa';

function App() {
  return (
    <div className="search-box">
      <h1 className="title">Projeto ViaCEP</h1>
      <form>
        <div className='teste'>
          <FaSearch className='icon'/>
          <input type="text" placeholder="Pesquisar..." />
        </div>
        <br />
        <button type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
}

export default App;
