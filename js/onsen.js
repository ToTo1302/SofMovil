var nuevoBtn = $('#botonLogin');


nuevoBtn.on('click', function () {

    //showModal();
    //toggleToast();
    var usu = document.querySelector('#username');
    var pasw = document.querySelector('#password');
    var cod = document.querySelector('#codigo');

    /*console.log(usu.value);
    console.log(pasw.value);
    console.log(cod.value);*/

    if (usu.value == "tec" && pasw.value == "123" && cod.value == "123") {
        showModal();
    } else {
        console.log("No entró");
        $(document).ready(function () {
            $(".toast").toast('show');
        });
    }

});

function showModal() {
    var modal = document.querySelector('ons-modal');
    modal.show();
    setTimeout(function () {
        modal.hide();
        log();
    }, 2000);
}

function toggleToast() {
    var modal = document.querySelector('ons-toast');
    modal.toggle();
}

function log() {
    window.location.href = "SofMovil/pages/log.html";
}


/// log
window.fn = {};

window.fn.open = function () {
    var menu = document.getElementById('menu');
    menu.open();
};

window.fn.load = function (page) {
    var content = document.getElementById('content');
    var menu = document.getElementById('menu');
    content.load(page)
        .then(menu.close.bind(menu));
};
