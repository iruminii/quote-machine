import QuotePage from './QuotePage';
import './styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="quote-box" className='quote-container'>
          <QuotePage />
        </div>
      </header>
    </div>
  );
}

export default App;
