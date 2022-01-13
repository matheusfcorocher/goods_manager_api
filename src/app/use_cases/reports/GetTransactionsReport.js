class GetTransactionsReport {
  constructor(transactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  async execute() {
    try {
      return (await this.transactionsRepository.getAll()).map(t => t.about);
    } catch(error) {
      const internalError = new Error('Internal error')
      internalError.CODE = 'INTERNAL_ERROR'
      throw internalError
    }
  }
}

module.exports = GetTransactionsReport;
