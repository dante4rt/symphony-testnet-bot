import chalk from 'chalk';
import { coin, coins } from '@cosmjs/proto-signing';
import {
  assertIsDeliverTxSuccess,
  GasPrice,
  SigningStargateClient,
} from '@cosmjs/stargate';

const RPC = 'https://symphony-testnet-rpc.ramanode.top/';

export async function sendTransaction(sender, receiver) {
  const client = await SigningStargateClient.connectWithSigner(RPC, sender, {
    gasPrice: GasPrice.fromString('0.003note'),
  });

  const [firstAccount] = await sender.getAccounts();

  const amount = coins(Math.floor(Math.random() * 10) + 1, 'note');

  console.log(
    chalk.yellow(
      `Send 0.00000${amount[0].amount} $MLD from ${firstAccount.address} to ${receiver}`
    )
  );

  const transaction = await client.sendTokens(
    firstAccount.address,
    receiver,
    amount,
    'auto'
  );

  assertIsDeliverTxSuccess(transaction);
  console.log(chalk.green(`Successfully broadcasted!`));
  console.log(
    chalk.green(
      `Hash: https://testnet.ping.pub/symphony/tx/${transaction.transactionHash}`
    )
  );
  console.log('');
}

export async function stakeTransaction(sender, validator) {
  const client = await SigningStargateClient.connectWithSigner(RPC, sender, {
    gasPrice: GasPrice.fromString('0.003note'),
  });

  const [firstAccount] = await sender.getAccounts();

  const amount = coin(Math.floor(Math.random() * 10) + 1, 'note');

  console.log(
    chalk.yellow(
      `Stake 0.00000${amount.amount} $MLD from ${firstAccount.address} to ${validator}`
    )
  );

  const transaction = await client.delegateTokens(
    firstAccount.address,
    validator,
    amount,
    'auto'
  );

  assertIsDeliverTxSuccess(transaction);
  console.log(chalk.green(`Successfully broadcasted!`));
  console.log(
    chalk.green(
      `Hash: https://testnet.ping.pub/symphony/tx/${transaction.transactionHash}`
    )
  );
  console.log('');
}
