import { userService } from "@/server/services/user/userService";

import { USER_ID } from "~/server/api/config/constants";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body || typeof body.cost !== "number") {
    throw createError({
      statusCode: 400,
      message: "Неверный формат данных. Ожидается поле 'cost' (number).",
    });
  }

  const result = await userService.processPurchase(USER_ID, body.cost);

  return result;
});
