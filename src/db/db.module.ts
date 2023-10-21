import { Module } from '@nestjs/common';
import { DbService } from './db.service';
/**
 * Экспорт модуля БД для применения в других модулях
 */
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
