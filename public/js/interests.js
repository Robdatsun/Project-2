$(document).ready(function (){
    // $(document).on("click","button.interestSearch",addInterest);
    $(document).on("click","button.addNews",addNews);
    $(document).on("click","button.addSymbol",addSymbol);

    // function addInterest (event) {
    //     let symbol = [];
    //     let news = [];
    //     let symbol1 = $("#interestSymbol1");
    //     let symbol2 = $("#interestSymbol2");
    //     let symbol3 = $("#interestSymbol3");
    //     let news1 = $("#interestNews1");
    //     let news2 = $("#interestNews2");
    //     let news3 = $("#interestNews3");

    //     $.ajax("/api/interests/news", {
    //         method: "POST",
    //         data: 
    //     }).then(()=>{
    //         // location.reload();
    //     });

    //     $.ajax("/api/interests/symbols", {
    //         method: "POST",
    //         data:
    //     }).then(()=>{
    //         // location.reload();
    //     })
    // }

    function addNews (event) {
        let news = $(".addNews");
        $.ajax("/api/interests/news", {
            method: "POST",
            data: {topic: news.val().trim()}
        }).then(()=>{
            location.reload();
        })
    }

    function addSymbol (event) {
        let symbol = $(".addSymbol");
        $.ajax("/api/intersts/symbols", {
            method: "POST",
            data: {symbol: symbol.val().trim()}
        }).then(()=>{
            location.reload();
        })
    }
})