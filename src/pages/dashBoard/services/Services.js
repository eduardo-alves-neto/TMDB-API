import { Environment } from "../../../shared/environment";
import { Api } from "../../../shared/services/api/axios-config";

export class IMovieServices {
  static async get() {
    const { data } = await Api.get("/discover/movie?language=pt-BR", {
      headers: Environment.headers,
    });
    return data;
  }

  static async create(value) {
    await Api.post(
      `/account/${Environment.Count_ID}/favorite?api_key=${Environment.Api_Key}&session_id=${Environment.session_id}`,
      JSON.stringify({
        media_type: "movie",
        media_id: value,
        favorite: true,
      }),
      {
        headers: {
          ...Environment.headers,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
  }
}
