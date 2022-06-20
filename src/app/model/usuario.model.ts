export class Usuario {

  static fromFireBase( { email, uid, nombre, ...rest } : any) {
    return new Usuario( uid, nombre, email )
  }

  constructor(
    public uid: string,
    public nombre: string,
    public email: string,
  ) {

  }
}
