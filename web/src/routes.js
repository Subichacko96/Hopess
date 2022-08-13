import Index from './views/pages/Home';
import Blog from './views/pages/BolgList';
import BlogDetails from './views/pages/BlogDetails';




var routes = [
  {
    path: '/',
    name: 'Dashboard',
   // icon: 'ni ni-tv-2 text-primary',
    component: Index,
    visible: false,
  },

 
  {
    path: '/blog',
    name: 'News List',
    icon: 'ni ni-bullet-list-67 text-info',
    component: Blog,
   
    visible:false,
  },
   
  {
    path: '/b/:id/detail',
    name: 'Blog Details',
    icon: 'ni ni-bullet-list-67 text-info',
    component: BlogDetails,
   
    visible:false,
  },
   {
      path: '/blogdetails',
      name: 'Blog Details',
      icon: 'ni ni-bullet-list-67 text-info',
      component: BlogDetails,
     
      visible:true,
    },
  {
    path: '/listads',
    name: 'Ads List',
    icon: 'ni ni-bullet-list-67 text-info',
    component: Adslist,
    
    visible:true,
  },
  {
    path: '/:id/newsdetail',
    name: 'News Detail',
    icon: 'ni ni-bullet-list-67 text-green',
    component: NewsDetail,
   
    visible: false,
  },
  {
    path: '/:id/adsdetail',
    name: 'Ads Detail',
    icon: 'ni ni-bullet-list-67 text-green',
    component: AdsDetail,
    visible: false,
  },
];
export default routes;
