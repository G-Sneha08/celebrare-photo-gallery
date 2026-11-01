import { useState, useEffect } from 'react';

function useFetchPhotos() {

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    fetch('https://picsum.photos/v2/list?limit=30')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }

        return response.json();
      })
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

  }, []);

  return { photos, loading, error };
}

export default useFetchPhotos;