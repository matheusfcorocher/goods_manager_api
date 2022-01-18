class fakeTransactionRepository {
  constructor(Transactions) {
    this.transactions = Transactions;
  }

  getAll() {
    return Promise.resolve(this.transactions)
  }

  getById(id) {
    let result = this.transactions.filter((transaction) => transaction.id === id)[0]
    return Promise.resolve(result);
  }

  add(data) {
    data.id = this.transactions.length + 1
    return Promise.resolve(this.transactions.push(data));
  }
}

module.exports = fakeTransactionRepository;
