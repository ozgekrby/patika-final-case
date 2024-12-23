import * as UserService from "../services/user.service.js";

const getReqUser = async (req) => {
  return await UserService.findByEmail(req.user.email);
};

export { getReqUser };
