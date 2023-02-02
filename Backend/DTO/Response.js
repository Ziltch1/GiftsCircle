class ResponseDTO {
  Status = "";
  Message = "";

  constructor(status, message) {
    this.Status = status;
    this.Message = message;
  }
}

module.exports = { ResponseDTO };
