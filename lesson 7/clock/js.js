    let n = document.querySelector('#clock');

    function ii(d) {
        if (d < 10) {
            return ('0' + d);
        } else {
            return d;
        }

    }
    console.log(ii(9));
    function time() {
        let t = new Date;
        n.textContent = ii(t.getHours()) + ':' + ii(t.getMinutes()) + ':' + ii(t.getSeconds());
        setTimeout(time , 1000);
    }
    time();