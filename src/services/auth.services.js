import { logIn, signUp } from "../controllers/auth.controllers.js";

export const signUpServices = async (req, res, next) => {
  try {
    const response = await signUp(req.body);
    res
      .status(201)
      .json({ message: "User successfully created", newUser: response });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next();
  }
};

export const logInServices = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await logIn({ email, password });

    res.status(200).json({
      message: "Login successful",
      token: response.token,
      user: response.user,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
    next();
  }
};
