import { sequelize, dataTypes, checkModelName, checkPropertyExists } from "sequelize-test-helpers";

import User from "../User";
describe("src/models/User", () => {
  console.log("aloha");
  const UserModel = User(sequelize, dataTypes);
  const user = new UserModel();
  checkModelName(User)("User");
  context("properties", () => {
    ["name", "email", "password"].forEach(checkPropertyExists(user));
  });
  expect(user).toBeTruthy();
});
