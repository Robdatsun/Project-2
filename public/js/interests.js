$(document).ready(function () {
    $(document).on("click", "button.addSymbolBtn", addSymbol); // add button handler
    $(document).on("click", "button.deleteSymbolBtn", deleteSymbol); // delete button handler

    // add handler
    function addSymbol(event) {
        event.preventDefault();
        // takes value from input
        let symbol = $("#addSymbol").val().trim();
        $.ajax("/api/symbols", {
            method: "POST",
            data: { symbol: symbol }
        }).then(() => {
            location.reload();
        })
    }
    // delete handler
    function deleteSymbol(event){
        event.preventDefault();
        console.log("hello");
        let symbol = $(this).data("id");
        console.log(symbol)
        $.ajax("/api/symbols/" + symbol, {
            method: "DELETE"
        }).then(() => {
            location.reload();
        })
    }
    
    // $(".addSymbolBtn").on("click", (event) => {
    //     event.preventDefault();
    //     // add symbol function
    //     // takes value from input
    //     let symbol = $("#addSymbol").val().trim();
    //     $.ajax("/api/symbols", {
    //         method: "POST",
    //         data: { symbol: symbol }
    //     }).then(() => {
    //         location.reload();
    //     })
    // });
    // $(".deleteSymbolBtn").on("click", (event) => {
    //     event.preventDefault();
    //     // delete symbol function
    //     console.log("hello");
    //     let symbol = $(this).data("id");
    //     console.log(symbol)
    //     $.ajax("/api/symbols/" + symbol, {
    //         method: "DELETE"
    //     }).then(() => {
    //         location.reload();
    //     })
    // })
})