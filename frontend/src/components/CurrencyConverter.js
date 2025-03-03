import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { inputStyle, buttonStyle } from '../styles/styles';
import { darkTheme } from '../styles/theme';

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_CURRENCY_API_KEY;

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(`https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`);
        const currencyCodes = Object.keys(response.data.data);
        setCurrencies(currencyCodes);
      } catch (err) {
        console.error('Error fetching currencies:', err);
        setError("Failed to load currencies.");
      }
    };
    fetchCurrencies();
  }, [API_KEY]);

  const handleConvert = async () => {
    setError(null);
    try {
        const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${fromCurrency}&currencies=${toCurrency}`);
        if (response.data.data[toCurrency] ) {
            setConvertedAmount(amount * response.data.data[toCurrency]);
        } else {
            setError(`Conversion rate not found for ${fromCurrency} to ${toCurrency}`);
        }
    } catch (err) {
      console.error('Error converting currency:', err);
      setError('Failed to convert currency.');
    }
  };

  return (
    <div style={{ backgroundColor: darkTheme.secondary, padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
      <h2>Currency Converter</h2>
        {error && <div style={{color: darkTheme.danger}}>{error}</div>}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{ ...inputStyle, width: '100px', background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          style={{ ...inputStyle, background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span>to</span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          style={{ ...inputStyle, background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <button onClick={handleConvert} style={{ ...buttonStyle, backgroundColor: darkTheme.primary }}>Convert</button>
      </div>
      <div>
        <p>
          {amount} {fromCurrency} is equal to {convertedAmount.toFixed(2)} {toCurrency}
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
