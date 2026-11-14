import React, { useState, useEffect } from 'react';

export function Dashboard() {
  const [currentInput, setCurrentInput] = useState('0');
  const [previousInput, setPreviousInput] = useState(null);
  const [operation, setOperation] = useState(null);
  const [history, setHistory] = useState([]);
  const [clearDisplay, setClearDisplay] = useState(false);

  useEffect(() => {
    const storedHistory = localStorage.getItem('calculatorHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
  }, [history]);

  const handleDigitClick = (digit) => {
    if (digit === '.') {
      if (currentInput.includes('.')) return;
    }
    if (clearDisplay) {
      setCurrentInput(String(digit === '.' ? '0.' : digit));
      setClearDisplay(false);
    } else {
      setCurrentInput(prev => (prev === '0' && digit !== '.' ? String(digit) : prev + digit));
    }
  };

  const handleOperationClick = (op) => {
    if (currentInput === '0' && previousInput === null) return;

    if (previousInput !== null && operation !== null) {
      handleEqualsClick();
      setPreviousInput(currentInput);
      setClearDisplay(true);
    } else {
      setPreviousInput(currentInput);
      setClearDisplay(true);
    }
    setOperation(op);
  };

  const handleEqualsClick = () => {
    if (previousInput === null || operation === null) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    let result;
    try {
      switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/':
          if (current === 0) {
            setCurrentInput('Error');
            setPreviousInput(null);
            setOperation(null);
            setClearDisplay(true);
            return;
          }
          result = prev / current;
          break;
        default: return;
      }
    } catch (error) {
      setCurrentInput('Error');
      setPreviousInput(null);
      setOperation(null);
      setClearDisplay(true);
      return;
    }

    const newHistoryEntry = `${previousInput} ${operation} ${currentInput} = ${result}`;
    setHistory(prevHistory => [newHistoryEntry, ...prevHistory].slice(0, 10));

    setCurrentInput(String(result));
    setPreviousInput(null);
    setOperation(null);
    setClearDisplay(true);
  };

  const handleClearClick = () => {
    setCurrentInput('0');
    setPreviousInput(null);
    setOperation(null);
    setClearDisplay(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calculatorHistory');
  };

  return (
    <div className="dashboard-content-wrapper">
      <div className="content-section">
        <h3>Welcome to Chinese Ludo!</h3>
        <p>This is your dashboard for managing clients and users.</p>
        <p>Navigate through the sidebar to access different sections of the application.</p>
        <p>This application operates entirely client-side, simulating data operations without a backend.</p>
      </div>

      <div className="calculator-section content-section">
        <h3>Simple Calculator</h3>
        <div className="calculator">
          <div className="calculator-display">
            {operation && <span className="previous-operand">{previousInput} {operation} </span>}
            <span className="current-operand">{currentInput}</span>
          </div>
          <div className="calculator-buttons">
            <button onClick={handleClearClick} className="span-two">AC</button>
            <button onClick={() => handleOperationClick('/')}>/</button>
            <button onClick={() => handleOperationClick('*')}>*</button>
            <button onClick={() => handleDigitClick(7)}>7</button>
            <button onClick={() => handleDigitClick(8)}>8</button>
            <button onClick={() => handleDigitClick(9)}>9</button>
            <button onClick={() => handleOperationClick('-')}>-</button>
            <button onClick={() => handleDigitClick(4)}>4</button>
            <button onClick={() => handleDigitClick(5)}>5</button>
            <button onClick={() => handleDigitClick(6)}>6</button>
            <button onClick={() => handleOperationClick('+')}>+</button>
            <button onClick={() => handleDigitClick(1)}>1</button>
            <button onClick={() => handleDigitClick(2)}>2</button>
            <button onClick={() => handleDigitClick(3)}>3</button>
            <button onClick={handleEqualsClick} className="span-two">=</button>
            <button onClick={() => handleDigitClick(0)}>0</button>
            <button onClick={() => handleDigitClick('.')}>.</button>
          </div>
        </div>
      </div>

      <div className="history-section content-section">
        <h3>Calculation History</h3>
        {history.length > 0 ? (
          <>
            <button onClick={handleClearHistory} className="clear-history-button">Clear History</button>
            <ul className="history-list">
              {history.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))
              .reverse() // Display most recent at top
              }
            </ul>
          </>
        ) : (
          <p>No calculations yet. Perform some calculations above!</p>
        )}
      </div>
    </div>
  );
}
