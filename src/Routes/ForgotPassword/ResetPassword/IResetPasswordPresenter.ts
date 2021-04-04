import IUserCredentials from './Interface/IUserCredentials'

interface IResetPasswordPresenter {
  resetPassword(newCredentials: IUserCredentials, token: string): Promise<string>
}

export default IResetPasswordPresenter
