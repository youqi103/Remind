import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

/**
 * 统一返回响应拦截器
 * 将成功的响应数据包装为统一格式：{ code: 0, message: 'success', data }
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  { code: number; message: string; data: T }
> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<{ code: number; message: string; data: T }> {
    return next.handle().pipe(
      map((data: T) => ({
        code: 0,
        message: 'success',
        data,
      })),
    );
  }
}
