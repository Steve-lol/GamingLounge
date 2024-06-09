import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../pages/marquee.css';
import { toast } from 'react-toastify';

const Shop = () => {
  
  const [buydata, setBuyData] = useState([]);
  const [selldata, setSellData] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [filteredBuyData, setFilteredBuyData] = useState([]);
  const [filteredSellData, setFilteredSellData] = useState([]);

  useEffect(() => {
    setFilteredBuyData(buydata.filter(item => item._id.includes(searchId)));
    setFilteredSellData(selldata.filter(item => item._id.includes(searchId)));
  }, [searchId, buydata, selldata]);


  useEffect(() => {
    try {
      axios.get("api/shop/buyaccount").then(res => setBuyData(res.data));
      axios.get("api/shop/sellaccount").then(res => setSellData(res.data));
    } catch (error) {
      console.log(error);
    }

  }, []);

  const approveSellData = async (id) => {
    try {
      const response = await axios.put(`/api/shop/sell/approve/${id}`);
      console.log(response.data); // Assuming the response indicates success
      toast.success('Account approved to sell!');
      return response.data; // You can handle the response data as needed
    } catch (error) {
      toast.error('Error approving sell data:', error);
      throw error; // You can handle errors as needed
    }
  };
  const approvebuyData = async (id) => {
    try {
      const response = await axios.put(`/api/shop/buy/approve/${id}`);
      console.log(response.data); // Assuming the response indicates success
      toast.success('Account request approved!');
      return response.data; // You can handle the response data as needed
    } catch (error) {
      toast.error('Error approving sell data:', error);
      throw error; // You can handle errors as needed
    }
  };

  async function HandleBuyDelete(id) {
    console.log(id)
    try {
      const response = await axios.delete(`api/shop/delete/${id}`);
      console.log(response);
      window.location.reload();

    } catch (error) {
      toast.error(error);
    }
  }

  async function HandleSellDelete(id) {
    console.log(id)
    try {
      const response = await axios.delete(`api/shop/sellaccount/delete/${id}`);
      // console.log(response);
      window.location.reload();

    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div className="mt-12 mx-auto py-8">
      <div className="max-w-screen-lg mx-auto bg-[#2f323a] rounded-lg shadow-lg p-8">
        Search For Accounts:
        <div className='mb-6 flex flex-row-2 gap-4'>
          <input
            placeholder="ID"
            className="pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          /></div>
        <div className="mb-8 p-4 rounded-lg bg-main-dark-bg">
          <h1 className="font-bold text-white text-2xl mb-4">Requested Accounts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBuyData.map((item) => (

              <div key={item.id} className="flex flex-col h-fit bg-form-bg text-gray-500 text-sm p-4 rounded-lg hover:scale-105 transition ease-in-out duration-500 hover:cursor-pointer">
                <div className="font-semibold text-white text-lg">{item.gameTitle}</div>
                <div className="text-blue-700">Username: {item.username}</div>
                <div className="marquee-container">
                  <span className="marquee-text">ID: {item._id}</span>
                </div>
                <div>Account Level: {item.accountLevel}</div>
                <div>InGame Currency: {item.inGameCurrency}</div>
                <div>Platform: {item.platform}</div>
                <div>despcription: {item.description}</div>

                {
                  item.approved.toString() === "true" ? (
                    <div>
                      <span role="img" aria-label="Safe Sign">✅</span> Approved
                    </div>

                  ) : (
                    <div>
                      <span role="img" aria-label="Warning Sign">⚠️</span> Not Approved
                    </div>
                  )
                }
                <div>Rare Items:</div>
                <ul>
                  {item.rareItems.map((rareItem, index) => (
                    <li key={index}>{rareItem}</li>
                  ))}
                </ul>
                <div className="font-semibold text-blue-700">{item.price}rs</div>
                <div className='mt-2 flex flex-row-2'>
                  <button onClick={() => approvebuyData(item._id)}
                    className={`bg-dark-bg w-full border border-gray-300 rounded-lg shadow-md m-1 px-2 py-1 text-sm font-medium text-white hover:bg-slate-800 hover:border-slate-800 transition-all ${item.approved ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={item.approved}
                  >Approve</button>
                  <button
                    className='bg-red-600 w-full  rounded-lg shadow-md m-1 px-2 py-1 text-sm font-medium text-white transition-all'
                    onClick={() => HandleBuyDelete(item._id)} >
                    Delete
                  </button>
                </div>
              </div>
            )
            )} {filteredBuyData.length === 0 && <p className="">ID not found</p>}
          </div>
        </div>


        <div className="p-4 rounded-lg bg-main-dark-bg">
          <h1 className="font-bold text-white text-2xl mb-4">Accounts For Sale</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSellData.map((item) => (

              <div key={item.id} className="flex flex-col h-full bg-form-bg text-gray-500 text-sm p-4 rounded-lg hover:scale-105 transition ease-in-out duration-500 hover:cursor-pointer">
                <div className="font-semibold text-white text-lg">{item.gameTitle}</div>
                <div className="text-blue-700">Username: {item.username}</div>
                <div className="marquee-container">
                  <span className="marquee-text">ID: {item._id}</span>
                </div>
                <div>Account Level: {item.accountLevel}</div>
                <div>In-Game Currency: {item.inGameCurrency}</div>
                <div>Platform: {item.platform}</div>
                {/* <div>Quantity: {item.quantity}</div> */}
                <div>despcription: {item.description}</div>
                {/* <div>Approved: {item.approved.toString()}</div> */}
                {
                  item.approved.toString() === "true" ? (
                    <div>
                      <span role="img" aria-label="Safe Sign">✅</span> Approved
                    </div>

                  ) : (
                    <div>
                      <span role="img" aria-label="Warning Sign">⚠️</span> Not Approved
                    </div>
                  )
                }
                <ul>
                  {item.rareItems && item.rareItems.length > 0 ? (
                    item.rareItems.map((rareItem, index) => (
                      <>
                        <div>Rare Items:</div>
                        <li key={index}>{rareItem}</li>
                      </>
                    ))
                  ) : (
                    <div className='mt-10'></div>
                  )}
                </ul>
                <div className="font-semibold text-blue-700">{item.price}rs</div>
                <div className='mt-2 flex flex-row-2'>
                  <button onClick={() => approveSellData(item._id)}
                    className={`bg-dark-bg w-full border border-gray-300 rounded-lg shadow-md m-1 px-2 py-1 text-sm font-medium text-white hover:bg-slate-800 transition-all ${item.approved ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={item.approved}
                  >Approve</button>
                  <button
                    className='bg-red-600 w-full rounded-lg shadow-md m-1 px-2 py-1 text-sm font-medium text-white transition-all'
                    onClick={() => HandleSellDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            )
            )} {filteredSellData.length === 0 && <p className="">ID not found</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
