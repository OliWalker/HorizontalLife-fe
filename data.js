export default {
  User: {
    userName: 'JohnnyClimber',
    email: 'John@gmail.com',
    password: 'weDontSaveThis',
    grade: '7b',
    settings: {
      language: 'en'
    },
    gyms: []
  },
  Gym: {
    gymName: 'Chris Sharma',
    logo:
      'http://www.sharmaclimbingbcn.com/wp-content/themes/sharma-theme/img/logo.png',
    picture:
      'https://www.walltopia.com/media/k2/items/cache/3e8e1949f1c3300c7f060866b463e01c_L.jpg',
    motto: 'Just go and climb it.',
    address: '',
    city: 'barcelona',
    country: 'spain',
    latlng: { lat: 41.01, lng: 43.03 },
    members: [],
    sections: [],
    routes: [],
    stats: [
      { routeCount: 36 },
      { sectionCount: 8 },
      { memberCount: 98 },
      { gym: true },
      { yoga: true },
      { changeTime: 'bi-weekly' },
      { food: true },
      { beer: true }
    ],
    map: '#######'
  },
  Section: {
    name: 'cave',
    mapLoc: '#######',
    routes: []
  },
  Route: {
    name: 'killerCheese',
    grade: '6b',
    publicGrade: '7a',
    points: 200,
    tags: ['overhand', 'fingers', 'power'],
    setter: 'Tom Johnson',
    climbed: [],
    comments: ['super cool!', 'too easy'],
    gym: []
  }
};
