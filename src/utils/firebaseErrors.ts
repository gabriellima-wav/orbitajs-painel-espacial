// src/utils/firebaseErrors.ts
export function getFirebaseErrorMessage(code: string): string {
  switch (code) {
    case "auth/invalid-email":
      return "O e-mail informado é inválido.";
    case "auth/user-disabled":
      return "Esta conta foi desativada.";
    case "auth/user-not-found":
      return "Usuário não encontrado.";
    case "auth/wrong-password":
      return "Senha incorreta.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde.";
    default:
      return "Ocorreu um erro inesperado. Tente novamente.";
  }
}
