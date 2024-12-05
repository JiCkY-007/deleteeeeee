import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'; // If you have CSS for styling

// Your root React component
const App = () => {
  return (
    <div>
      <h1>Hello, Webpack!</h1>
    </div>
  );
};

// Render the App component to the DOM
ReactDOM.render(<App />, document.getElementById('root'));
