import { AppState } from "../AppState.js";
import { Aword } from "../models/Aword.js";
import { api } from "./AxiosService.js";

class AwordsService {
  async getAwords() {
    const res = await api.get("/api/ads");
    AppState.awords = res.data.map((a) => new Aword(a));
  }
}

export const awordsService = new AwordsService();
