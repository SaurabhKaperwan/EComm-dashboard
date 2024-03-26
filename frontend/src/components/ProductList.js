import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const ProductList = () => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            console.log("running");
            const userId = JSON.parse(localStorage.getItem('user'))._id;
            const token = JSON.parse(localStorage.getItem('token'));
            const url = `http://localhost:5000/products?userId=${userId}`;
            console.log(token);

            let result = await fetch(url, {
                headers: {
                    authorization: `bearer ${token}`
                }
            });

            if (!result.ok) {
                alert("Failed to fetch products");
            }

            result = await result.json();
            setProducts(result);
        } catch (error) {
            console.log("Error fetching products", error);
        }
    }

    const deleteProduct = async (id) => {
        let response = await fetch("http://localhost:5000/product/" + id, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        if (response.ok) {
            let result = await response.json();
            if (result) {
                getProducts();
            }
        }
    };

    const searchHandle = async (event) => {
        let key = event.target.value;
        let token = JSON.parse(localStorage.getItem('token'));

        if (key) {
            try {
                let result = await fetch(`http://localhost:5000/search/${key}`, {
                    headers: {
                        authorization: `bearer ${token}`
                    }
                });

                if (result.ok) {
                    setProducts(await result.json());
                } else {
                    throw new Error('Failed to fetch search results');
                }
            } catch (error) {
                console.error('Error searching products:', error);
            }
        } else {
            getProducts();
        }
    }


    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input onChange={searchHandle} type="text" placeholder="Search Product" className="search-product-box" />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                 products.length > 0 ? products.map((item, index) =>(
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                        <button onClick={() => deleteProduct(item._id)}>Delete</button>
                        <Link to={"/update/" + item._id}>Update</Link>
                        </li>
                    </ul>
                ))
                 :<h1>No Record Found</h1>
            }
        </div>
    )
}

export default ProductList;
