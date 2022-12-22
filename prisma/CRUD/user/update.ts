import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req:NextApiRequest, res:NextApiResponse){
    
}

////////////////////////////////////
import express, { Request, Response } from 'express';
import { MongoClient, Db } from 'mongodb';

const app = express();

// Replace with your MongoDB connection details
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

let db: Db;

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  db = client.db(dbName);
});

app.put('/customer/:id', async (req: Request, res: Response) => {
  try {
    // Validate the request body
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }

    // Update the customer account in the database
    const customer = await db.collection('customers').updateOne({ _id: req.params.id }, { $set: req.body });

    // Return the updated customer in the response
    res.send(customer);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

app.put('/freelancer/:id', async (req: Request, res: Response) => {
  try {
    // Validate the request body
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }

    // Update the freelancer account in the database
    const freelancer = await