class GetTransactionsReport {
  constructor(transactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  async execute() {
    try {
      return (await this.transactionsRepository.getAll()).map((t) => t.about);
    } catch (error) {
      const internalError = new Error("Internal Error");
      internalError.CODE = "INTERNAL_ERROR";
      internalError.message = "Internal Error";
      internalError.details = error.original.detail;
      throw internalError;
    }
  }
}

module.exports = GetTransactionsReport;
