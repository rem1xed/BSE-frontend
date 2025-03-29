import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="page-conteiner">
        <div className="Header-conteiner">
          {/* here must be header */}
        </div>
        <div className="Content-conteiner">
          {/* here must be content */}
        </div>
        <div className="Footer-conteiner">
          <Footer />

        </div>
      </div>
    </div>
  );
}

export default App;
