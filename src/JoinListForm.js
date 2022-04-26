import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; 
import { useState } from 'react';
import './JoinListForm.css'; 
const config = require('./AWSConfig.js');
const AWS = require('aws-sdk');

const JoinListForm = () => { 

    const [ email, setEmail ] = useState(""); 

    const validateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            return true;
        }
        return false;
    }

    const handleSubmit = async e => {
        //validate email and send email to database
        if(validateEmail(email)){
            AWS.config.update(config.aws_remote_config);
            const docClient = new AWS.DynamoDB.DocumentClient();
    
            let params = {
                Item: {
                    "email" :  email
                },
                TableName: config.dynamo_tables.beta_waiting_list,
            };
    
            let users; 
    
            try{
                await docClient.put(params).promise();
                document.querySelector(".wrap-error-text").style.display = "none";
                document.querySelector(".wrap-invalid-email").style.display = "none"; 
                document.querySelector(".wrap-success").style.display = "block"; 
                document.querySelector("input").style.display = "none"; 
                document.querySelector(".wrap-icon").style.display = "none";
                setEmail("");
            }catch(e){
                console.log("Error thrown: " + e.message); 
                document.querySelector(".wrap-error-text").style.display = "block";
            }
        }else{
            document.querySelector(".wrap-error-text").style.display = "none";
            document.querySelector(".wrap-success").style.display = "none"; 
            document.querySelector(".wrap-invalid-email").style.display = "block"; 
        }
    }

    return (
        <div className="wrap-component">
            <div className="form-header">JOIN OUR BETA WAITLIST</div>
            <div class="wrap-invalid-email">
                Invalid email.
            </div>
            <div class="wrap-success">
                You've been added to the list!
            </div>
            <div class="wrap-error-text">
                We are having an issue. Please try again. 
            </div>
            <div className="wrap-form">
                <input class="input100" placeholder="Email" type="text" name="email" onChange={e => setEmail(e.target.value)}/>
                <div className="wrap-icon" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faEnvelope} class="icon" />          
                </div>
            </div>
        </div>
    ); 
}

export default JoinListForm; 