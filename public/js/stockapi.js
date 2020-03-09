// will not be used unless adding a delete route
$("#btn").on("click", function() {
    console.log("was clicked");
    let userInput = $("#stockSearch").val();
    console.log(userInput);
    let queryURL = ("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + userInput + "&apikey=R9HOCWQQPKTP0NXC")
    console.log(queryURL);
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    console.log(response)
    })
})
