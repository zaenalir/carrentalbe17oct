const Joi = require("joi");

const BaseController = require("../base");
const UserModel = require("../../models/user");
const express = require("express");
const ValidationError = require("../../helpers/errors/validation");
const { encryptPassword } = require("../../helpers/bcrypt");
const router = express.Router();

const user = new UserModel();

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6),
  role: Joi.string().allow(null),
  address: Joi.string().required(),
  avatar: Joi.string().uri().allow(null),
  gender: Joi.string(),
  phone_number: Joi.string(),
  driver_license: Joi.string().uri().allow(null),
  birthdate: Joi.date(),
});

class UserController extends BaseController {
  constructor(model) {
    super(model);
    router.get("/", this.getAll);
    router.post("/", this.validation(userSchema), this.checkUnique, this.encrypt, this.create);
    router.get("/:id", this.get);
    router.put("/:id", this.validation(userSchema), this.checkUnique, this.update);
    router.delete("/:id", this.delete);
  }

  checkUnique = async (req, res, next) => {
    const checkUnique = await this.model.getOne({
      where: {
        OR: [
          {
            email: req.body.email,
          },
          {
            phone_number: req.body.phone_number,
          },
        ],
      },
      select: {
        email: true,
        phone_number: true
      }
    });
    
    if (checkUnique)
      return next(new ValidationError("email or phone number already exist"));

    next()
  };
  
  encrypt = async (req, res, next) => {
    const encryptedPass = await encryptPassword(req.body.password);
    req.body.password = encryptedPass;
    next()
  }
}

new UserController(user);

module.exports = router;
