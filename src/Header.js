import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {ethers, BigNumber} from "ethers";
import Results from './Results.json'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ReactModal from 'react-modal';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const Header = ({state, setShow}) => {

    function example(){
        setShow(true);
    }

    return(

        <div>
        <button onClick={example}> Get Results </button>
        <button> Grant Permission </button>
        </div>


    );
}


export default Header;
