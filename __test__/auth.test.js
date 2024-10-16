const request = require("supertest");
const server = require("../index");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const testUser = {
  email: "test@test.com",
  password: "Password1!",
};

describe("POST /api/v1/register", () => {
  // 1. Berhasil Register,
  it("should response with 201 status code", () =>
    request(server)
      .post("/api/v1/auth/signup")
      .send(testUser)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            code: 200,
            status: "success",
            message: "Sign up successfully",
            data: expect.objectContaining({
              user:{
                email: "test@test.com",
                password: expect.not.stringContaining("123456"),
                address: null,
                avatar: null,
                birthdate: null,
                createdBy: null,
                createdDt: expect(new Date(res.body.data.createdDt)).toBeInstanceOf(Date),
                driver_license: null,
                fullname: null,
                gender: null,
                phone_number: null,
                roleId: 3,
                updatedBy: null,
                updatedDt: expect(new Date(res.body.data.createdDt)).toBeInstanceOf(Date)
              }
            }),
          })
        );
      }));
});

afterAll(() => {
  prisma.users.deleteMany()
  server.close()
})
