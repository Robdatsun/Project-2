$(document).ready(function (){

    // event handler
    $(".addSymbolBtn").on("click", () => {
        // add symbol function
        // takes value from input
        
            console.log("hello")
            let symbol = $("#addSymbol").val().trim();
            console.log(symbol)
            $.ajax("/api/symbols", {
                method: "POST",
                data: {symbol: symbol}
            }).then(()=>{
                location.reload();
            })

        
    });
})