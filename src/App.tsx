import { useCallback, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import useFetchRepos from "./queries/repo";
import Card from "./components/Card";
import useFavoriteReposStore from "./store/useFavoriteRepos";

function App() {
  const { data } = useFetchRepos("CarlosLevir");

  //Recomendação do Zuztand trabalhar de formas separadas.
  const favoriteRepoIds = useFavoriteReposStore(
    (state) => state.favoriteRepoIds
  );
  const addToFavorites = useFavoriteReposStore((state) => state.addToFavorites);
  const removeFromFavorites = useFavoriteReposStore(
    (state) => state.removeFromFavorites
  );

  const handleAddToFavorites = useCallback((repoId: number) => {
    addToFavorites(repoId);
  }, []);

  const handleRemoveFromFavorites = useCallback((repoId: number) => {
    removeFromFavorites(repoId);
  }, []);

  return (
    <div className="App">
      {data?.map((repo) => (
        <Card
          key={repo.id}
          repo={repo}
          addToFavorites={handleAddToFavorites}
          removeFromFavorites={handleRemoveFromFavorites}
          isFavorite={favoriteRepoIds.includes(repo.id)}
        />
      ))}
    </div>
  );
}

export default App;
