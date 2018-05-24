
function enviar(){
    var data = JSON.stringify({
        "buscar": localStorage.getItem("buscar"),
        "exclude": localStorage.getItem("exclude")
    })
    $.ajax({
        method: 'post',
        contentType: 'application/json',
        data: data
    });
}

enviar()
