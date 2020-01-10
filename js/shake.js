function ShakeListener(obj) {
    this.onShake = null;
    this.init(obj);
};
ShakeListener.prototype = {
    init: function(obj) {
        document.addEventListener('click', this.deviceMotionHandler.bind(this), false);

        this.$settings = obj;
        this.$state = false;

        //获取加速度信息
        //获取加速度信息//通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
        //获取加速度信息//通过监听上一步获取到的//而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
        this.$_SHAKE_THRESHOLD = 30000;
        this.$last_update = 0;
        this.$x = 0;
        this.$y = 0;
        this.$z = 0;
        this.$last_x = 0;
        this.$last_y = 0;
        this.$last_z = 0;
    },
    deviceMotionHandler: function(event) {
        if(!this.$state) return;

        var acceleration = event.accelerationIncludingGravity,
            curTime = new Date().getTime();

        if ((curTime - this.$last_update) > 10) {

            var diffTime = curTime - this.$last_update;

            this.$last_update = curTime;

            this.onShake && this.onShake(event);
        }
    },
    begin: function() {
        this.$state = true;
    },
    destroy: function() {
        // window.removeEventListener('devicemotion', this.deviceMotionHandler);
        this.$state = false;
    }
}
