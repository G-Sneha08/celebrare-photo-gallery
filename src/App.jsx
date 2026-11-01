
import {
  useReducer,
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';

import useFetchPhotos from './hooks/useFetchPhotos';
import favouriteReducer from './reducers/favouriteReducer';

function App() {
  // Fetch photos using our custom hook
  const { photos, loading, error } = useFetchPhotos();

  // Store the search text
  const [searchTerm, setSearchTerm] = useState('');

  // Manage favourites using useReducer
  const [favourites, dispatch] = useReducer(
    favouriteReducer,
    [],
    () => {
      const saved = localStorage.getItem('favourites');
      return saved ? JSON.parse(saved) : [];
    }
  );

  // Save favourites whenever they change
  useEffect(() => {
    localStorage.setItem(
      'favourites',
      JSON.stringify(favourites)
    );
  }, [favourites]);

  // Handle search input
  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  // Filter photos based on author name
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [photos, searchTerm]);

  // Add or remove a photo from favourites
  function toggleFavourite(id) {
    dispatch({
      type: 'TOGGLE_FAVOURITE',
      id: id
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Page heading */}
      <h1 className="text-3xl font-bold text-center mb-3">
        Celebrare Photo Gallery
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Explore photos and save your favourites
      </p>

      {/* Search box */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by author name..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center mt-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-center text-red-500">
          {error}
        </p>
      )}

      {/* Photo gallery */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition"
              >

                {/* Photo */}
                <img
                  src={photo.download_url}
                  alt={photo.author}
                  className="w-full h-56 object-cover rounded-lg"
                />

                {/* Author name and favourite button */}
                <div className="flex justify-between items-center mt-3">

                  <p className="text-sm text-gray-600">
                    Photo by{' '}
                    <span className="font-semibold text-gray-900">
                      {photo.author}
                    </span>
                  </p>

                  <button
                    onClick={() => toggleFavourite(photo.id)}
                    className="text-2xl"
                    title="Add or remove from favourites"
                    aria-label="Toggle favourite"
                  >
                    {favourites.includes(photo.id) ? '❤️' : '♡'}
                  </button>

                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No photos found.
            </p>
          )}

        </div>
      )}

    </div>
  );
}

export default App;
