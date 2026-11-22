// Your photo collection. To use your own photos, put them in an `images/` folder
// and change `src` to e.g. "images/my-photo.jpg". `w` and `h` are the photo's
// width and height (or any value with the same ratio), used to lay out the grid.
// Set `featured: true` to show a photo in the slideshow at the top of the page.
const PHOTOS = [
  { src: "https://picsum.photos/seed/peak/1600/1067",    w: 3, h: 2, title: "First Light on the Ridge", category: "Landscape", location: "Paro Valley",  featured: true },
  { src: "https://picsum.photos/seed/elder/1067/1600",   w: 2, h: 3, title: "The Elder",                category: "Portrait",  location: "Thimphu" },
  { src: "https://picsum.photos/seed/market/1600/1067",  w: 3, h: 2, title: "Morning Market",           category: "Street",    location: "Centenary Market" },
  { src: "https://picsum.photos/seed/river/1600/1200",   w: 4, h: 3, title: "River Bend",               category: "Landscape", location: "Punakha",      featured: true },
  { src: "https://picsum.photos/seed/monk/1067/1600",    w: 2, h: 3, title: "Between Prayers",          category: "Portrait",  location: "Bumthang" },
  { src: "https://picsum.photos/seed/road/1600/1067",    w: 3, h: 2, title: "The Long Road",            category: "Travel",    location: "Dochula Pass" },
  { src: "https://picsum.photos/seed/alley/1200/1600",   w: 3, h: 4, title: "Blue Hour Alley",          category: "Street",    location: "Kathmandu" },
  { src: "https://picsum.photos/seed/mist/1600/900",     w: 16, h: 9, title: "Mist Over Pines",         category: "Landscape", location: "Phobjikha",    featured: true },
  { src: "https://picsum.photos/seed/child/1200/1600",   w: 3, h: 4, title: "Curious",                  category: "Portrait",  location: "Haa" },
  { src: "https://picsum.photos/seed/train/1600/1067",   w: 3, h: 2, title: "Window Seat",              category: "Travel",    location: "Darjeeling" },
  { src: "https://picsum.photos/seed/lake/1600/1067",    w: 3, h: 2, title: "Still Water",              category: "Landscape", location: "Lake Tsho" },
  { src: "https://picsum.photos/seed/vendor/1067/1600",  w: 2, h: 3, title: "Tea Vendor",               category: "Street",    location: "Phuentsholing" },
  { src: "https://picsum.photos/seed/temple/1600/1200",  w: 4, h: 3, title: "Cliffside",                category: "Travel",    location: "Taktsang" },
  { src: "https://picsum.photos/seed/dancer/1067/1600",  w: 2, h: 3, title: "Festival Mask",            category: "Portrait",  location: "Tsechu" },
  { src: "https://picsum.photos/seed/night/1600/1067",   w: 3, h: 2, title: "Neon Rain",                category: "Street",    location: "Bangkok" },
];
