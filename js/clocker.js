function Clocker(obj) {
    this.init(obj);
};
Clocker.prototype = {
    init: function(obj) {
        this.$settings = obj;
        this.$timer = null;
        this.$reduce = null

        this.$remain = 0;
    },
    start: function() {
        this.stop();

        this.$remain = (this.$settings.time / 1000 - 1);
        this.$timer = setTimeout(function() {
            this.stop();
            this.$settings.handler();
        }.bind(this), this.$settings.time);

        this.$settings.second(this.$remain);
        this.$reduce = setInterval(function() {
            this.$remain --;
            this.$settings.second(this.$remain);
        }.bind(this), 1000);
    },
    stop: function() {
        try{
            clearTimeout(this.$timer);
            clearTimeout(this.$reduce);
        } catch(e) {}
    }
}
