import { useState, useEffect } from 'react';
import Formulario from './components/Formulario';

function App() {
  
  const [ busqueda, setBusqueda ] = useState('');


  
  useEffect(() => {

    const consultarApi = async () => {
          
        if (busqueda === '') return;

        const imagenesPorPagina = 30; 
        const key = '22967234-ada95738245f23425f4cfe247';
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

        const rpta = await fetch(url);
        const result = await rpta.json();

        console.log(result);
    }

    consultarApi();

  }, [busqueda])

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario 
              setBusqueda={setBusqueda} />
      </div>
    </div>
  );
}

export default App;
