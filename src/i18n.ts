import { getRequestConfig } from "next-intl/server";
import { env } from "./env";

const replaces = {
  frogg: [
    ["MultiQSMP", "MultiFrogg"],
    ["QSMP", "Frogg SMP"],
  ],
  twitch: [
    ["MultiQSMP", "MultiTwitch"],
    ["", ""],
  ],
  purgatory: [
    ["MultiQSMP", "MultiPurgatory"],
    ["QSMP", "QSMP Purgatory"],
  ],
};

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
          env.APP_VARIANT !== "qsmp"
            ? (object[key] as string)
                .replaceAll(
                  replaces[env.APP_VARIANT][0][0],
                  replaces[env.APP_VARIANT][0][1]
                )
                .replaceAll(
                  replaces[env.APP_VARIANT][1][0],
                  replaces[env.APP_VARIANT][1][1]
                )
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
