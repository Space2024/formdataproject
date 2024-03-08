import './App.css';
import FormToCredit from './components/FormToCredit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchLink from './components/SearchLink';
import { useState } from 'react';

function App() {
  const [billNo, setBillNo] = useState('');

  const handleBillNoChange = (newBillNo) => {
    setBillNo(newBillNo);
  };
  // onBillNoChange={handleBillNoChange} 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FormToCredit onBillNoChange={handleBillNoChange}/>} />
          <Route path='/search' element={<SearchBar />} />
          
          <Route path='/searchlink/' element={<SearchLink billNo={billNo} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
