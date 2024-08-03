import fs from 'fs';
import readlineSync from 'readline-sync';
import cron from 'node-cron';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { fetchProxies, getFaucet, shuffleArray } from '../lib/api.js';
import { displayHeader } from '../lib/utils.js';
import chalk from 'chalk';

const runFaucetClaim = async () => {
  console.log(chalk.yellow('Please wait...'));
  console.log('');

  const proxyUrl =
    'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/all.txt';
  let PROXIES = await fetchProxies(proxyUrl);

  const WALLETS = JSON.parse(fs.readFileSync('seeds.json', 'utf-8'));

  for (const WALLET of WALLETS) {
    const wallets = await DirectSecp256k1HdWallet.fromMnemonic(WALLET, {
      prefix: 'symphony',
    });
    const wallet = (await wallets.getAccounts()).at(-1).address;

    PROXIES = shuffleArray(PROXIES);

    for (const proxy of PROXIES) {
      try {
        const { data, proxy: usedProxy } = await getFaucet(wallet, proxy);
        if (data.status === 'error') {
          console.error(
            chalk.red(`❌ Error for address ${wallet}: ${data.message}`)
          );
        } else {
          console.log(
            chalk.green(`✅ Claim faucet success using proxy ${usedProxy}!`)
          );
          console.log(
            chalk.cyan(
              `⚙️ Hash: https://testnet.ping.pub/symphony/tx/${data.result.txhash}`
            )
          );
        }
        console.log(
          chalk.magenta('====================================================')
        );
        console.log('');
        break;
      } catch (error) {
        console.error(
          chalk.yellow(`⚠️ Failed with proxy ${proxy}, trying next proxy...`)
        );
        continue;
      }
    }
  }
};

displayHeader();

const choice = readlineSync.keyInSelect(
  ['Run once', 'Run every 24 hours'],
  'Do you want to run the script?'
);

if (choice === 0) {
  console.log(chalk.blue('Running faucet claim once...'));
  runFaucetClaim();
} else if (choice === 1) {
  console.log(
    chalk.blue('Running faucet claim immediately and setting up cron job...')
  );
  runFaucetClaim();

  cron.schedule('0 0 * * *', async () => {
    console.log(chalk.cyan('Starting scheduled job...'));
    try {
      await runFaucetClaim();
    } catch (error) {
      console.error(
        chalk.red('❌ Error occurred during scheduled job:', error.message)
      );
    }
  });
} else {
  console.log(chalk.yellow('No valid choice selected. Exiting...'));
  console.log('');
  console.log(chalk.green('Subscribe: https://t.me/HappyCuanAirdrop'));
}
