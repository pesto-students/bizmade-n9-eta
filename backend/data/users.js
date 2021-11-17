import bcrypt from "bcryptjs";

const users = [
  {
    name: "Manufacturer",
    email: "manufacturer@example.com",
    password: bcrypt.hashSync("123456", 10),
    phoneNumber: 9121981899,
    isManufacturer: true,
  },
  {
    name: "Ajay",
    email: "ajay12@example.com",
    password: bcrypt.hashSync("123456", 10),
    phoneNumber: 9121981898,
  },
  {
    name: "Keerthi",
    email: "keerthi23@example.com",
    password: bcrypt.hashSync("123456", 10),
    phoneNumber: 9121981897,
  },
];

export default users;
