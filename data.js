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
    logo: '',
    picture:
      'https://www.walltopia.com/media/k2/items/cache/3e8e1949f1c3300c7f060866b463e01c_L.jpg',
    motto: '',
    address: '',
    city: 'barcelona',
    country: 'spain',
    latlng: { lat: 41.01, lng: 43.03 },
    members: [],
    sections: [],
    routes: [],
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
