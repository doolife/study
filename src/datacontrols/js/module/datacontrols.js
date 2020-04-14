class Datacontrols {
    constructor(opts){
        let basicOpts = {
            el:"#element",
            url:"https://www.kobis.or.kr"
        }

        this.opts = Object.assign(opts, basicOpts);

        this.$elTit = $("[data-board-tit]");
        this.$elWrap = $("[data-board-wrap]");

        this.setStr = false;
        this.curPage = 1;
        this.lastPage = 10;
        this.itemPerPage = 10;

        this.init();
    };

    init(){
        this.controls();
        this.resultData();
    };

    controls(){
        $("[data-btn='prev']").on("click", (evt)=>{
            this.display(evt);
        });
        $("[data-btn='next']").on("click", (evt)=>{
            this.display(evt);
        });
    };

    display(evt){
        if(evt.currentTarget.getAttribute("data-btn")==="prev") this.curPage = this.curPage-1;
        if(evt.currentTarget.getAttribute("data-btn")==="next") this.curPage = this.curPage+1;

        if(this.curPage<1) {this.curPage = 1; return;}
        if(this.lastPage<this.curPage) {this.curPage = this.lastPage; return;}

        this.resultData();
    }

    resultData(){
        this.getData().then((data)=>{
            if(!this.setStr){
                this.insertGetData(data.movieListResult);
                this.setStr = true;
            }else{
                this.insertGetDataTxt(data.movieListResult);
            }

        }).catch((error)=>{
            console.log(error, "실패라구욧!")
        });
    };

    getData(){
        return new Promise( (resolve, reject)=> {
            $.get(`${this.opts.url}/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${this.opts.key}&curPage=${this.curPage}&itemPerPage=${this.itemPerPage}`, (response)=> {
                if(response) resolve(response); return false;
            });
        });
    };

    insertGetData(data){
        this.$elTit.append(`${data.source}`);
        data.movieList.forEach((key, index)=>{
            this.$elWrap.append(
                `<li class="board__list" data-list="${key.movieCd}">`+
                    `국가 : ${key.repNationNm},<br/> 장르 : ${key.genreAlt},<br/> 제목 : ${key.movieNm}`+
                `</li>`
            );
        });
    }

    insertGetDataTxt(data){
        data.movieList.forEach((key, index)=>{
            this.$elWrap.find(`[data-list]`).eq(index).html(`국가 : ${key.repNationNm},<br/> 장르 : ${key.genreAlt},<br/> 제목 : ${key.movieNm}`);
            this.$elWrap.find(`[data-list]`).eq(index).attr("data-list", `${key.movieCd}`);
        });
    }
};

export default Datacontrols;