import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import counterReducer from './reducer';

const store = createStore(counterReducer);

function App({ store }) {
  return (
    <div>
      <div>
        <button onClick={(e) => store.dispatch({ type: 'GOOD' })}>good</button>
        <button onClick={(e) => store.dispatch({ type: 'OK' })}>ok</button>
        <button onClick={(e) => store.dispatch({ type: 'BAD' })}>bad</button>
        <button onClick={(e) => store.dispatch({ type: 'ZERO' })}>reset</button>
      </div>
      <div>good: {store.getState().good}</div>
      <div>ok: {store.getState().ok}</div>
      <div>bad: {store.getState().bad}</div>
    </div>
  );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App store={store} />);
};

renderApp();
store.subscribe(renderApp);
