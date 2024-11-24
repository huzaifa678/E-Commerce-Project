import React, { useState, useEffect } from 'react';
import Image from "../images/ps5.png";
import Image2 from "../images/iphone15.png";
import { Link } from 'react-router-dom';

function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "The Play Station 5!",
      price: "$200",
      image: Image,
      description: "Experience the next generation of gaming with the Play Station 5."
    },
    {
      id: 2,
      name: "The New iPhone 15!",
      price: "$900",
      image: Image2,
      description: "Discover the latest features and innovations with the new iPhone 15."
    }
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (selectedProduct && !document.getElementById('modal-content').contains(e.target)) {
        closeModal();
      }
    };
    
    if (selectedProduct) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [selectedProduct]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-black py-10 px-8 font-bold text-2xl leading-10 text-center animate-fadeIn">
        We offer a variety of technological items, from game consoles to all types of telecommunication devices, all at very reasonable prices! We hope you find the site helpful and become our customer.
      </h2>

      <h2 className="text-black font-bold px-10 text-center mt-10 text-xl animate-fadeInDelay">
        Here are today's products with a 20% discount!
      </h2>

      <section className="mt-12 flex flex-wrap justify-center gap-8 animate-fadeInDelay">
        {products.map(product => (
          <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 p-4 transform transition-transform hover:scale-105">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <a href="#" className="relative block" onClick={() => handleProductClick(product)}>
                <img src={product.image} alt={product.name} className="w-full h-60 object-cover mb-2 rounded-t-lg transition-transform duration-500 hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                  <p className="text-white font-bold text-xl">Click to view details</p>
                </div>
              </a>
              <h4 className="text-black text-center mt-4 mb-4 font-bold text-lg">
                {product.name}
              </h4>
              <h5 className='px-20 py-2 font-bold text-black text-center'>
                Price: {product.price}
              </h5>
            </div>
          </div>
        ))}
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
          <div id="modal-content" className="bg-white rounded-lg p-6 max-w-lg w-full relative">
            <button className="absolute top-2 right-2 text-black text-2xl" onClick={closeModal}>&times;</button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-60 object-cover rounded-t-lg mb-4" />
            <h3 className="text-black text-center font-bold text-2xl mb-4 cursor-default">{selectedProduct.name}</h3>
            <p className="text-black text-center mb-4 cursor-default">{selectedProduct.description}</p>
            <h4 className='text-black text-center font-bold text-xl cursor-default'>Price: {selectedProduct.price}</h4>
            <div className="text-center mt-6">
              <Link to='/payments'><button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700" onClick={closeModal}>Add to Cart</button></Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

