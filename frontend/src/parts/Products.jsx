import React, { useState } from 'react';
import Image from '../images/ps5.png';
import Image2 from '../images/ps4.png';
import Image3 from '../images/sony.png';
import Image4 from '../images/iphone_15_pro_max.png';
import { Link } from 'react-router-dom';

function Products() {
  const [showCategories, setShowCategories] = useState(false);
  const [showPlayStations, setShowPlayStations] = useState(false);
  const [showSmartPhones, setShowSmartPhones] = useState(false);
  const [showCategories2, setShowCategories2] = useState(false);
  const [showIphones, setShowIphones] = useState(false);

  const toggleCategories = () => setShowCategories(!showCategories);
  const toggleSmartPhones = () => setShowSmartPhones(!showSmartPhones);
  const togglePlayStations = () => setShowPlayStations(!showPlayStations);
  const toggleCategories2 = () => setShowCategories2(!showCategories2);
  const toggleIphone = () => setShowIphones(!showIphones);

  const iphoneProducts = [{ id: 1, name: 'Iphone 15 Pro Max', price: '$1300', imageUrl: Image4 }];
  const playStationProducts = [
    { id: 1, name: 'PlayStation 5', price: '$499', imageUrl: Image },
    { id: 2, name: 'PlayStation 4', price: '$299', imageUrl: Image2 },
  ];
  const smartPhoneProducts = [{ id: 1, name: 'Sony Xperia 5', price: '$200', imageUrl: Image3 }];

  const renderProducts = (products) => {
    return (
      <div className="flex space-x-4 overflow-x-auto mt-4">
        {products.map(product => (
          <div key={product.id} className="flex-shrink-0 max-w-xs">
            <Link to='/payments'>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-w-xs rounded-lg cursor-pointer transform transition-transform hover:scale-105"
              />
            </Link>
            <p className="text-center font-semibold mt-2">{product.name}</p>
            <Link to='/payments'>
              <p className="text-center text-gray-600">{product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const categories = (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Categories:</h2>
      <ul className="list-disc pl-5">
        <li className="py-2">
          <button
            className="cursor-pointer rounded transition-transform duration-150 ease-in-out text-black focus:font-semibold hover:font-medium"
            onClick={togglePlayStations}
          >
            Play Stations
          </button>
          {showPlayStations && renderProducts(playStationProducts)}
        </li>
        <li className="py-2">
          <button
            className="cursor-pointer rounded transition-transform duration-150 ease-in-out text-black focus:font-semibold hover:font-medium"
            onClick={toggleSmartPhones}
          >
            Sony's Smart Phones
          </button>
          {showSmartPhones && renderProducts(smartPhoneProducts)}
        </li>
      </ul>
    </div>
  );

  const categories2 = (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Categories:</h2>
      <ul className="list-disc pl-5">
        <li className="py-2">
          <button
            className="cursor-pointer rounded transition-transform duration-150 ease-in-out text-black focus:font-semibold hover:font-medium"
            onClick={toggleIphone}
          >
            iPhones
          </button>
          {showIphones && renderProducts(iphoneProducts)}
        </li>
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto p-8">
      <div className="mt-4 text-black">
        <button
          className="font-bold text-xl cursor-pointer rounded bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95 transition-transform duration-150 ease-in-out"
          onClick={toggleCategories}
        >
          Sony Consoles
        </button>
        {showCategories && categories}
      </div>

      <div className="mt-4 text-black">
        <button
          className="font-bold text-xl cursor-pointer rounded bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95 transition-transform duration-150 ease-in-out"
          onClick={toggleCategories2}
        >
          Apple
        </button>
        {showCategories2 && categories2}
      </div>
    </div>
  );
}

export default Products;


