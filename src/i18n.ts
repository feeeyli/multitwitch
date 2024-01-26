import { getRequestConfig } from "next-intl/server";
import { env } from "./env";

type RecursiveObject = {
  [key: string]: string | RecursiveObject;
};

function replaceValues(object: RecursiveObject): RecursiveObject {
  const result: RecursiveObject = {};

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (typeof object[key] === "object" && object[key] !== null) {
        // If the value is an object, recursively call the function
        result[key] = replaceValues(object[key] as RecursiveObject);
      } else if (typeof object[key] === "string") {
        // If the value is a string, replace specific substrings
        result[key] =
          env.APP_VARIANT === "frogg"
            ? (object[key] as string)
                .replaceAll("MultiQSMP", "MultiFrogg")
                .replaceAll("QSMP", "Frogg SMP")
            : object[key];
      } else {
        // Copy non-string, non-object values directly
        result[key] = object[key];
      }
    }
  }

  return result;
}

export default getRequestConfig(async ({ locale }) => ({
  messages: replaceValues(
    (await import(`./messages/${locale}.json`)).default as Messages
  ),
}));
