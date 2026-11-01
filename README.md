# Photo Gallery Web App

A responsive photo gallery built using React, JavaScript, Vite, and Tailwind CSS. The application fetches photos from the Picsum Photos API and allows users to search for photos by author and save their favourite photos.

## Features

- Fetches 30 photos from the Picsum Photos API.
- Displays a loading spinner while fetching photos.
- Shows an error message if the API request fails.
- Responsive photo gallery layout:
  - 1 column on mobile screens.
  - 2 columns on tablet-sized screens.
  - 4 columns on desktop screens.
- Displays each photo along with the author's name.
- Searches photos by author name in real time without making additional API requests.
- Allows users to add or remove photos from favourites using a heart button.
- Uses `useReducer` to manage favourite photos.
- Saves favourite photo IDs in `localStorage`, so they remain available after refreshing the page.
- Uses a custom `useFetchPhotos` hook to fetch photos.
- Uses `useCallback` for the search handler.
- Uses `useMemo` to filter photos based on the search text.

## Technologies Used

- React
- JavaScript
- Vite
- Tailwind CSS
- Picsum Photos API

## Getting Started

### Prerequisites

Make sure Node.js and npm are installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project folder:

   ```bash
   cd celebrare-gallery
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

The application will automatically open in your default browser.

### Production Build

To create a production build, run:

```bash
npm run build
```

To preview the production build locally, run:

```bash
npm run preview
```

## API Used

**Picsum Photos API**

https://picsum.photos/v2/list?limit=30

The API provides the photo details and image URLs displayed in the gallery.

## Project Structure

```text
celebrare-gallery/
├── src/
│   ├── hooks/
│   │   └── useFetchPhotos.js
│   ├── reducers/
│   │   └── favouriteReducer.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Note

- Favourite photos are stored in the browser's `localStorage`.
- An active internet connection is required to fetch photos from the Picsum Photos API.
