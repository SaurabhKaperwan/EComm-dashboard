import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        });

        result = await result.json();
        navigate('/');
    }

    return (
        <div className="product">
            <h1>Update Product</h1>
            <input onChange={(e) => {setName(e.target.value)}} type="text" placeholder="Name"  className="inputBox" value={name}/>
            <input onChange={(e) => {setPrice(e.target.value)}} type="text" placeholder="Price" className="inputBox" value={price}/>
            <input onChange={(e) => {setCategory(e.target.value)}} type="text" placeholder="Category" className="inputBox" value={category}/>
            <input onChange={(e) => {setCompany(e.target.value)}} type="text" placeholder="Company" className="inputBox" value={company}/>
            <button onClick={updateProduct} className="appButton">Add Product</button>
        </div>
    )
}

export default UpdateProduct;
