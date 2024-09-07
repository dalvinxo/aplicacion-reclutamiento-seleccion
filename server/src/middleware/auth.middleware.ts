import { Request, Response, NextFunction } from "express";
import { EnumRoles, PayloadJwt, RequestCustom } from "../types";
import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../utils/config";

export const authorize =
  (allowedAccessTypes: EnumRoles[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token_access = req.cookies.access_token;

      if (!token_access) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }

      const data = jwt.verify(token_access, SECRET_JWT_KEY);

      const authUser: PayloadJwt = data as PayloadJwt;

      const haveAccessToEndpoint = allowedAccessTypes.some(
        (rolPermit) => authUser.rol == rolPermit
      );

      console.log(authUser.rol, allowedAccessTypes, haveAccessToEndpoint);
      if (!haveAccessToEndpoint) {
        res.status(403).json({
          message: "No tiene suficientes privilegios para acceder al recurso",
        });
        return;
      }

      (req as RequestCustom<PayloadJwt>).user = authUser;

      next();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error en la autenticacion del usuario" });
    }
  };
