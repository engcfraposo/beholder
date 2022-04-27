import bcrypt from "bcrypt";
import crypto from "../../../utils/crypto";
import Settings  from '../../../models/settings.model';

interface NewSettings{
  email: string;
  password: string;
  apiUrl: string;
  streamUrl: string;
  accessKey: string;
  secretKey: string;
}

const getById = async (id: number) => {
  const { dataValues }: any = await Settings.findOne({ where: {id} });
  return dataValues 
}

const getDefaultSettings = async () => {
  const { dataValues }: any = await Settings.findOne();
  return dataValues;
}

const getByEmail = async (email: string) => {
  const { dataValues }: any = await Settings.findOne({ where: {email} });
  return dataValues 
}

const update = async (id: number, newSettings: NewSettings) => {
  const user = await getById(id);
  if(newSettings.email !== user.email){
    user.email = newSettings.email;
  }

  if(newSettings.password){
    user.password = bcrypt.hashSync(newSettings.password, 10);
  }

  if(
    newSettings.apiUrl &&
    newSettings.apiUrl !== user.apiUrl
    ){
    user.apiUrl = newSettings.apiUrl;
  }

  if(
    newSettings.streamUrl &&
    newSettings.streamUrl !== user.streamUrl
    ){
    user.streamUrl = newSettings.streamUrl;
  }

  if(
    newSettings.accessKey &&
    newSettings.accessKey !== user.accessKey
    ){
    user.accessKey = newSettings.accessKey;
  }

  if(newSettings.secretKey){
    user.secretKey = crypto.encrypt(newSettings.secretKey);
  }
  await user.save()
}

export default{
    getById,
    getDefaultSettings,
    getByEmail,
    update
}
