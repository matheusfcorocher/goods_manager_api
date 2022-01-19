class GetTransactionsReport {
  constructor(transactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  async execute() {
    try {
      return (await this.transactionsRepository.getAll()).map(t => t.about);
    } catch(error) {
      if(!error.CODE) {
        error = new Error("Internal Error");
        error.CODE = "INTERNAL_ERROR";
        error.message = "Internal Error";
      }
      throw error
    }
  }
}

module.exports = GetTransactionsReport;
