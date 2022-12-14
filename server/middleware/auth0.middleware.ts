import {
  auth,
  claimCheck,
  InsufficientScopeError,
} from "express-oauth2-jwt-bearer";
const dotenv = require("dotenv");

dotenv.config();

const validateAccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});

const checkRequiredPermissions = (requiredPermissions:any) => {
  return (req:any, res:any, next:any) => {
    const permissionCheck = claimCheck((payload) => {
      const permissions:any = payload.permissions || [];

      const hasPermissions = requiredPermissions.every((requiredPermission:any) =>
        permissions.includes(requiredPermission)
      );

      if (!hasPermissions) {
        throw new InsufficientScopeError();
      }

      return hasPermissions;
    });

    permissionCheck(req, res, next);
  };
};

export {
  validateAccessToken,
  checkRequiredPermissions,
};
