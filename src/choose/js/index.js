import '../sass/index.scss';
import Choose from './util/choose';

const choose = new Choose({
    el:"#contents",
    data:{
        tribe:"elyos",      // elyos, devil
        job:"fighter-elyos",        // knight, fighter, assassin, ranger, priest, chanter, wizard, elementalist, gunner, rider, bard, painter
        gender:"female",      // male, female
    },
    complete:false
});

$(".btn_cht").on("click", ()=>{
    console.log(choose.chosen.tribe, choose.chosen.job, choose.chosen.gender)
});

// 캐릭터 선택 완료시
// choose.setComplete(1, 14, 1,true);
