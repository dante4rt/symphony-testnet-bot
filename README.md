# Symphony Testnet Bot

## Description

The **Symphony Testnet Bot** is a script designed to interact with the Symphony testnet. It includes functionalities to claim tokens from a faucet, send transactions, and perform staking operations. The bot can be configured to run these operations once or automatically on a daily basis.

## Features

- **Faucet Claim**: Claim tokens from the Symphony testnet faucet.
- **Auto Transfer**: Send transactions automatically to generated wallets.
- **Auto Stake**: Automatically stake tokens to a specified validator.

## Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **NPM**: Node.js package manager, which comes with Node.js.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dante4rt/symphony-testnet-bot.git
   cd symphony-testnet-bot
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `seeds.json` file:**

   You need to create a `seeds.json` file in the root directory of the project. This file should contain an array of mnemonics for your wallets. Example format:

   ```json
   [
     "apple banana grape",
     "ball skate basket"
   ]
   ```

   Replace the example mnemonics with your actual wallet mnemonics.

### Running the Bot

1. **Faucet Script:**

   To run the faucet script, execute the following command:

   ```bash
   npm run faucet
   ```

   - **Run once**: Execute the script a single time.
   - **Run every 24 hours**: Set up a cron job to run the script daily.

2. **Transfer Script:**

   To run the transfer script, execute the following command:

   ```bash
   npm run transfer
   ```

   - **Run once**: Execute the script a single time.
   - **Run every 24 hours**: Set up a cron job to run the script daily.

3. **Stake Script:**

   To run the stake script, execute the following command:

   ```bash
   npm run stake
   ```

   - **Run once**: Execute the script a single time.
   - **Run every 24 hours**: Set up a cron job to run the script daily.

### Contributing

Feel free to fork the repository and make pull requests. For any issues or feature requests, please open an issue in the GitHub repository.

## Donations

If you would like to support the development of this project, you can make a donation using the following addresses:

- **Solana**: `GLQMG8j23ookY8Af1uLUg4CQzuQYhXcx56rkpZkyiJvP`
- **EVM**: `0x960EDa0D16f4D70df60629117ad6e5F1E13B8F44`
- **BTC**: `bc1p9za9ctgwwvc7amdng8gvrjpwhnhnwaxzj3nfv07szqwrsrudfh6qvvxrj8`

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Support

For support and updates, join our [Telegram channel](https://t.me/HappyCuanAirdrop).
