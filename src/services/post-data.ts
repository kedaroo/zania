import { Card } from "../types";

export const postData = async (data: Card[]) => {
  await fetch("/api/v1/data", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
