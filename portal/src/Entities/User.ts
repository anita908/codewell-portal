class User {
  private _age: number
  private _email: string
  private _isActive: boolean
  private _isAdmin: boolean
  private _name: string
  private _phone: number
  private _username: string
  
  constructor(params: {name: string, email: string, phone: number, age: number, username: string, isActive: boolean, isAdmin: boolean}) {
    const { age, email, name, phone, username, isActive, isAdmin } = params
    this._age = age
    this._email = email
    this._name = name
    this._phone = phone
    this._username = username
    this._isActive = isActive
    this._isAdmin = isAdmin
  }  

  
  public set isAdmin(isAdmin: boolean) {
    this._isAdmin = isAdmin
  }
  
  public get isAdmin() : boolean {
    return this._isAdmin
  }
  
  public set isActive(isActive: boolean) {
    this._isActive = isActive
  }
  
  public set username(username : string) {
    this._username = username
  }

  public set age(age: number) {
    this._age = age
  }

  public set email(email: string) {
    this._email = email
  }

  public set name(name: string) {
    this._name = name
  }

  public set phone(phone: number) {
    this._phone = phone
  }

  public get isActive(): boolean {
    return this._isActive
  }

  public get username() : string {
    return this._username
  }

  public get age(): number {
    return this._age
  }

  public get email(): string {
    return this._email
  }

  public get name(): string {
    return this._name
  }

  public get phone(): number {
    return this._phone
  }
}

export default User 