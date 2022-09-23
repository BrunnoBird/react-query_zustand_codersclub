import create from "zustand";
import { persist } from "zustand/middleware";

//Tipo da nossa store
type FavoriteRepoStore = {
  favoriteRepoIds: number[];
  //Criando modificadores de valores (poderia ser sem mas a própria equipe recomenda os Setters, pois é mais seguro)
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
};

const useFavoriteReposStore = create(
  //Tipando create sem persist: <FavoriteRepoStore>

  //persist -> persistir os dados mesmo após o reload do component
  persist<FavoriteRepoStore>(
    //retornar os nossos valores em formato de objetos
    (set) => ({
      //(set) -> permite com que modifique a store
      //Initial States do meu hook
      favoriteRepoIds: [],
      addToFavorites: (repoId: number) => {
        //Chamada do Set
        set((state) => ({
          //Modificar o state (pegando todos os favories + o repo atual);
          favoriteRepoIds: [...state.favoriteRepoIds, repoId],
        }));
      },
      removeFromFavorites: (repoId: number) => {
        set((state) => ({
          favoriteRepoIds: state.favoriteRepoIds.filter((id) => id !== repoId),
        }));
      },
    }),
    {
      //chave da store do localStorage
      //Com projetos React Native você precisa configurar o asyncStorage do RN e informar nas configurações do React Query (muda apenas detalhes de configuração a implementação é a mesma)
      name: "repo-storage",
    }
  )
);

export default useFavoriteReposStore;
