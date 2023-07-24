import { JwtPayload, verify } from 'jsonwebtoken';
import { IMiddleWare } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';

export class AuthMiddleware implements IMiddleWare {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					console.log(payload);
					const jwtPayload = payload as JwtPayload;
					console.log(jwtPayload);
					req.user = jwtPayload.email;
					next();
				}
			});
		}
		next();
	}
}
