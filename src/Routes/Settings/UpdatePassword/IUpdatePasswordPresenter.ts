import IUserCredentials from './Interfaces/IUserCredentials';

interface IUpdatePasswordPresenter {
  updateUserPassword(newCredentials: IUserCredentials): Promise<string>
}

export default IUpdatePasswordPresenter
