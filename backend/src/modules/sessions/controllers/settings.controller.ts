import express from 'express';

const SettingsController = {
  async index (_req: express.Request, res: express.Response) {
  try {
    return res.status(200).json({ok:true});
  } catch (error: any) {
    console.log(error);
  }
},
}

export default SettingsController;