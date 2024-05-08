import { AuthenticationDto } from "../dto/auth-dto";

export interface IAuthenticationServiseInterface {
  userLogin(authDto: AuthenticationDto): Promise<any>;
}
