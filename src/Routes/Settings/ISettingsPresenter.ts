import ISettings from "./Interfaces/ISettings";

interface ISettingsPresenter {
    getUserSettings(): Promise<ISettings>
    updateUserSettings(newSettings: ISettings): Promise<void>
  }
  
  export default ISettingsPresenter
  