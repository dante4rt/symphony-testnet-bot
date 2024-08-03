import readlineSync from 'readline-sync';
import { displayHeader } from './src/lib/utils.js';
import chalk from 'chalk';

const menu = () => {
  displayHeader();

  console.log(chalk.magenta('1. Auto claim faucet'));
  console.log(chalk.magenta('2. Auto transfer'));
  console.log(chalk.magenta('3. Auto stake'));
  console.log('');

  const choice = readlineSync.question(
    'Please select an option (1, 2, or 3): '
  );

  if (choice === '1') {
    console.log(chalk.yellowBright(`Please run: npm run faucet`));
  } else if (choice === '2') {
    console.log(chalk.yellowBright(`Please run: npm run transfer`));
  } else if (choice === '3') {
    console.log(chalk.yellowBright(`Please run: npm run stake`));
  } else {
    console.log(chalk.red('Invalid choice. Please select a valid option.'));
  }

  console.log('');
  console.log(chalk.green('Subscribe: https://t.me/HappyCuanAirdrop'));
};

menu();
