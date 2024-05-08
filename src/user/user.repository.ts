import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class userrepository extends Repository<UserEntity> {}
