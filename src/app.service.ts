import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getSmile(): string {
    return "you shouldn't be here, anyway, have fun :)";
  }
}
