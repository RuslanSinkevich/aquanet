import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    const user = [
      { id: 1, name: "rash" },
      { id: 2, name: "rash3" },
    ];
    return user.map((item) => item.name).toString();
  }
}
