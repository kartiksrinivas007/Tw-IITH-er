//this file contains behaviours that are for all the pages
// $(document).ready(()=> {
//     alert("This file is Linked Properly")
// })
//small a  for area !!!!
$("#postTextarea").keyup((event) => {

    var textbox = $(event.target);
    // console.log(textbox);
    var value = textbox.val().trim();
    // console.log(value);

    var submitButton = $("#submitPostButton");

    if(submitButton.length == 0) return alert("No submit button found!");

    if(value == ""){
        submitButton.prop("disabled", true);
        return;
    }

    submitButton.prop("disabled", false);
})