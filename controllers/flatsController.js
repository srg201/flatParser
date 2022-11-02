import FlatsModel from "../models/FlatsModel.js";
import getFlats from "../utils/getFlats.js";

class UserController {
  async getNewFlats(req, res, next) {
    try {
      let flats = await getFlats();
      console.log(flats.length);
      let notSavedFlats = [];

      for (const flat of flats) {
        const isSaved = await FlatsModel.findOne({flatID: flat.flatID});

        if (!isSaved) {
          await FlatsModel.create(flat);
          notSavedFlats.push(flat);
        }
      }

      console.log(notSavedFlats.length);
      return res.json(notSavedFlats);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

const userController = new UserController();

export default userController;
