import React, { useEffect, useState } from 'react';
import './Productlist.css';
import { Link } from 'react-router-dom';

function Productlist() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const api = async () => {
    try {
      const data = await fetch("https://api.kalpav.com/api/v1/product/category/retail");
      const json = await data.json();
      setProducts(json.response);
      setFilteredProducts(json.response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    api();
  }, []);

  const filterProducts = () => {
    const filtered = products.filter(product =>
      product.productCategory.productCategoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSearch = () => {
    filterProducts();
  };

  return (
    <div>
      {/* Search filter */}
      <div className='stcom'>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Button to trigger search */}
        <button className="btn" onClick={handleSearch}>Search</button>
      </div>

      <div className="h-screen flex flex-wrap gap-5 justify-center items-center mx-20 my-5">
        {/* Display filtered products as cards */}
        {filteredProducts.map((item) => (
          <div key={item.productCategory.productCategoryId} className="flex flex-col border-2 w-[200px] h-[200px] justify-center items-center rounded-md hover:scale-105 hover:cursor-pointer hover:shadow-md transition-all ease-in-out">
            <img className="object-contain h-[150px] p-3 overflow-hidden" src={item.productCategory.productCategoryImage} alt="" />
            <div className="font-bolg text-lg">{item.productCategory.productCategoryName.slice(0, 20)}</div>
          </div>
        ))}
      </div>

      <div>
        {/* Link to the About page */}
        <Link to="/About">
          <button className="bg-yellow-500 w-full font-bold rounded-full mt-7 py-1">About</button>
        </Link>
      </div>
    </div>
  );
}

export default Productlist;
