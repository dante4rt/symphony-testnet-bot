import chalk from 'chalk';
import fs from 'fs';
import readlineSync from 'readline-sync';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { displayHeader, setupStakeCronJob, sleep } from '../lib/utils.js';
import { stakeTransaction } from '../lib/transaction.js';

const WALLETS = JSON.parse(fs.readFileSync('seeds.json', 'utf-8'));

async function executeTransactions(txCount, valoper) {
  for (let i = 0; i < txCount; i++) {
    for (const WALLET of WALLETS) {
      try {
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(WALLET, {
          prefix: 'symphony',
        });
        await stakeTransaction(wallet, valoper);
      } catch (error) {
        if (error.message.includes('invalid validator address')) {
          console.log(
            chalk.red(`Invalid validator address, please input a correct one.`)
          );
        } else {
          console.log(chalk.red(`Error in IIFE – Stake: ${error}`));
        }
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

  const valoper =
    readlineSync.question(
      'Submit validator address that you want to stake (example: symphonyvaloper15fz6rfdkwzy8pwglgmt44ehyr07u38hhlurgap): '
    ) || 'symphonyvaloper15fz6rfdkwzy8pwglgmt44ehyr07u38hhlurgap';

  if (choice === '1') {
    const txCount = parseInt(
      readlineSync.question('How many transactions do you want? '),
      10
    );
    console.log('');
    await executeTransactions(txCount, valoper);
  } else if (choice === '2') {
    const txCount = parseInt(
      readlineSync.question('How many transactions do you want each day? '),
      10
    );
    console.log('');
    fs.writeFileSync('txStakeCount.json', JSON.stringify({ txCount }), 'utf-8');
    fs.writeFileSync(
      'valoperAddress.json',
      JSON.stringify({ valoper }),
      'utf-8'
    );
    console.log(chalk.green('Scheduled daily transactions.'));

    await executeTransactions(txCount, valoper);
    setupStakeCronJob(executeTransactions);

    console.log(chalk.green('Cron job scheduled to run every 24 hours.'));
  } else {
    console.log(chalk.red('Invalid choice. Exiting.'));
  }

  console.log(chalk.green('All tasks are done!'));
  console.log(chalk.green('Subscribe: https://t.me/HappyCuanAirdrop'));
})();
