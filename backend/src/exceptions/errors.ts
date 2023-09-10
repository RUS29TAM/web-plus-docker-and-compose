import { HttpStatus } from '@nestjs/common';
export enum ErrorCode {
  UpdateError = 'UpdateError',
  SaveError = 'SaveError',
  DeleteForbidden = 'DeleteForbidden',
  LoginOrPasswordIncorrect = 'LoginOrPasswordIncorrect',
  UserNotFound = 'UserNotFound',
  WishlistNotFound = 'WishlistNotFound',
  WishlistsNotFound = 'WishlistsNotFound',
  WishesNotFound = 'WishesNotFound',
  WishNotFound = 'WishNotFound',
  UserAlreadyExists = 'UserAlreadyExists',
  OfferForbidden = 'OfferForbidden',
  RaisedForbidden = 'RaisedForbidden',
  Forbidden = 'Forbidden',
}

export const code2message: Record<ErrorCode, string> = {
  UpdateError: 'Ошибка обновления переданных значений',
  SaveError: 'Ошибка сохранения переданных значений',
  DeleteForbidden: 'Можно удалять только свои списки подарков',
  LoginOrPasswordIncorrect: 'Некорректная пара логин и пароль',
  UserNotFound: 'Пользователь не найден',
  WishlistNotFound: 'Список подарков не найдены',
  WishlistsNotFound: 'Списки подарков не найдены',
  WishesNotFound: 'Подарки не найдены',
  WishNotFound: 'Подарок не найден',
  UserAlreadyExists:
    'Пользователь с таким email или username уже зарегистрирован',
  OfferForbidden: 'Можно поддержать только чужие подарки',
  RaisedForbidden: 'Слишком большая сумма поддержки',
  Forbidden: 'Можно удалять только свои подарки',
};

export const code2status: Record<ErrorCode, HttpStatus> = {
  UpdateError: HttpStatus.BAD_REQUEST,
  SaveError: HttpStatus.BAD_REQUEST,
  DeleteForbidden: HttpStatus.FORBIDDEN,
  LoginOrPasswordIncorrect: HttpStatus.UNAUTHORIZED,
  UserNotFound: HttpStatus.NOT_FOUND,
  WishlistNotFound: HttpStatus.NOT_FOUND,
  WishlistsNotFound: HttpStatus.NOT_FOUND,
  WishesNotFound: HttpStatus.NOT_FOUND,
  WishNotFound: HttpStatus.NOT_FOUND,
  UserAlreadyExists: HttpStatus.CONFLICT,
  OfferForbidden: HttpStatus.FORBIDDEN,
  RaisedForbidden: HttpStatus.FORBIDDEN,
  Forbidden: HttpStatus.FORBIDDEN,
};
