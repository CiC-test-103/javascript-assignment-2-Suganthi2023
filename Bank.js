// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Add methods here:
    // Example: createAccount(name, initialDeposit)
    createAccount(name,initialDeposit){
        const account = new Account(name,initialDeposit); // Creates a new Account with given name, initial deposit by calling Account Class
        this.accounts.push(account);                      // Pushes the newly created account to the accounts array in the bank class
        return account;                                   // returns the newly created account to the caller.
    }

}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Add methods here:
    // Example: deposit(amount) 
    // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }
    deposit(amount){
        this.balance += amount; // Increasing the balance by adding the amount to the balance. 
        this.transactionHistory.push({transactionType: 'Deposit', amount: amount}); //Recording this deposit in the transaction history
    }

    // Example: withdraw(amount)
    // example data to be stored in transactionHistory { transactionType: 'Withdrawal', amount: 200 }
    withdraw(amount){
        if(amount > this.balance){      // Checking whether if the specified withdrawal amount is less than the balance.
            console.log("Insufficient funds...") //If the amount is not less means not enough funds to withdraw
        }else {
            this.balance -= amount; // if the amount is less, decreasing the balance by taking the amount from the balance.
            this.transactionHistory.push({transactionType: 'Withdrawal', amount: amount}); // Recording this withdrawal in the transaction history
        }
    }

    // Example: transfer(amount, recipientAccount)
    // example data to be stored in transactionHistory:
    // for account sending { transactionType: 'Transfer', amount: 300, to: recipientName }
    // for account recieving { transactionType: 'Received', amount: 300, from: senderName }
    transfer(amount,recipientAccount){  //Transferring money from one account to another account and updating the balance on both accounts and also updating 
        if(amount > this.balance){              //the transaction history of both accounts accordingly.
            console.log("Insufficient funds...")
        } else {
            this.balance -= amount;            
            this.transactionHistory.push({transactionType: 'Transfer', amount: amount, to: recipientAccount.name});
            recipientAccount.balance += amount;
            recipientAccount.transactionHistory.push({transactionType: 'Received', amount: amount, from: this.name});
        }
    }
    
    // Example: checkBalance()
    checkBalance(){
        return this.balance; //After transferring, checking the balance of the sender account.
    }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());
