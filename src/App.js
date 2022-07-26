
import './App.scss';
import Home from "./pages/Home"
import {GlobalProvider} from './contexts/BookContext';


function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Home />
      </GlobalProvider>
    </div>
  );
}

export default App;
