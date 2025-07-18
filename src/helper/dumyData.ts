import { automobile, banerImages, beachImage, cinemahall, gameZone, healthCare, hotelsDeals, resort, restaurant, salon, waterPark } from "./imagesAssets";

export const cities = [
  { label: 'Jaipur', value: 'jaipur' },
  { label: 'Delhi', value: 'delhi' },
  { label: 'Mumbai', value: 'mumbai' },
  { label: 'Bangalore', value: 'bangalore' },
  { label: 'Hyderabad', value: 'hyderabad' },
  { label: 'Chennai', value: 'chennai' },
];

export const categoryList = [
  { id: '1', title: 'Restaurant', icon:restaurant, borderColor: '#FFA07A' },
  { id: '2', title: 'Resort', icon: resort, borderColor: '#DA70D6' },
  { id: '3', title: 'Waterpark', icon: waterPark, borderColor: '#87CEFA' },
  { id: '4', title: 'Salon', icon: salon, borderColor: '#FFB6C1' },
  { id: '5', title: 'Game Zone', icon: gameZone, borderColor: '#FFD700' },
  { id: '6', title: 'Cinema Hall', icon: cinemahall, borderColor: '#CD5C5C' },
  { id: '7', title: 'Healthcare', icon: healthCare, borderColor: '#20B2AA' },
  { id: '8', title: 'Hotels Deals', icon: hotelsDeals, borderColor: '#F0E68C' },
  { id: '9', title: 'Automobiles', icon: automobile, borderColor: '#1E90FF' },
];


export const trendingData = [
  {
    id: '1',
    title: 'Mauritius Beach',
    location: 'Bel Ombre',
    rating: 4.2,
    tag: 'Guest Favourite',
    description: 'Excellent',
    reviews: 552,
    price: 'Rs. 11,700',
    stars: 4,
    image: beachImage,
  },
  {
    id: '2',
    title: 'Hilltop Resort',
    location: 'Shimla',
    rating: 4.5,
    tag: 'Top Rated',
    description: 'Outstanding',
    reviews: 312,
    price: 'Rs. 9,200',
    stars: 5,
    image: beachImage
  },
  {
    id: '3',
    title: 'Hilltop Resort',
    location: 'Shimla',
    rating: 4.5,
    tag: 'Top Rated',
    description: 'Outstanding',
    reviews: 312,
    price: 'Rs. 9,200',
    stars: 5,
    image: beachImage
  },
  // add more if needed
];

export const cardDummyData =[
  {
    id:"1",
    heading:"Dinner Buffet For 2 Person",
    description:"Two Breakfast Buffet Valid for 2 People One Time.",
    status:"Active",
    price:"400",
    actualPrice:"800",
  },
  {
    id:"2",
    heading:"Lunch Buffet For 2 Person",
    description:"Two Lunch Buffet Valid for 2 People One Time.",
    status:"Expired",
    price:"500",
    actualPrice:"1000",
  },
  {
    id:"3",
    heading:"Spa Package For 1 Person",
    description:"Relaxing Spa Package Valid for 1 Person.",
    status:"Active",
    price:"1200",
    actualPrice:"1500",
  },
  
]

export const banerData = [
  {id:1,image:banerImages}, // Your image 1
  {id:2,image:banerImages},     // Your image 2
  {id:3,image:banerImages},     // Your image 3
];
