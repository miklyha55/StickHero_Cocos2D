cc.Class({

    extends: cc.Component,

    properties: {

        height: 0,
        delta: 10,
        tween: 1,

        game: {
            default: null,
            serializable: false
        }

    },

    init: function (game) {

        this.mousedown = false;
        this.up = false;
        this.game = game;
        this.delta = this.getComponent('Stick').delta;
        this.node.height = this.getComponent('Stick').height;

        this.game.camera.on('mousedown', this.mouseDown.bind(this));
        this.game.camera.on('mouseup', this.mouseUp.bind(this));

        this.node.zIndex = 3;
    },

    mouseDown: function () {

        this.mousedown = true;

    },

    mouseUp: function () {
        
        if(this.mousedown && this.up) {
            cc.tween(this.node).to(this.getComponent('Stick').tween, { rotation: 90 })
            .call(this.stop.bind(this))
            .start();
        }

        this.up = false;
        this.mousedown = false;
    },

    stop: function () {

        const height = this.node.height;
        this.game.player.getComponent('Player').run(height);

    },

    update (dt) {

        if(this.mousedown && this.up) {
            this.node.height += this.delta;
        }
    }

});
