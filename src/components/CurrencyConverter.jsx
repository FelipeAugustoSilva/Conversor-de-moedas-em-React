import "./CurrencyConverter.css";
import { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {

  const [rates, setRates] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    axios.get("https://v6.exchangerate-api.com/v6/8ff5f2f116a5e175a05c4ec4/latest/USD").then((response) => {
      setRates(response.data.conversion_rates);

    })
    .catch((error) =>{
      console.log("Ocorreu um erro: ", error);
    });
  }, []);

  return (
    <div className="converter">
        <h2>Conversor de Moedas</h2>
        <input type="number" placeholder="Digite o valor..." value={amount}/>
        <span>Selecione as moedas</span>
        <select value={fromCurrency}>
           {Object.keys(rates).map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
           ))}
        </select>
        <span>para</span>
        <select value={toCurrency}>
           {Object.keys(rates).map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
           ))}
        </select>
        <h3>{convertedAmount} {toCurrency}</h3>
        <p>{amount} {fromCurrency} valem {convertedAmount} {toCurrency}</p>
    </div>
  )
}

export default CurrencyConverter