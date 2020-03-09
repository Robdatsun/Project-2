$(document).ready(function (){
    // event handler
    $(document).on("click",".addSymbol",addSymbol);
    // add symbol function
    // takes value from input
    function addSymbol (event) {
        console.log("hello")
        let symbol = $("#addSymbol");
        $.ajax("/api/symbols", {
            method: "POST",
            data: {symbol: symbol.val().trim()}
        }).then(()=>{
            location.reload();
        })
    }
})