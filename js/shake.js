

function ShakeListener(obj) {
    this.onShake = null;
    this.init(obj);
};
ShakeListener.prototype = {
    init: function(obj) {
        window.addEventListener('devicemotion', this.deviceMotionHandler.bind(this), false);

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

            this.$x = acceleration.x;
            this.$y = acceleration.y;
            this.$z = acceleration.z;

            var speed = Math.abs((this.$x + this.$y + this.$z) - (this.$last_x + this.$last_y + this.$last_z)) / diffTime * 10000;

            if (speed > this.$_SHAKE_THRESHOLD) {
                this.onShake && this.onShake();
            };
            this.$last_x = this.$x;
            this.$last_y = this.$y;
            this.$last_z = this.$z;
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
