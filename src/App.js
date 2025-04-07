import './App.css';
import Footer from './components/molecules/Footer';
import Advertisement from './components/molecules/Advertisement';

function App() {
  return (
    <div className="App">
      <div className="page-conteiner">
        <div className="Header-conteiner">
          {/* here must be header */}
        </div>
        <div className="Content-conteiner">
          {/* here must be main content */}
          <div className="Advertisement-conteiner">
          {/* here must be advertisement */}
          </div>
        </div>
        <div className="Footer-conteiner">
          {/* here must be footer */}
        </div>
      </div>
    </div>
  );
}

export default App;
