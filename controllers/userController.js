import UserModel from "../models/UserModel.js";

class UserController {
  async registration(req, res, next) {
      try {
        const tg_id = req.body.id;
        const isUserSaved = await UserModel.findOne({ tg_id });

        if (!isUserSaved) {
          const user = await UserModel.create({ tg_id })
          return res.json(user)
        }

        return res.json({user:isUserSaved, isUserWasSaved: true});
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserModel.find({push: true});
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }

  async getMe(req, res, next) {
    try {
      const tg_id = Number(req.params.id);
      const user = await UserModel.findOne({tg_id});
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }

  async changeStatus(req, res, next) {
    try {
      const tg_id = Number(req.params.id);
      const {push} = await UserModel.findOne({ tg_id });
      await UserModel.updateOne({ tg_id }, { push: !push });
      const user = await UserModel.findOne({ tg_id });
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }
}

const userController = new UserController();

export default userController;
