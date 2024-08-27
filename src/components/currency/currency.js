import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyGrid from './currencygrid';

const App = () => (
    <div>
        <h1>Currency Management</h1>
        <CurrencyGrid />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
