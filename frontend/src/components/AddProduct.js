import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const token = JSON.parse(localStorage.getItem('token'));

        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${token}`
            }
        });
        result = await result.json();
        if (result) {
            navigate('/');
        } else {
            alert('Something went wrong');
        }
    }

    return (
        <div className="product">
            <h1>Add Product</h1>
            <input onChange={(e) => {setName(e.target.value)}} type="text" placeholder="Name"  className="inputBox" value={name}/>
            {error && !name && <span className="invalid-input">Enter Valid Name </span>}
            <input onChange={(e) => {setPrice(e.target.value)}} type="text" placeholder="Price" className="inputBox" value={price}/>
            {error && !price && <span className="invalid-input">Enter Valid Price </span>}
            <input onChange={(e) => {setCategory(e.target.value)}} type="text" placeholder="Category" className="inputBox" value={category}/>
            {error && !category && <span className="invalid-input">Enter Valid Category </span>}
            <input onChange={(e) => {setCompany(e.target.value)}} type="text" placeholder="Company" className="inputBox" value={company}/>
            {error && !company && <span className="invalid-input">Enter Valid Company </span>}
            <button onClick={addProduct} className="appButton">Add Product</button>
        </div>
    )
}

export default AddProduct;
