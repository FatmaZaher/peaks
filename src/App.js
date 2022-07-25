
import './App.scss';
import Home from "./pages/Home"
import BookContextProvider from './contexts/BookContext';


function App() {
  return (
    <div className="App">
      <BookContextProvider>
        <Home />
      </BookContextProvider>
    </div>
  );
}

export default App;
