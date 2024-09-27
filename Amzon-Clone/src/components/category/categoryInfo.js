import img1 from "./images/gamesAccessories/10001 (1).jpg";
import img2 from "./images/gamesAccessories/10002 (1).jpg";
import img3 from "./images/gamesAccessories/10004 (1).jpg";
import img4 from "./images/gamesAccessories/10005 (1).jpg";
import img5 from "./images/homeArrival/home1.jpg";
import img6 from "./images/homeArrival/home2.jpg";
import img7 from "./images/homeArrival/home3.jpg";
import img8 from "./images/homeArrival/home4.jpg";
import img9 from "./images/shopDeal/shop1.jpg";
import img10 from "./images/shopDeal/shop2.jpg";
import img11 from "./images/shopDeal/shop3.jpg";
import img12 from "./images/shopDeal/shop4.jpg";
import img13 from "./images/Refresh/refresh1.jpg";
import img14 from "./images/Refresh/refresh2.jpg";
import img15 from "./images/Refresh/refresh3.jpg";
import img16 from "./images/Refresh/refresh4.jpg";
import img17 from "./images/10007.jpg";
import img18 from "./images/10008.jpg";
import img19 from "./images/10009.jpg";
import img20 from "./images/10001 (2).jpg";

const categoryImage = [
  {
    title: "Gaming accessories",
    name: "electronics",
    imgs: [
      { img: img1, name: "Headsets" },
      { img: img2, name: "Keyboards" },
      { img: img3, name: "Computr mice" },
      { img: img4, name: "Chairs" },
    ],
  },
  //  {
  //   title: "Discover fahion trends",
  //   imgs: ,
  // },
  {
    title: "Men's Clothing",
    name: "men's clothing",
    imgs: "https://m.media-amazon.com/images/I/81RaWtv4Q6L._AC_UL320_.jpg",
  },
  {
    title: "Shop deals in Fashion",
    name: "women's clothing",
    imgs: [
      {
        img: img9,
        name: "Jeans under $50",
      },
      { img: img10, name: "Tops under $25" },
      { img: 'https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2022/SITE_FLIPS/SPR_22/GW/DQC/DQC_APR_TBYB_W_DRESSES_1x._SY116_CB623353881_.jpg', name: "Dersses under $30" },
      { img: img12, name: "Shoes under $50" },
    ],
  },
  {
    title: "jewelery",
    name: "jewelery",
    imgs: "https://m.media-amazon.com/images/I/618BagtosBL._AC_UL320_.jpg",
  },
  {
    title: "New home arrivals under $50",
    imgs: [
      {
        img: img5,
        name: "Kitchen & dining",
      },
      { img: img6, name: "Home & dining" },
      { img: img7, name: "Decor" },
      { img: img8, name: "Bedding & bath" },
    ],
  },
  {
    title: "Refresh your space",
    imgs: [
      { img: img13, name: "Dining" },
      { img: img14, name: "Home" },
      { img: img15, name: "Kitchen" },
      { img: img16, name: "Health and Beauty" },
    ],
  },
  {
    title: "Toys under $25",
    imgs: img17,
  },
  // {
  //   title: "Beauty steals under $25",
  //   imgs: img18,
  // },
  // {
  //   title: "Get your game on",
  //   imgs: img19,
  // },
  {
    title: "Home decore under $50",
    imgs: img20,
  },
];

export default categoryImage;
