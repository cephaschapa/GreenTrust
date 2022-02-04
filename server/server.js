const express = require('express');
const cors = require('cors')
const app = express();

require('dotenv').config()

const axios = require("axios").default;
const mailer = require('./mailer');
const notifications = require('./notifications');

// Constants
const API_KEY = process.env.API_KEY;
const PORT = 5000;
const DID = process.env.DID

// Middleware
app.use(express.json())
app.use(cors())


// ROUTES

// Get All Connections

app.get('/getConnections', async (req, res) => {
    let state = req.query.state;
    console.log(state);
    const connections = await axios.request({
        method: 'GET',
        url: `https://api.trinsic.id/credentials/v1/connections?state=Connected`,
        headers: {
            Accept: 'application/json',
            Authorization: API_KEY
        }
    })
    
    console.log(connections.data)

    res.status(200).send({
        success:true,
        data: connections.data
    })
});


// Create Connection

app.post('/createConnections', async (req, res) => {
    
    const connections = await axios.request({
        method: 'POST',
        url: 'https://api.trinsic.id/credentials/v1/connections',
        headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/*+json',
            Authorization: API_KEY
        },
        data: {"multiParty":req.body.multiParty,"name":"GreenTrust"}
    })
    
    console.log(console.log(req.body.data))
    
    if(connections){
        mailer(req.body.data.email, req.body.data.fullName, connections.data.invitationUrl)
        console.log(req.body.email, req.body.fullName)
        res.status(200).send({
            success:true,
            data: connections.data
        })
    }
    else {
        res.send({
            err:"something went wrong"
        })
    }
});


// Get All Credentials

app.get('/getCredentials', async (req, res) => {
    const credentials = await axios.request({
        method: 'GET',
        url: 'https://api.trinsic.id/credentials/v1/credentials',
        headers: {
            Accept: 'application/json',
            Authorization: API_KEY
        }
    })
    
    console.log(credentials.data)

    res.status(200).send({
        success:true,
        data: credentials.data
    })
});

// Create Credential

app.post('/createCredential', async (req, res) => {
    console.log(req.body.data)
    try {
        const credential = await axios.request({
            method: 'POST',
            url: 'https://api.trinsic.id/credentials/v1/credentials',
            
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/*+json',
                Authorization: API_KEY
            },
            
            data: {
                "credentialValues": {
                    "Full Names": req.body.data.fname,
                    "Email": req.body.data.email,
                    "Plant Name": req.body.data.plantName,
                    "Species": req.body.data.species,
                    "Longitude": req.body.data.longitude,
                    "Latitude": req.body.data.latitude,
                    "Origin": req.body.data.origin,
                    "Date": req.body.data.date,
                },
                "definitionId":DID,
                "connectionId": req.body.data.connectionId,
                "automaticIssuance":true
            }
        })
        if(credential){
            notifications(req.body.data.email,req.body.data.fname)
            res.status(200).send({
                success:true,
                data: credential.data
            })
        }
        
      
    } catch (err) {
        console.log(err)
    }
})

// SERVER

app.listen(PORT, ()=> {
    console.log(`Server listenning on ${PORT}`)
})