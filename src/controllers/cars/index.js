const Joi = require("joi");

const BaseController = require('../base')
const CarModel = require('../../models/cars')

const cars = new CarModel();

const carSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  type: Joi.string(),
  manufactur: Joi.string().required(),
  isDriver: Joi.boolean().required(),
  img: Joi.string().uri().allow(null),
  description: Joi.string().allow(null),
  isAvailable: Joi.boolean(),
  licenseNumber: Joi.string(),
  seat: Joi.number().min(2),
  baggage: Joi.number(),
  transmission: Joi.string(),
  year: Joi.string(),
})

class CarsController extends BaseController {
  constructor(model) {
    super(model);
    this.router.get("/", this.getAll);
    this.router.post("/", this.validation(carSchema), this.create);
    this.router.get("/:id", this.get);
    this.router.put("/:id", this.validation(carSchema), this.update);
    this.router.delete("/:id", this.delete);
  }
}

const carsController = new CarsController(cars);

module.exports = carsController.router
