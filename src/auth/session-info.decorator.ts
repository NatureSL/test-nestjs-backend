import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * Кастомный декоратор для получение данных о сессии 
 */
export const SessionInfo = createParamDecorator(
  (_, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().session,
);
