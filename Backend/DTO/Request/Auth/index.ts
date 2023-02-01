interface LoginDTO {
  email: string;
  password: string;
}

interface GoogleLoginDTO{
  email: string;
}

interface VerifyEmailDTO{
  user: string;
  code: string;
}

export { LoginDTO, GoogleLoginDTO, VerifyEmailDTO };
