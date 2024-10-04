import { http, HttpResponse } from "msw";
import { LOCAL_STORE_DATA_KEY } from "../constants";
import { STATIC_DATA } from "../static-data";

export const handlers = [
  http.get("/api/v1/data", async () => {
    const data = localStorage.getItem(LOCAL_STORE_DATA_KEY);

    await new Promise((res) => setTimeout(res, 2000));

    if (data) {
      console.log("Returning from local store");
      return HttpResponse.json(JSON.parse(data));
    }

    localStorage.setItem(LOCAL_STORE_DATA_KEY, JSON.stringify(STATIC_DATA));

    return HttpResponse.json(STATIC_DATA);
  }),

  http.post("/api/v1/data", async ({ request }) => {
    const data = await request.json();

    await new Promise((res) => setTimeout(res, 2000));

    localStorage.setItem(LOCAL_STORE_DATA_KEY, JSON.stringify(data));

    if (data) return HttpResponse.json(data);
    return HttpResponse.json(STATIC_DATA);
  }),
];
