"use client";

import { useRouter } from "next/navigation";

export function UpdateHandler() {
  const router = useRouter();

  if (typeof window === "undefined") return <></>;

  const needToUpdate = JSON.parse(
    window.localStorage.getItem("not-first-view") ?? "false"
  );

  if (needToUpdate) router.replace("/update");

  return <></>;
}
