import chalk from 'chalk';
import bip39 from 'bip39';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

export async function generateWallets() {
  try {
    const mnemonic = bip39.generateMnemonic();
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: 'symphony',
    });

    const [firstAccount] = await wallet.getAccounts();
    return firstAccount.address;
  } catch (error) {
    console.log(chalk.red(`Error in Generate Wallets: ${error}`));
  }
}
