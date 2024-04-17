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
  static async search(value) {
    const { data } = await Api.get(
      `/search/movie?language=pt-BR&query=${value}`,
      {
        headers: Environment.headers,
        "Content-Type": "application/json;charset=utf-8",
      }
    );
    return data;
  }

  static async getFavorites() {
    const { data } = await Api.get(
      `/account/${Environment.Count_ID}/favorite/movies?api_key=${Environment.Api_Key}&session_id=${Environment.session_id}&language=pt-BR`,
      {
        headers: Environment.headers,
      }
    );
    return data;
  }
}
