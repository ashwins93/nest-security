import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../entities/user.entity';

@Injectable()
export class TransformUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((users: User[]) =>
        users.map(user => ({
          userId: user.userId,
          email: user.email,
          roles: user.roles.map(role => ({
            roleName: role.roleName,
          })),
        })),
      ),
    );
  }
}
