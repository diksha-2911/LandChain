import React from 'react'
//import Navbar from "./Navbar";
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from '../Marketplace.json';
import { useLocation } from "react-router";

const Upload = () => {

    const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});
    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');
    const location = useLocation();

    async function disableButton() {
        const listButton = document.getElementById("list-button")
        listButton.disabled = true
        listButton.style.backgroundColor = "grey";
        listButton.style.opacity = 0.3;
    }

    async function enableButton() {
        const listButton = document.getElementById("list-button")
        listButton.disabled = false
        listButton.style.backgroundColor = "#A500FF";
        listButton.style.opacity = 1;
    }

    async function OnChangeFile(e) {
        var file = e.target.files[0];
        //check for file extension
        try {
            //upload the file to IPFS
            disableButton();
            updateMessage("Uploading image.. please dont click anything!")
            const response = await uploadFileToIPFS(file);
            if(response.success === true) {
                enableButton();
                updateMessage("")
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileURL(response.pinataURL);
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }

    async function OnChangeDoc(e) {
      var file = e.target.files[0];
      //check for file extension
      try {
          //upload the file to IPFS
          disableButton();
          updateMessage("Uploading document.. please dont click anything!")
          const response = await uploadFileToIPFS(file);
          if(response.success === true) {
              enableButton();
              updateMessage("")
              console.log("Uploaded document to Pinata: ", response.pinataURL)
              setFileURL(response.pinataURL);
          }
      }
      catch(e) {
          console.log("Error during file upload", e);
      }
  }

    async function uploadMetadataToIPFS() {
        const {name, description, price} = formParams;
        //Make sure that none of the fields are empty
        if( !name || !description || !price || !fileURL)
        {
            updateMessage("Please fill all the fields!")
            return -1;
        }

        const landJSON = {
            name, description, price, image: fileURL
        }

        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(landJSON);
            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }
        catch(e) {
            console.log("error uploading JSON metadata:", e)
        }
    }

    async function listLand(e) {
        e.preventDefault();

        //Upload data to IPFS
        try {
            const metadataURL = await uploadMetadataToIPFS();
            if(metadataURL === -1)
                return;
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            disableButton();
            updateMessage("Uploading NFT(takes 5 mins).. please dont click anything!")

            //Pull the deployed contract instance
            let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

            //massage the params to be sent to the create NFT request
            const price = ethers.utils.parseUnits(formParams.price, 'ether')
            let listingPrice = await contract.getListPrice()
            listingPrice = listingPrice.toString()

            //actually create the NFT
            let transaction = await contract.createToken(metadataURL, price, { value: listingPrice })
            await transaction.wait()

            alert("Successfully listed your Land!");
            enableButton();
            updateMessage("");
            updateFormParams({ name: '', description: '', price: ''});
            window.location.replace("/")
        }
        catch(e) {
            alert( "Upload error"+e )
        }
    }

    console.log("Working", process.env);


  return (
    <div className='py-5 px-10'>
      <h1 className='text-2xl text-center'> Upload</h1>
      <div className='grid grid-cols-1 mt-10'>
        <div>
          <label>Select Type</label>
          <select className='rounded-[15px] px-5 py-2 border border border-slate-500 w-full'>
            <option value="">--Select Type--</option>
            <option value="0">Property</option>
            <option value="1">Land</option>
          </select>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4 mt-5'>
        <div>
          <label htmlFor="">Title</label>
          <input className='rounded-[15px] px-5 py-2 border border border-slate-500 w-full' type="text" placeholder="Enter title" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.title} />
        </div>
        <div>
          <label htmlFor="">Enter Size (sqft)</label>
          <input className='rounded-[15px] px-5 py-2 border border border-slate-500 w-full' type="number" placeholder="1000" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.size}/>
        </div>
      </div>
      <div className='grid grid-cols-1 mt-5'>
        <div>
          <label>Address</label>
          <textarea name="" id="" className='rounded-[15px] px-5 py-2 border border border-slate-500 w-full' cols="30" rows="10" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.address}></textarea>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4 mt-5'>
        <div>
          <label htmlFor="">Thumbnail Image</label>
          <input type="file" onChange = {OnChangeFile} name="" className='rounded-[15px] px-5 py-2 border border border-slate-500 w-full' id="" />
        </div>
        <div>
          <label htmlFor="">Legal Document</label>
          <input type="file" onChange = {OnChangeDoc} name="" className='rounded-[15px] px-5 py-2 border border border-slate-500 w-full' id="" />
        </div>
      </div>
      <button className='bg-blue-800 text-white text-center w-[100%] rounded-[15px] py-3 mt-10 hover:bg-blue-700' onClick = {listLand}>Upload</button>
    </div>
  )
}

export default Upload;