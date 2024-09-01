export const validationUser: (user: any, password: any) => string = (
  user,
  password
) => {
  if (!user || !password) {
    return "El nombre de usuario o la contraseña son requeridos";
  }

  if (typeof user !== "string") {
    return "El nombre de usuario debe ser un string";
  }

  if (typeof password !== "string") {
    return "La contraseña debe ser un string";
  }

  if (user.length < 5) {
    return "El nombre de usuario debe tener al menos 5 caracteres";
  }

  if (password.length < 7) {
    return "La contraseña debe tener al menos 7 caracteres";
  }

  return "";
};
