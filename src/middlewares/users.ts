import { Response, Request, NextFunction } from "express";
import Jwt from "jsonwebtoken";

const APP_SIGNATURE = `app_${process.env.APP_SIGNATURE}`

export default class UsersAuthMiddleware {
  async index(request: Request, response: Response, next: NextFunction) {
		try {
			if(!request.headers.authorization)
				return response.status(401).json({message: "Token not provided"});

			const [, token] = request.headers.authorization.split(" ");
      
			const payload = Jwt.verify(token, APP_SIGNATURE) as Jwt.JwtPayload;

			request.body.token = payload;

			return next();
		} catch (error) {
			return response.status(400).send("Internal Error");
		}
	}
}