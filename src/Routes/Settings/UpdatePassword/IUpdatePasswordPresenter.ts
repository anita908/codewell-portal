import IUserCredentials from './Interfaces/IUserCredentials';

interface IUpdatePasswordPresenter {
  updateUserPassword(newCredentials: IUserCredentials): Promise<any>
}

export default IUpdatePasswordPresenter
