class ResponseDTO {
  Status: string;
  message: string;

  constructor(status: string, message: string) {
    this.Status = status;
    this.message = message;
  }
}

export default ResponseDTO;
