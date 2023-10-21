import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { BlockListService } from 'src/block-list/block-list.service';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  /**
   * Подключаем DB через DI
   * @param db
   */
  constructor(
    private db: DbService,
    private accountService: AccountService,
    private blockList: BlockListService,
  ) {}

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
    await this.accountService.create(user.id);
    await this.blockList.create(user.id);
    
    return user;
  }
}
