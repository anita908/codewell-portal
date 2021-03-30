import ISettings from "./Interfaces/ISettings";

interface ISettingsPresenter {
    getUserSettings(): Promise<void>
    updateUserSettings(newSettings: ISettings): Promise<void>
  }
  
  export default ISettingsPresenter
  