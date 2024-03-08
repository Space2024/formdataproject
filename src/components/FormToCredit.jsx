import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import {  useNavigate  } from 'react-router-dom'; 
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function FormToCredit({onBillNoChange}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Billno: '',
    Date: '',
    Suppliername: '',
    mobileNumber: '',
  });
  
  const [files, setFiles] = useState([]);

  const[resData,setResData]=useState({})
  
  const notify = () => toast(resData.message);

  // console.log(files)
  const formDataSchema = Yup.object().shape({
    Suppliername: Yup.string()
                .required("Suppliername is required"),
    password: Yup.string()
        .min(3, "Password must be 3 characters at minimum")
        .required("Password is required"),
});

  // Handle changes in input fields
  const handleInputChange = async(e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
   
  };
  const handleImageChange=(e)=>{
    
    setFiles([...files,...e.target.files]);

    console.log(files)


  }

  // Handle form submission
  const handleSubmit = async(e) => {
    
    e.preventDefault();


    try {

        const formDataToSend = new FormData();
        formDataToSend.append('Billno', formData.Billno);
        formDataToSend.append('Date', formData.Date);
        formDataToSend.append('Suppliername', formData.Suppliername);
        formDataToSend.append('mobileNumber', formData.mobileNumber);
        files.forEach((file) => {
          formDataToSend.append('images', file);
        });
        
  
        const res = await axios.post('http://localhost:8000/datapost', formDataToSend);
        console.log(res);
        setResData(res.data)
     if(res.status===200){
   
      const response =axios.get(`http://localhost:8000/send-sms/${formData.Billno}`)
      onBillNoChange(formData.Billno);

      navigate("/searchlink");    
      // navigate("/search")
    
    }
      
        }
     catch (error) {
      console.log(error.message)
     }    
    //  console.log('Form data submitted:', formData);

    // console.log(res)
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form" encType='multipart/form-data'>
      <label>Supplier Name:</label>
        <input
          type="text"
          name="Suppliername"
          placeholder="Enter Supplier Name"
          value={formData.Suppliername}
          onChange={handleInputChange}
        />

<br />

        <label>Bill No:</label>
        <input
          type="text"
          name="Billno"
          placeholder="Enter Bill No:"
          value={formData.Billno}
          onChange={handleInputChange}
        />

        <label>Date:</label>
        <input
          type="date"
          name="Date"
          value={formData.Date}
          onChange={handleInputChange}
        />

        <br />


        <label>Mobile Number:</label>
        <input
          type="text"
          name="mobileNumber"
          placeholder="Phone Number"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          
        />

        <br />

        {/* File upload inputs */}
        <input multiple type="file" accept="image/*"className="upload"onChange={handleImageChange}

 />
        {/* <input type="file" accept="image/*"className="upload"onChange={handleImageChange}/> */}

        {/* Submit button */}
        <button type="submit" className='submit-button'onClick={notify}>Submit</button>
        <ToastContainer style={{color:'black'}}/>
        {/* <Link to="/search" id='searchpage'style={{textDecoration:"none"}}>Go to Search Page</Link> */}
      </form>
      {/* <div>
      {files.map((file, index) => (
        <div key={index}>
          <img
            src={URL.createObjectURL(file)}
            alt={`Uploaded Image ${index + 1}`}
            style={{ maxWidth: '200px' }} // Adjust styling as needed
          />
        </div>
      ))}
     
      </div> */}
      
    
    </>
  );
}

export default FormToCredit;
