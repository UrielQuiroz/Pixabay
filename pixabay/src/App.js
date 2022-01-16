import { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
  
  const [ busqueda, setBusqueda ] = useState('');
  const [ imagenes, setImagenes ] = useState([]);

  //Paginador
  const [ paginaActual, setPaginaActual ] = useState(1);
  const [ totalPaginas, setTotalPaginas ] = useState(1);
  
  useEffect(() => {

    const consultarApi = async () => {
          
        if (busqueda === '') return;

        const imagenesPorPagina = 30; 
        const key = '22967234-ada95738245f23425f4cfe247';
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

        const rpta = await fetch(url);
        const result = await rpta.json();

        setImagenes(result.hits);

        //Calcular el total de paginas
        const totalPaginasCalculadas = Math.ceil(result.totalHits / imagenesPorPagina);
        setTotalPaginas(totalPaginasCalculadas);

        //Mover la pantalla hacia arriba
        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({ behavior: 'smooth' })
    }

    consultarApi();

  }, [busqueda, paginaActual])


  //Definir la pagina anterior
  const paginaAnterior = () => {
      const nuevaPaginaActual = paginaActual - 1;
      if (nuevaPaginaActual === 0) return;  

      setPaginaActual(nuevaPaginaActual);
  }

  //Definir la pagina siguiente
  const paginaSiguiente = () => {
      const nuevaPaginaActual = paginaActual + 1;
      if (nuevaPaginaActual > totalPaginas) return;  

      setPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
            <p className="lead text-center">Buscador de imagenes</p>
            <Formulario 
                  setBusqueda={setBusqueda} />
      </div>

      <div className='row justify-content-center'>
          <ListadoImagenes
                  imagenes={imagenes} />

          {(paginaActual === 1) ? null : (
                <button
                type='button'
                className='bbtn btn-info mr-1'
                onClick={paginaAnterior} >
                  &laquo; Anterior
                </button>
          )}

          { (paginaActual === totalPaginas) ? null : (
                <button
                type='button'
                className='bbtn btn-info'
                onClick={paginaSiguiente} >
                  &raquo; Siguiente
                </button>
          )}

      </div>

    </div>
  );
}

export default App;
