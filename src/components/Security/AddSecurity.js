import React, { useState } from 'react';
import axiosClient from '../axios'

const AddSecurityForm = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [exchange, setExchange] = useState('');
  const [ticker, setTicker] = useState('');
  const [currency, setCurrency] = useState('');


  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      console.log(searchQuery);
      const response = await axiosClient.post('/search', {
        name: searchQuery
      });
      console.log(response);

      console.log(response.data)
      // const jsonData = response.json();
      debugger;
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleSearch = () => {
    // Trigger fetchData when search button is clicked
    fetchData();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/security', {
        name: name,
        description,
        symbol,
        exchange,
        currency,
        ticker
      });
      console.log(response.data); // Assuming the API returns some response
      // Optionally, you can reset the form after successful submission
      setName('');
      setSymbol('');
      setDescription('');
    } catch (error) {
      console.error('Error adding security:', error);
    }
  }

  return (
    <div>

      <h1>Add Security</h1>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search query"
        />
        <button onClick={handleSearch}>Search</button>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>No data found.</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Security Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="symbol">Symbol:</label>
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="exchange">Exchange:</label>
          <input
            type="text"
            id="exchange"
            value={exchange}
            onChange={(e) => setExchange(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="currency">Currency:</label>
          <input
            type="text"
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ticker">Ticker:</label>
          <input
            type="text"
            id="ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form></div>
  );
};

export default AddSecurityForm;