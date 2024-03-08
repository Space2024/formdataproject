import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./SearchBar.css";
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import "./SearchBar.css";
import ListGroup from 'react-bootstrap/ListGroup';


function SearchLink({ billNo }) {
    const [datas, setDatas] = useState({ newSupplier: [], imageUrls: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/getdetails/${billNo}`);
                setDatas({ ...response.data });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the async function to fetch data
    }, [billNo]);

    const handleAccept = () => {
        console.log("accepted ");
    };

    const handleReject = () => {
        console.log("rejected  ");
    };

    return (
        <>
          <div className="container mx-auto p-4 flex justify-start">
                <ListGroup className="mt-4">
                    {datas.newSupplier.map((item, index) => (
                        <div key={index}>
                            <ListGroup.Item variant="info">{`SupplierName: ${item.Suppliername}`}</ListGroup.Item>
                            <ListGroup.Item variant="info">{`Billno: ${item.Billno}`}</ListGroup.Item>
                            <ListGroup.Item variant="info">{`Date: ${item.Date}`}</ListGroup.Item>
                            <ListGroup.Item variant="info">{`Mobile Number: ${item.mobileNumber}`}</ListGroup.Item>
                        </div>
                    ))}
                </ListGroup>
            </div>

            {/* <table className='tabledata' >
                {datas.newSupplier.map((item, index) => (
                    <tbody key={index}>
                        <tr>
                            <th className='tablehead'>SupplierName</th>
                            <td>{item.Suppliername}</td>
                        </tr>
                        <tr>
                            <th className='tablehead'>Billno</th>
                            <td>{item.Billno}</td>
                        </tr>
                        <tr>
                            <th className='tablehead'>Date</th>
                            <td>{item.Date}</td>
                        </tr>
                        <tr>
                            <th className='tablehead'>mobileNumber</th>
                            <td>{item.mobileNumber}</td>
                        </tr>
                    </tbody>
                ))}
            </table> */}

            <div className='imagecontainer' style={{ marginLeft: 570 }}>
                {datas.imageUrls.map((url, index) => (
                    <img className="imagedata" key={index} src={url} alt={`Image ${index}`} />
                ))}
            </div>
            <div className="button-container">
                <button type="button" className="btn btn-success accept" onClick={handleAccept}><TiTick /></button>
                <button type="button" className="btn btn-danger reject" onClick={handleReject}><MdCancel /></button>
            </div>
        </>
    );
}

export default SearchLink;
