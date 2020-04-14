import '../sass/index.scss';
import Moviedata from './module/datacontrols';


const moviedata = new Moviedata({
    el:"#data-movie",
    url:"https://www.kobis.or.kr",
    key:"430156241533f1d058c603178cc3ca0e"
});