(function() {
    var btn_pre = document.getElementsByClassName("city_pic-pre")[0];
    var btn_next = document.getElementsByClassName("city_pic-next")[0];
    var pic_detatils = document.getElementsByClassName("city_pic-detaile");
    var pic_contents = document.getElementsByClassName("city-content");
    var pic_detatils_legth = pic_detatils.length;
    btn_pre.onclick = function() {
        show(-1);
    }
    btn_next.onclick = function() {
        show(1);
    }

    function show(changNum) {
        var index = 0,
            nextIndex = 0,
            height;
        for (var i = 0; i < pic_detatils_legth; i++) {
            index = pic_detatils[i].getAttribute("data-index") * 1;
            nextIndex = (index + changNum) > 0 ? (index + changNum) : (index + pic_detatils_legth + changNum);
            nextIndex = nextIndex % pic_detatils_legth;
            pic_detatils[i].setAttribute("data-index", nextIndex);
            if (pic_contents.length > 0) {
                pic_contents[i].setAttribute("data-index", nextIndex);
                // if (nextIndex == 1) {
                //     height = pic_detatils[i].style.height || pic_detatils[i].offsetHeight;
                //     pic_detatils[i].parentNode.style.height = height + 'px';
                // }
            }
        }
    }
    show(1);
})()
