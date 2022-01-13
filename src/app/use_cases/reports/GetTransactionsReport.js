class GetTransactionsReport {
  constructor(transactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  async execute() {
    try {
      return (await this.transactionsRepository.getAll()).map(t => t.about);
    } catch(error) {
      throw error
    }
  }
}

module.exports = GetTransactionsReport;
