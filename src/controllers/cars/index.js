const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class Cars {
  async getCars(req, res) {
    try {
      const cars = await prisma.cars.findMany({
        select: {
          id: true,
          name: true,
          manufactur: true,
          img: true,
          year: true,
          price: true,
        },
      });
      console.log(cars);
      res.status(200).json(cars);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!");
    }
  }

  async getCarById(req, res) {
    const { id } = req.params;
    try {
      const car = await prisma.cars.findUnique({
        where: { id: Number(id) },
      });
      if (!car) res.status(404).send("Car not found!");
      res.status(200).json(car);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!");
    }
  }

  async createCar(req, res) {
    const {
      name,
      year,
      type,
      manufactur,
      price,
      img,
      licenseNumber,
      seat = 5,
      baggage,
      transmission,
      description,
      isDriver,
      isAvailable,
    } = req.body;
    try {
      const car = await prisma.cars.create({
        data: {
          name,
          year,
          type,
          manufactur,
          price,
          img,
          licenseNumber,
          seat,
          baggage,
          transmission,
          description,
          isDriver,
          isAvailable,
        },
      });
      res.status(200).json(car);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!");
    }
  }

  async updateCar(req, res) {
    const { id } = req.params;
    try {
      const car = await prisma.cars.update({
        data: req.body,
        where: { id },
      });
      if (!car) res.status(404).send("Car not found!");
      res.status(200).json(car);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!");
    }
  }

  async deleteCar(req, res) {
    const { id } = req.params;
    try {
      const car = await prisma.cars.delete({
        where: { id },
      });

      if (!car) return res.status(404).json("Car not found!");

      res.status(200).json("Car deleted successfully!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!");
    }
  }
}

module.exports = new Cars();
