This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Notice ⚠️

This is an experimental project, it is not recommended to be used for any production use, since one of the aspects is that for crypto deposit, there need to be a waiting period for 12 confirmation blocks (~144 seconds) for a transcation to be considered as final. beside that the system have not been thoroughly tested, nor audited.

## Introduction
This project is a freelancing platform, built using Next.js, Prisma and powered by blockchain as a payment gateway, the system has 2 types of users:
- Clients that hire freelancers and are able to perform the following:
    - create new listings.
    - manage listings and orders.
    - confirm a submission.
    - deposit and withdraw into and from the platform.
- Freelancers that are able to apply for posted listings, where they are able to perform the following:
    - submit a proposals.
    - manage created proposals.
    - send a submission under an active order.
    - only able to withdraw from the platform.

Inititally, the client posts an active listings which include all the details about the work and price that is willing to be paid, which is deposited before publishing the active listing. then freelancers submit proposal to the listings, where the client is able to view the list and confirm the respective proposal of interest. automatically the listing is turned into an order, which is active, and has a deadline. at that moment, the freelancer is able to submit the deliverables at any time, and at anytime the client is able to either accept or cancel the order. At an ideal case scenario, after the freelancer submits the deliverables, the client is able to view and confirmt the order, which automatically credit the freelancer that is able to withdraw his earnings at anytime.
## Getting Started

There is 2 types of network types the system is able to run on, either in a local blockchain or on the Goerli testnet, by default we would configure it as Localhost. to change it, you may access to `/utils/constants.ts` and change NETWORK_OPTION to the desired network.

Only in the case of Localhost setup, you should first run the following commands to be able to setup the network and token contract properly.

step 1:
clone the repository, open the terminal, browse to the project and run the command:
```sh
cd hardhat
```

step 2:
run the command:
```sh
npm install
```

step 3:
to setup local blockchain, run the command:
```
npm run node

```

step 5:
in `/hardhat/scripts/deploy.ts` assign the freelancing main address that you defined in env file `MAIN_ADDRESS` to the variable `mainAddress`, then to setup local blockchain, run the command:
```
npm run deploy

```
At this point, you should be able to see the token address is deployed in your terminal.

step 5:
in `/hardhat/scripts/mint.ts` assign your address that you own, on your web3 wallet to the variable `TO`, and assign the prompted token address to `CONTRACT_ADDRESS` and run the command to mint new tokens along with fake native ether for gas fees:
```
npm run mint

```

By now, you have a local blockchain working, and a deployed token contract representing USDC mock, as a platform currency, with the owner prefunded. to access the network on your web3 wallet make sure to select or add the following RPC, to able to access the local blockchain.

Network Name: Localhost 8545
RPC URL: http://localhost:8545
Chain ID: 1337
Currency Symbol: ETH

After getting the network to be used settled, open a new terminal and to run a bot to listen to blockchain transactions for any new deposits to update the database record for the respective , run:

```bash
cd ./depositsObserver/; tsc main.ts; node main.js
```

Finally, to run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
