import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {ethers, BigNumber} from "ethers";
import Results from './Results.json'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ReactModal from 'react-modal';
import Header from './Header';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


function App() {

  const address = '0x4778a1D579e3a69877a48FD28292d18B9765696a';

  const [show, setShow] = useState(false);

  const [userMessage, setUserMessage] = useState("")

  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const getErrorMessage = (message) => {

    let flag = false;
    let start = 0
    let end = 0

      for(let i=0; i<message.length; i++){

        if(message.charAt(i) == '"' && flag == false) {
          start = i+1;
          flag = true;
        }

        else if(message.charAt(i) == '"' && flag == true){
          end = i;
          break;
        }

      }
      
      flag=false;

      return message.slice(start, end)

  }


  const closeModal = () => {
  
    setShow(false)
  
  }

  const openModal = () => {
  
    setShow(true);
  
  }


  const onSubmit = async (data) => {

    let log = document.getElementById('log');

    console.log(data)

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []); 
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Results.abi, signer);

      let results = ["Maths", data.maths, "Chemistry", data.chemistry, "Physics", data.physics,"Biology", data.biology,"English", data.english];

      console.log(await contract.setResult(data.firstName, data.secondName, data.DOB, data.address, results));
      log.innerText = "You successfully granted permission to address:";

    } catch (error) {
      setUserMessage("Transaction failed, please ensure you are a moderator and all fields are filled out")
      log.innerText = "Failed";
    }
  }

  const getResult = async (e) => {

    e.preventDefault();
    
    let add = document.getElementById('resultAddress').value;
    
    try {
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []); 
      
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Results.abi, signer);
      let results = await contract.getResult(add)
      console.log(results)
      setUserMessage(`First Name: ${results[0]} \n Second Name:  ${results[1]} \n DOB: ${results[2]} \n ${results[3][0]}: ${results[3][1]} \n ${results[3][2]}: ${results[3][3]} \n ${results[3][4]}: ${results[3][5]} \n ${results[3][6]}: ${results[3][7]} \n ${results[3][8]}: ${results[3][9]}`)
      openModal();

    } catch (error) {
      
      setUserMessage("Failed with error:fthfghfgxh " + `${getErrorMessage(error.message)}`);
      openModal();
    }

  }


  const grantPermission = async (e) => {

    e.preventDefault();

    let add = document.getElementById('permissionAddress').value;

    try {
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []); 
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Results.abi, signer);
      await contract.authentication(add, true);
      setUserMessage("You successfully granted permission to address: " + `${add}`);
      openModal();

    } catch (error) {
      
      setUserMessage("Failed with error: " + `${getErrorMessage(error.message)}`);
      openModal();
    }

  }

  const revokePermission = async (e) => {

    e.preventDefault();

    let add = document.getElementById('permissionAddress').value;

    try {
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []); 
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Results.abi, signer);
      await contract.authentication(add, false);
      setUserMessage("You successfully revoked permission to address: " + `${add}`);
      setShow(true);

    } catch (error) {
      
      setUserMessage("Failed with error: " + `${getErrorMessage(error.message)}`);
      openModal();    
    }

  }

  
  return (
    <div>

      <Header state={show} setShow={setShow} />

      <ReactModal style={customStyles} id="reactmodal" isOpen={show}>

        Message
        <h1 id="message"> {userMessage} </h1>

        <button onClick={closeModal}>Close</button>
      </ReactModal>


      <div>
      <form>
        <h1 className='el'>Grant Permission to Address</h1>
        <input className='el' id='permissionAddress' type='string' placeholder="Ethereum Address"></input>
        <button className='el' id='grantPermission' onClick={grantPermission}>Grant</button>
        <button className='el' id='revokePermission' onClick={revokePermission}>Revoke</button>
        </form>
      </div>


      <div>
        <form>
        <h1>Get Result</h1>
        <input id='resultAddress' type='string' placeholder="Ethereum Address"></input>
        <button id='getResult' onClick={getResult}>Submit</button>
        </form>
      </div>



      <div>
         
          <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Set Results</h1>
            <input
                id="firstName"
                type="text"
                required
                placeholder="First Name"
                {...register("firstName")} 
            />
            <input
                id="secondName"
                type="text"
                required
                placeholder="Second Name"
                {...register("secondName")} 
            />
            <input
                id="DOB"
                type="date"
                required
                placeholder="Date of Birth"
                {...register("DOB")} 
            />
            <input
                id="address"
                type="text"
                required
                placeholder="Ethereum Address"
                {...register("address")} 
            />
            <p>Maths Grade 1-9</p>
            <input
                id="maths"
                type="text"
                required
                {...register("maths")} 
            />
            <p>Chemistry Grade 1-9</p>
            <input
                id="chemistry"
                type="number"
                required
                {...register("chemistry")} 
            />
            <p>Physics Grade 1-9</p>
            <input
                id="physics"
                type="number"
                required
                {...register("physics")} 
            />
            <p>Biology Grade 1-9</p>
            <input
                id="biology"
                type="number"
                required
                {...register("biology")} 
            />
            <p>English Grade 1-9</p>
            <input
                id="english"
                type="number"
                required
                {...register("english")} 
            />
            <button id="submit-button" type="submit">
                Submit
            </button>
        </form>
      </div>

      <div>
        <h1 id="log"></h1>
      </div>


    </div>
  );

}

export default App;
