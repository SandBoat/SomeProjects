(function() {
    var btn_pre = document.getElementsByClassName("city_pic-pre")[0];
    var btn_next = document.getElementsByClassName("city_pic-next")[0];
    var pic_detatils = document.getElementsByClassName("city_pic-detaile");
    var pic_contents = document.getElementsByClassName("city-content");
    var pic_detatils_legth = pic_detatils.length;
    btn_pre.onclick = function() {
        var index = 0;
        for (var i = 0; i < pic_detatils_legth; i++) {
            index = pic_detatils[i].getAttribute("data-index");
            index = (index + 2) % 3;
            pic_detatils[i].setAttribute("data-index", index);
            if (index == 1) {
                pic_contents[(i + 2) % 3].style.display = "none";
                pic_contents[i].style.display = "block";
            }
        }
    }
    btn_next.onclick = function() {
        var index = 0;
        for (var i = 0; i < pic_detatils_legth; i++) {
            index = pic_detatils[i].getAttribute("data-index");
            index = (index + 1) % 3;
            pic_detatils[i].setAttribute("data-index", index);
            if (index == 1) {
                pic_contents[(i + 1) % 3].style.display = "none";
                pic_contents[i].style.display = "block";
            }
        }
    }
})()
