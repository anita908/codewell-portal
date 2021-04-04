import IUserCredentials from './Interface/IUserCredentials'

interface IResetPasswordPresenter {
  resetPassword(newCredentials: IUserCredentials): Promise<any>
  logout(): Promise<void>
}

export default IResetPasswordPresenter
