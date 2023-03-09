import './App.css';
import InputMask from 'react-input-mask';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface Cep {
  cep: string;
  logradouro: string;
  complemento: string | void;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string | void;
  ddd: string;
  siafi: string;
}

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState<Cep | null>(null);
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleClick = async () => {
    try {
      setCep(null);
      
      const response = await axios.get(`http://localhost:3333/viacep?cep=${input}`);

      if (!response.data.message) {
        setCep(response.data);
        setInput('');
      } else {
        toast.error('Não foi possível encontrar o CEP informado.', {
          progressStyle: {
            background: 'darkorange'
          }
        });
      }
    } catch (err: any) {
      toast('CEP Inválido! Tente novamente.', {
        progressStyle: {
          background: 'darkorange'
        }
      });
    }
  }

  return (
    <div className="search-box">
      <h1 className="title">Projeto ViaCEP</h1>
      <form onSubmit={handleSubmit}>
        <div className='input'>
          <FaSearch className='icon'/>
          <InputMask mask="99999-999" placeholder='Pesquisar...' className='search-input' onChange={handleSubmit} value={input} />
        </div>
        <br />
        <button type="submit" onClick={handleClick}>
          Buscar
        </button>
      </form>

      {cep ? (
        <div className='responses'>
          <div className='styles'>
            <h2>Informações do CEP:</h2>
            <p><strong>Rua:</strong> {cep.logradouro ? cep.logradouro : 'Não registrado'}</p>
            <p><strong>Bairro:</strong> {cep.bairro ? cep.bairro : 'Não registrado'}</p>
            <p><strong>CEP:</strong> {cep.cep ? cep.cep : 'Não registrado'}</p>
            <p><strong>Cidade/Estado:</strong> {cep.localidade ? cep.localidade : 'Não registrado'} - {cep.uf ? cep.uf : 'Não registrado'}</p>
            <p><strong>Complemento:</strong> {cep.complemento ? cep.complemento : 'Não registrado'}</p>
            <p><strong>DDD:</strong> {cep.ddd ? cep.ddd : 'Não registrado'}</p>
            <p><strong>IBGE:</strong> {cep.ibge ? cep.ibge : 'Não registrado'}</p>
            <p><strong>Siafi:</strong> {cep.siafi ? cep.siafi : 'Não registrado'}</p>
            <p><strong>Gia:</strong> {cep.gia ? cep.gia : 'Não registrado'}</p>
          </div>
        </div>
      ) : null}
      <ToastContainer 
        autoClose={3000} 
        theme='light'
      />
    </div>
  );
}

export default App;
