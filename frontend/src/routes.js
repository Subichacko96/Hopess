import Index from 'views/Index.js';
import Logout from './views/LogoutLoading.js';
import Login from 'views/pages/Login.js';
import Resgister from 'views/pages/Register.js';
import AddNews from 'views/pages/AddNews.js';
import AddAds from 'views/pages/AddAds.js';
import Newslist from 'views/pages/Newslist.js';
import Adslist from 'views/pages/Adslist.js';
import NewsDetail from 'views/pages/NewsDetail.js';
import AdsDetail from 'views/pages/AdsDetails.js';




var routes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Index,
    layout: '/admin',
    visible: true,
  },

  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/auth',
    visible: false,
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-key-25 text-info',
    component: Resgister,
    layout: '/auth',
    visible: false,
  },
  {
    path: '/addnews',
    name: 'AddNews',
    icon: 'ni ni-collection text-info',
    component: AddNews,
    layout: '/admin',
    visible:true,
  },
  {
    path: '/listnews',
    name: 'News List',
    icon: 'ni ni-bullet-list-67 text-info',
    component: Newslist,
    layout: '/admin',
    visible:true,
  },
  {
    path: '/addads',
    name: 'Add Ads',
    icon: 'ni ni-collection text-info',
    component: AddAds,
    layout: '/admin',
    visible:true,
  },
  {
    path: '/listads',
    name: 'Ads List',
    icon: 'ni ni-bullet-list-67 text-info',
    component: Adslist,
    layout: '/admin',
    visible:true,
  },
  {
    path: '/:id/newsdetail',
    name: 'News Detail',
    icon: 'ni ni-bullet-list-67 text-green',
    component: NewsDetail,
    layout: '/admin',
    visible: false,
  },
  {
    path: '/:id/adsdetail',
    name: 'Ads Detail',
    icon: 'ni ni-bullet-list-67 text-green',
    component: AdsDetail,
    layout: '/admin',
    visible: false,
  },



  {
    path: '/logout',
    name: 'Logout',
    icon: 'ni ni-button-power text-danger',
    component: Logout,
    layout: '/admin',
    visible: true,
  },
];
export default routes;
