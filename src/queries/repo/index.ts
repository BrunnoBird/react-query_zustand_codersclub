import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { Repo } from "./types";

//Nossa função de queries
async function getRepos(ctx: QueryFunctionContext) {
  //Pegando os valores do contexto da minha useQuery onde desestruturo e pego os valores que vão vir.
  const [queryKey, userId] = ctx.queryKey;

  const { data } = await api.get<Repo[]>(`/users/${userId}/repos`);

  return data;
}

//Camada de cache da request (geranmente usando hooks)
export default function useFetchRepos(userId: string) {
  return useQuery(["repos", userId], getRepos);
}
