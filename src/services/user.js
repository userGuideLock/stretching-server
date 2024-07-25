const db = require('../models');

const Join = async (id, email, password) => {
  try {
    const join = await db.User.create({
      id: id,
      email: email,
      password: password,
    });

    return join;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const Login = async (id, password) => {
  try {
    const login = await db.User.findOne({
      where: { id: id, password: password },
    });
    return login;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  Join,
  Login,
};
