interface ILogoutPresenter {
  logout(username: string): Promise<void>
}

export default ILogoutPresenter
