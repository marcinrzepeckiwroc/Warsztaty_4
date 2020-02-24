$(function () {

    // var currentDateContainer = $(".current-date");
    // var DATE_API = "http://date.jsontest.com/";
    //
    // function fetchDate(){
    //     $.ajax({
    //         url: DATE_API,
    //         type: "GET"
    //     }).done(function (result) {
    //         currentDateContainer.text(result.time +", "+ result.date)
    //     })
    // }
    // fetchDate();
    //
    // var sratWarsContainer = $(".star-wars")
    // var STAR_API = "https://swapi.co/api"
    //
    // function fetchStarWars(){
    //     $.ajax({
    //         url: STAR_API + "/people/4",
    //         type: "GET"
    //     }).done(function (result) {
    //         renderPerson(result)
    //     })
    // }
    // fetchStarWars();
    //
    // function renderPerson(person) {
    //     var name = $("<strong>").text(person.name)
    //     var height = $("<div>").text(person.height+ " cm")
    //     sratWarsContainer.append(name, height)
    // }


    // function addBook() {
    //
    //     $.ajax({
    //         url: 'http://localhost:8282/books/',
    //         data: '{"isbn":"11111","title":"Java"}',
    //         contentType: "application/json",
    //         method: "Post"
    //     }).done(function () {alert('PUT completed');
    //     });
    // }
    // //addBook();


    function getBooks() {
        $.ajax({
            url: 'http://localhost:8282/books/',
            contentType: "application/json",
            method: "Get"
        }).done(function (result) {
            var body = $("body");
            var div = $("<div>").attr("id","list");
            body.append(div);
            addBook(result);
            clickTitle();
            form();
        });
    }

    getBooks();


    function clickTitle() { //globalny event podpiety do rodzica
        var list = $("#list");
        list.on("click", 'h1', function () {
            var id = $(this).attr("index");
            var next = $(this).next();
            getBook(next, id);
        });
        list.on("click", 'a', function () {
            var id = $(this).parent().attr("index");
            console.log(id);
            deleteBook(id)
        })
    }

    function getBook(next, id) {
        $.ajax({
            url: 'http://localhost:8282/books/'+id,
            contentType: "application/json",
            method: "Get"
        }).done(function (result) {
            $(next).text("id: "+result.id
                +" isbn: "+result.isbn
                +" author: "+result.author
                +" publisher: "+result.publisher
                +" type: "+result.type)
        });
    }

    function form() {
        var btn = $("#submit");
        var title = $("#title");
        var isbn = $("#isbn");
        var author = $("#author");
        var publisher = $("#publisher");
        var type = $("#type");

        $(btn).on("click", function (e) {
            e.preventDefault();
            var data = '{"isbn":"'+isbn.val()
                +'","title":"'+title.val()
                +'","author":"'+author.val()
                +'","publisher":"'+publisher.val()
                +'","type":"'+type.val()+'"}';

            $.ajax({
                url: 'http://localhost:8282/books/',
                data: data,
                contentType: "application/json",
                method: "Post"
            }).done(function (result) {
                addBook(result)
            });
        });
    }

    function deleteBook(id) {
        $.ajax({
            url: 'http://localhost:8282/books/'+id,
            method: "Delete"
        }).done(function () {
            var h1 = $("#list").find("h1");
            $(h1).each(function (i, e) {
                if(($(this).attr("index"))===id){
                    this.remove();
                }
            })

        });
    }

    function addBook(result) {
        $(result).each(function (i, ele) {
            var list = $("#list").first();
            var del = $("<a>").attr("href","#").text("del");
            var elem1 = $("<h1>").attr("index", ele.id).text(ele.title);
            var elem2 = $("<div>");
            list.append(elem1.append(del));
            list.append(elem2);
        })
    }

})