cc.Class({

    extends: cc.Component,

    properties: {

        min_width: 100,
        max_width: 300,
        positionY: 200,
        tween: 1,
        min_space_between: 50,

        game: {
            default: null,
            serializable: false
        }

    },

    init: function (game) {

        this.game = game;
        this.node.zIndex = 1;
        
    },

    slide: function () {

        const randomWidth = this.getRandom(this.min_width, this.max_width);
        this.node.width = randomWidth;
        
        let trigger = this.node.getChildren('trigger')[0];
        trigger.setPosition(randomWidth/2, trigger.y);

        const min = (this.game.player.x + this.game.player.width/2 + 10) + this.getComponent('Tube').min_space_between;
        const max = (this.game.camera.x + this.game.camera.width/2) - randomWidth - this.getComponent('Tube').min_space_between;
        const randomX = this.getRandom(min, max);

        cc.tween(this.node).to(this.getComponent('Tube').tween, { position: cc.v2(randomX, this.node.y) })
        .call(this.up.bind(this))
        .start();

    },

    up: function() {

        this.game.stick.getComponent('Stick').up = true;

    },

    getRandom: function(min, max) {

        return Math.floor(Math.random() * (max - min)) + min;

    },
    
});
