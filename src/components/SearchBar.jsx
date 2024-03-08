import axios from 'axios';
import React, { useState, useRef } from 'react';
import "./SearchBar.css";
import { MdOutlineManageSearch } from "react-icons/md";import 'bootstrap/dist/css/bootstrap.css';
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";

function SearchBar() {
  const [bill, setBillNo] = useState("");
  const [datas, setDatas] = useState({ newSupplier: [], imageUrls: [] });
  console.log(datas.imageUrls)
  // datas.imageUrls.map((url, index)=>console.log(url))

  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setBillNo(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/getdetails/${bill}`);
      setDatas({ ...response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAccept=()=>{
    console.log("accepted ")
  }
  const handleReject=()=>{
    console.log("rejected  ")

  }

  return (
    <>
      <form onSubmit={handleSearch} className='searchform'>
        <input
          placeholder='Enter Bill No'
          type='text'
          ref={inputRef}
          // value={bill}
          onChange={handleInputChange}
          className='searchbox'
        />
        <button type="submit" className='searchbutton'><MdOutlineManageSearch /></button>
        <div className="button-container">
    <button type="button" className="btn btn-success accept" onClick={handleAccept}><TiTick /></button>
    <button type="button" className="btn btn-danger reject"onClick={handleReject}><MdCancel /></button>
  </div>
      </form>
      <table className='tabledata' >
    {datas.newSupplier.map((item) => (
        <tbody>

      <tr key={item._id+1}>
        <th className='tablehead'>SupplierName</th>
        <td>{item.Suppliername}</td>
      </tr>
      <tr key={item._id+2}>
        <th className='tablehead'>Billno</th>
        <td>{item.Billno}</td>
      </tr>
      <tr key={item._id+3}>
        <th className='tablehead'>Date</th>
        <td>{item.Date}</td>
      </tr>
      <tr key={item._id+4}>
        <th className='tablehead'>mobileNumber</th>
        <td>{item.mobileNumber}</td>
      </tr>
      </tbody>

    ))}
</table>

      <div className='imagecontainer'style={{marginLeft:570}}>
        {datas.imageUrls.map((url, index) => {
         return( <><img className="imagedata"key={index} src={url} alt={`Image ${index}`} />
         
         </>
         )
})}  


      </div>
      {/* <img src="image/jpeg;base64,/9j/4AAQSkZJRgABAQEAyADIAAD…P6+lFFRP4WCJfWloorjAQ9KZCQ0akDA9KKKBjj1ooooGf/9k=" alt="" /> */}
    </>
  );
}

export default SearchBar;
