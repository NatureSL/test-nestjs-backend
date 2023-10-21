import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  /**
   * Подключаем DB через DI
   * @param db
   */
  constructor(private db: DbService) {}

  /**
   * Метод для логина и регистрации
   * @param email
   * @returns
   */
  findByEmail(email: string) {
    return this.db.user.findFirst({ where: { email } });
  }

  /**
   * Создаем нового пользователя при регистрации
   * @param email
   * @param hash
   * @param salt
   * @returns
   */
  async create(email: string, hash: string, salt: string) {
    const user = await this.db.user.create({ data: { email, hash, salt } });

    return user;
  }
}
