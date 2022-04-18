import { Settings } from '../../../models/settings.model';
import db from '../../../database';

class SettingsRepository {
    settingsRepository = db.getRepository(Settings);
    getById = async (id: number) => {
        return this.settingsRepository.findOneBy({ id });
    }
    getByEmail = async (email: string) => {
        return this.settingsRepository.findOneBy({ email });
    }
}

export default SettingsRepository;