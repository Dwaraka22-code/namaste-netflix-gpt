import { useDispatch, useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import { useRef } from 'react';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.config.lang);

  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=' +
        movie +
        '&include_adult=false&language=en-US&page=1',
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGPTSearchClick = async () => {
    //Make a call to OpenAI API
    console.log(searchText.current.value);

    const gptQuery =
      'Act as a Movie Recommendation System and Suggest some movies for the query:' +
      searchText.current.value +
      '. Only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar,Sholay, Nuvvu Naaku Nachchav , Gabbar Singh, Shankar Dada MBBS ';

    //Make an API call to GPT API and get Movie Results
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    // console.log(gptResults.choices);

    if (!gptResults.choices) {
      //TODO:Write Error Handling
    }

    // console.log(gptResults.choices?.[0]?.message?.content);
    //"Andaz Apna Apna, Chupke Chupke, Gol Maal, Hera Pheri, Chup Chup Ke"

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(',');
    // console.log(gptMovies);
    //['Andaz Apna Apna', ' Hera Pheri', ' Chupke Chupke', ' Amar Akbar Anthony', ' Seeta Aur Geeta']

    //For each string(movie) in gptMovies, Make an API call and fetch results from TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie)); //searchMovieTMDB(movie) - async function
    //[Promise,Promise,Promise,Promise,Promise]
    //it will take some time to return json.results

    const tmdbResults = await Promise.all(promiseArray);
    //This program will only finish once all 5 promises are resolved
    //eg:[Promise - 1sec,Promise - 3sec,Promise- 2sec,Promise - 4sec,Promise-3sec] - All will be resolved - call all results
    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="md:pt-[10%] pt-[35%] flex justify-center">
      <form
        className=" md:w-1/2 w-full bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className=" p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
          ref={searchText}
        />
        <button
          onClick={handleGPTSearchClick}
          className=" col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
