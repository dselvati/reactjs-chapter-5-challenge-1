import { AutoSizer, List, ListRowRenderer } from "react-virtualized";
import { MovieCard } from "../MovieCard";

import styles from './styles.module.scss'


interface ContentProps {
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
}

export function Content({ selectedGenre, movies }: ContentProps) {


  let itemsPerRow: number

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, movies.length);


    for (let i = fromIndex; i < toIndex; i++) {
      items.push(
        <div
          className={styles.Item}
          key={i}
        >
          <MovieCard movie={movies[i]} />
        </div>
      )
    }

    return (
      <div
        className={styles.Row}
        key={key}
        style={style}
      >
        {items}
      </div>
    )
  }



  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {/* {movies.map(movie => (
            // <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            <MovieCard key={movie.imdbID} movie={movie} />

          ))} */}




        </div>
      </main>

      <AutoSizer>
        {
          ({ height, width }) => {
            console.log(width)
            itemsPerRow = Math.floor(width / 228);
            const rowCount = Math.ceil(movies.length / itemsPerRow);

            return (

              <List
                className={styles.List}
                height={height}
                width={width}
                // overscanRowCount={6}
                rowCount={rowCount}
                rowHeight={380}
                rowRenderer={rowRenderer}

              />
            )
          }
        }
      </AutoSizer>
    </div>
  )
}