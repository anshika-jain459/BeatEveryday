chrome.storage.sync.get(["allTask"], function(task){
    $("#addTask").append(task.allTask);

    // Removing the element
    $(".delete").click(function(){
        let index = $(".delete").index(this);
        // alert( "Index: " + index );

        task.allTask.splice(index, 1);

        chrome.storage.sync.set({"allTask": task.allTask}, function () {});
        window.location.reload(); 
    });

    $('.form-check-input').change(function(e){
        if ($('.form-check-input').is(":checked"))
        {
            let index = $(".form-check-input").index(this);
            // removing the element on ticking the clickbox

            $("li").eq(index).css('textDecoration','line-through');
            $("input[type=checkbox]").eq(index).attr("disabled", true);
            task.allTask[index] = '<li class="list-group-item"> <span style="text-decoration:line-through;">' + $("li").eq(index).html() + '</span> </li>';

            chrome.storage.sync.set({"allTask": task.allTask}, function () {
                // window.location.reload(); 
            });
            window.location.reload();
        }
    });

    $(".undo").click(function () {  
        // alert($(this).text());
        let index = $(".undo").index(this);
        $("input[type=checkbox]").eq(index).attr("disabled", false);
        // $('li').eq(index).css("text-decoration", "none"); 

            let btnRemove = '<input class="btn btn-dark edit btn-sm" type="button" value="Edit">';
            let btnEdit = '<input class="btn btn-dark delete btn-sm" type="button" value="Delete">';
            let btnUndo = '<input class="btn btn-dark undo btn-sm" type="button" value="Undo">';
            let enteredTask = '<li class="list-group-item"><input class="form-check-input me-1" type="checkbox">'+$("li").eq(index).text() + '<div class="button">' + btnRemove + btnEdit + btnUndo + '</div></label></li>';
            task.allTask[index] = enteredTask;

        chrome.storage.sync.set({"allTask": task.allTask}, function () {
            // window.location.reload(); 
        });
        window.location.reload(); 
    }); 

    $(".edit").click(function () {  
        let index = $(".edit").index(this);
        $("#task").val($("li").eq(index).text());
        $("#task").eq(index).focus();

        task.allTask.splice(index, 1);

        chrome.storage.sync.set({"allTask":task.allTask}, function () {});
        // window.location.reload(); 
    });    
});

$("#button-addon2").on("click", function(){

    chrome.storage.sync.get({allTask: []},function(data){
        let allTask = data.allTask;

        if ($("#task").val()){

            let btnRemove = '<input class="btn btn-dark edit btn-sm" type="button" value="Edit">';
            let btnEdit = '<input class="btn btn-dark delete btn-sm" type="button" value="Delete">';
            let btnUndo = '<input class="btn btn-dark undo btn-sm" type="button" value="Undo">';
            let enteredTask = '<li class="list-group-item"> <input class="form-check-input me-1" type="checkbox">'+ $("#task").val() + '<div class="button">' + btnRemove + btnEdit + btnUndo + '</div></label></li>';

            allTask.push(enteredTask);
            chrome.storage.sync.set({"allTask": allTask}, function () {
                $("#addTask").append(enteredTask);
            });
            $("#task").val("");
            window.location.reload(); 
        }

    });
});

$('.form-control').on('keypress', function(e) {

    chrome.storage.sync.get({allTask: []},function(data){
        let allTask = data.allTask;
        var code = e.keyCode || e.which;

        if (code==13 && $("#task").val()){

            let btnRemove = '<input class="btn btn-dark edit btn-sm" type="button" value="Edit">';
            let btnEdit = '<input class="btn btn-dark delete btn-sm" type="button" value="Delete">';
            let btnUndo = '<input class="btn btn-dark undo btn-sm" type="button" value="Undo">';
            let enteredTask = '<li class="list-group-item"> <input class="form-check-input me-1" type="checkbox">'+ $("#task").val() + '<div class="button">' + btnRemove + btnEdit + btnUndo + '</div>' + '</label></li>';

            // let d = new Date();
            // let strDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
            // alert(strDate);
            

            allTask.push(enteredTask);
            chrome.storage.sync.set({"allTask": allTask}, function () {
                $("#addTask").append(enteredTask);
            });
            $("#task").val("");
            window.location.reload(); 
        }

    });
});