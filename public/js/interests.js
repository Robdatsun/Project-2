$(document).ready(function (){
    // $(document).on("click","button.addNews",addNews);
    $(document).on("click",".addSymbol",addSymbol);

    // function addNews (event) {
    //     let news = $(".addNews");
    //     $.ajax("/api/interests/news", {
    //         method: "POST",
    //         data: {topic: news.val().trim()}
    //     }).then(()=>{
    //         location.reload();
    //     })
    // }

    // add symbol function
    // takes value from input
    function addSymbol (event) {
        let symbol = $("#addSymbol");
        $.ajax("/api/intersts/symbols", {
            method: "POST",
            data: {symbol: symbol.val().trim()}
        }).then(()=>{
            location.reload();
        })
    }
})