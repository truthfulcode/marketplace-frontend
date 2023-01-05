import type { NextApiRequest, NextApiResponse } from 'next'
import express, { Request, Response } from 'express';
import { MongoClient, Db } from 'mongodb';
export default function handler(req:NextApiRequest, res:NextApiResponse){
}

export const connectDatabase = async () => {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  const db = client.db('main');

  return {
    listings: db.collection('test-listings'),
  };
};

const app = express();
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
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }

    const customer = await db.collection('customers').updateOne({ _id: req.params.id }, { $set: req.body });

    res.send(customer);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

app.put('/freelancer/:id', async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }

    // const freelancer = await
  }catch(err){
    
  }
  
  })