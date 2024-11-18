import { logInServices, signUpServices } from "../services/auth.services.js";

export const signUpControllers = async (req, res, next) => {
  try {
    const response = await signUpServices(req.body);
    res
      .status(201)
      .json({ message: "User successfully created", newUser: response });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next();
  }
};

export const logInControllers = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await logInServices({ email, password });

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
