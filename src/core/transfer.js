import chalk from 'chalk';
import fs from 'fs';
import readlineSync from 'readline-sync';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { displayHeader, setupCronJob, sleep } from '../lib/utils.js';
import { generateWallets } from '../lib/wallet.js';
import { sendTransaction } from '../lib/transaction.js';

const WALLETS = JSON.parse(fs.readFileSync('seeds.json', 'utf-8'));

async function executeTransactions(txCount) {
  for (let i = 0; i < txCount; i++) {
    for (const WALLET of WALLETS) {
      try {
        const recipients = await generateWallets();
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(WALLET, {
          prefix: 'symphony',
        });
        await sendTransaction(wallet, recipients);
      } catch (error) {
        console.log(chalk.red(`Error in IIFE – Transfer: ${error}`));
      }
    }

    if (txCount > 1 && i < txCount - 1) {
      const sleepDuration =
        Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000;
      console.log(
        chalk.green(
          `Sleeping for ${sleepDuration / 1000} seconds... (${
            i + 1
          }/${txCount})`
        )
      );
      await sleep(sleepDuration);
    }
  }
}

(async () => {
  displayHeader();
  console.log(chalk.yellow('Please wait...'));
  console.log('');

  const choice = readlineSync.question(
    'Choose an option (1: One-time run // 2: Schedule daily run): '
  );

  if (choice === '1') {
    const txCount = parseInt(
      readlineSync.question('How many transactions do you want to send, per account? '),
      10
    );
    console.log('');
    await executeTransactions(txCount);
  } else if (choice === '2') {
    const txCount = parseInt(
      readlineSync.question(
        'How many transactions do you want to send each day, per account? '
      ),
      10
    );
    console.log('');
    fs.writeFileSync('txCount.json', JSON.stringify({ txCount }), 'utf-8');
    console.log(chalk.green('Scheduled daily transactions.'));

    await executeTransactions(txCount);
    setupCronJob(executeTransactions);

    console.log(chalk.green('Cron job scheduled to run every 24 hours.'));
  } else {
    console.log(chalk.red('Invalid choice. Exiting.'));
  }

  console.log(chalk.green('All tasks are done!'));
  console.log(chalk.green('Subscribe: https://t.me/HappyCuanAirdrop'));
})();
