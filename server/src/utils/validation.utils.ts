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

// export const validationCedula: (cedula: string) => boolean = (cedula) => {
//   cedula = cedula.replace(/-/g, "").trim();

//   if (cedula.length !== 11) {
//     return false;
//   }

//   const cedulaNumeros = cedula.split("").map(Number);

//   const multiplicadores = [1, 2];

//   let suma = 0;

//   for (let i = 0; i < 10; i++) {
//     let multiplicacion = cedulaNumeros[i] * multiplicadores[i % 2];
//     if (multiplicacion >= 10) {
//       multiplicacion = Math.floor(multiplicacion / 10) + (multiplicacion % 10);
//     }
//     suma += multiplicacion;
//   }

//   const residuo = suma % 10;

//   const digitoVerificador = residuo === 0 ? 0 : 10 - residuo;

//   return digitoVerificador === cedulaNumeros[10];
// };
