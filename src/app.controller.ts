import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { DbService } from './db/db.service';

/**
 * Специальный класс указывающий как swagger сгенерировать документацию
 * @ApiPropery - указывает свагеру использовать поле
 */
class HelloWorldDto {
  @ApiProperty()
  message: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dbService: DbService,
  ) {}

  /**
   * Обработчик запроса декоратор @GET
   * Поскольку запрос возвращает промис, используется декоратор @ApiOkResponse для явного возврата типа
   * @returns api
   */
  @Get()
  @ApiOkResponse({
    type: HelloWorldDto,
  })
  async getHello(): Promise<HelloWorldDto> {
    const users = await this.dbService.user.findMany({});
    console.log(users);
    return { message: this.appService.getHello() };
  }
}
