class Choose{
    constructor(opts){
        this.opts = $.extend(false ,{
            el:"#element",
            data:{
                tribe:"elyos",      // elyos, devil
                job:"knight-elyos",        // knight, fighter, assassin, ranger, priest, chanter, wizard, elementalist, gunner, rider, bard, painter
                gender:"male",      // male, female
            }
        }, opts);

        this.$tabWrap = $(".pm-tab__menu");
        this.$tabMenu = this.$tabWrap.find("[data-tab-menu]");
        this.$jobWrap = $(".job-menu");
        this.$jobMenu = this.$jobWrap.find("[data-job-menu]");
        this.$tribeWrap = $("[data-tribe]");
        this.$jobCon = $("[data-job-con]");
        this.$genderMenu = $("[data-gender]");

        this.current = {
            tribe:"",
            job:"",
            gender:"",
        };

        this.chosen = {
            tribe:"",
            job:"",
            gender:"",
        };

        this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

        this._init();
    }

    _init(){
        this._settings();
        this._controls();
    }

    _controls(){
        this.$tabMenu.on("click", (evt)=>{
            if(this.opts.complete) return false;
            let tribeStr = $(evt.currentTarget).data("tab-menu")
            if(this.current.tribe == tribeStr) return false;
            let jobStr = $(`[data-tribe=${tribeStr}]`).find(this.$jobCon).eq(0).data("job-con");
            let genderStr = this.$genderMenu.eq(0).data("gender");
            this.changeTribe(tribeStr);
            this.checkDevice(jobStr);
            this.changeJob(jobStr);
            this.changeGender(genderStr);
        });

        this.$jobMenu.on("click", (evt)=>{
            if(this.opts.complete) return false;
            let jobStr = $(evt.currentTarget).data("job-menu");
            if(this.current.job == jobStr) return false;
            this.checkDevice(jobStr);
            this.changeJob(jobStr);
        });

        this.$genderMenu.on("click", (evt)=>{
            if(this.opts.complete) return false;
            let genderStr = $(evt.currentTarget).data("gender");
            if(this.current.gender == genderStr) return false;
            this.changeGender(genderStr);
        });
    }

    _settings(){
        this.changeTribe(this.opts.data.tribe);
        this.checkDevice(this.opts.data.job);
        this.changeJob(this.opts.data.job);
        this.changeGender(this.opts.data.gender);
    }

    changeTribe(tribeStr){
        this.$tabMenu.removeClass("pm-tab__list--on");
        $(`[data-tab-menu=${tribeStr}]`).addClass("pm-tab__list--on");
        this.$tribeWrap.removeClass("choose__tribe--on");
        $(`[data-tribe=${tribeStr}]`).addClass("choose__tribe--on");
        this.current.tribe = tribeStr;
        this.chosen.tribe = $(`[data-tab-menu=${tribeStr}]`).data("tab-num");
    }

    changeJob(jobStr){
        this.$jobMenu.removeClass("job-menu__list--on");
        $.each(this.$jobMenu, (idx, item)=>{
            let itemStr = $(item).attr("data-job-menu");
            $(item).data("job-menu", `${itemStr}-${this.current.tribe}`);
            if($(item).data("job-menu") == jobStr){
                $(item).addClass("job-menu__list--on");
            }
        });
        this.$jobCon.removeClass("choose__job--on");
        $(`[data-job-con=${jobStr}]`).addClass("choose__job--on");
        this.current.job = jobStr;
        this.chosen.job = $(`[data-job-con=${jobStr}]`).data("job-num");
    }

    changeGender(genderStr){
        this.$genderMenu.removeClass("gender__list--on");
        $(`[data-gender=${genderStr}]`).addClass("gender__list--on");
        this.current.gender = genderStr;
        this.chosen.gender = $(`[data-gender=${genderStr}]`).data("gender-num");
    }

    checkDevice(id){
        if(this.isMobile===null){
            this.jobMovie(id);
        }else{
            this.jobImage(id);
        }
    }

    jobMovie(movieId){
        console.log(`movie__${movieId}`)
    }

    jobImage(imgId){
        console.log(`image__${imgId}`)
    }

    setComplete(tribe, job, gender, complete){
        let tribeData = $(`[data-tab-num=${tribe}]`).data("tab-menu");
        let jobData = $(`[data-tribe=${tribeData}]`).find(`[data-job-num=${job}]`).data("job-con");
        let genderData = $(`[data-gender-num=${gender}]`).data("gender");
        this.changeTribe(tribeData);
        this.checkDevice(jobData);
        this.changeJob(jobData);
        this.changeGender(genderData);
        this.opts.complete = complete;
    }
}

export default Choose;