import IUserCredentials from './Interface/IUserCredentials'

interface IResetPasswordPresenter {
  resetPassword(newCredentials: IUserCredentials): Promise<string>
}

export default IResetPasswordPresenter
