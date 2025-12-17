// src/api/lineageApi.js
import API from "./api";

export const fetchLineageStats = async () => {
  const [nwankwo, asouzu, udorji, okoli, anyaga] = await Promise.all([
    API.get("/nwankwos"),
    API.get("/asouzus"),
    API.get("/udorjis"),
    API.get("/okolis"),
    API.get("/anyagas"),
  ]);

  return {
    nwankwo: nwankwo.data.length,
    asouzu: asouzu.data.length,
    udorji: udorji.data.length,
    okoli: okoli.data.length,
    anyaga: anyaga.data.length,
  };
};
