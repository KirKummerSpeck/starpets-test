import { userService } from "@/server/services/user/userService";
import { USER_ID } from "~/server/api/config/constants";

export default defineEventHandler(async () => {
  const user = await userService.getUserProfile(Number(USER_ID));

  return user;
});
