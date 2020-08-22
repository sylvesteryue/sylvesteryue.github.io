var TextRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.index = 0;
    this.period = parseInt(period, 10) || 2000;

    this.text =  '';
    this.tick();
    this.isDeleting = false;
};

TextRotate.prototype.tick = function () {
    var i = this.index % this.toRotate.length;
    var fullText  = this.toRotate[i];

    console.log(fullText)

    if(this.isDeleting) {
        this.text = fullText.substring(0, this.text.length - 1);
    } else {
        this.text = fullText.substring(0, this.text.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.text+'</span>';
    //this.el.innerHTML = this.text;

    var that = this;
    var delta = 300 - Math.random() * 100;

    if(this.isDeleting) { delta /= 2;}

    if(!this.isDeleting && this.text === fullText) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.text === '') {
        this.isDeleting = false;
        this.index ++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for(var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');

        if(toRotate) {
            new TextRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
}