import { Settings } from '../../../models/settings.model';
import db from '../../../database';
import { Repository } from 'typeorm';

class SettingsRepository {
    settingsRepository: Repository<Settings>;
    constructor() { 
      this.settingsRepository = db.manager.getRepository(Settings);
    }
    getById = async (id: number) => {
        return this.settingsRepository.findOneBy({ id });
    }
    getByEmail = async (email: string) => {
        return this.settingsRepository.findOneBy({ email });
    }
    update = async (settings: Settings) => {
        return this.settingsRepository.save(settings);
    }
}

export default SettingsRepository;