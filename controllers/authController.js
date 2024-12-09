const User = require("../models/user");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");

// =========== CONTROLLER FOR SIGN-UP/REGISTER NEW USER ===========
const register = async (req, res, next) => {
  console.log("Request Body:", req.body);
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName) {
    return next(customError("Please provide a name", 400));
  }
  if (!lastName) {
    return next(customError("Please provide a name", 400));
  }
  if (!email) {
    return next(customError("Please provide an email address", 400));
  }

  const trimmedPassword = password.trim();
  const trimmedConfirmPassword = confirmPassword.trim();

  if (!trimmedPassword) {
    return next(customError("Please provide a password", 400));
  }
  if (trimmedPassword !== trimmedConfirmPassword) {
    return next(customError("Password does not match", 400));
  }

  // ===============    HASHING   =============
  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(trimmedPassword, salt);

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User Created" });
  } catch (error) {
    if (error.code === 11000 && error.keyValue.email) {
      console.log(error.code);
      console.log(error.keyValue.email);
      return next(customError("Email Already Exists", 401));
    }
    if (error.errors.email.message) {
      return next(customError(error.errors.email.message, 400));
    }
    next(customError("Something went wrong", 500));
  }
};

// =========== CONTROLLER FOR LOGIN EXISTING USER ==============
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(customError("Please provide an email address", 400));
  }
  if (!password) {
    return next(customError("Please provide a password", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(customError("User does not exist", 401));
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return next(customError("Wrong Password", 400));
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.status(200).json({ message: "Login Successfully", token });
};

// ============ CONTROLLER TO USERS BASED ON VALID TOKEN ===================
const getUser = (req, res, next) => {
  const { userId } = req.user;
  res.status(200).json({ id: userId });
};

module.exports = { register, login, getUser };
