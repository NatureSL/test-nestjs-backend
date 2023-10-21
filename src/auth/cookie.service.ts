import { Injectable } from '@nestjs/common';
import { Response } from 'express';

/**
 * Логика установки куки и удаления 
 */
@Injectable()
export class CookieService {
  static tokenKey = 'access-token';

  setToken(res: Response, token: string) {
    res.cookie(CookieService.tokenKey, token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    });
  }

  removeToken(res: Response) {
    res.clearCookie(CookieService.tokenKey);
  }
}
