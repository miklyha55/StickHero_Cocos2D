cc.Class({

    extends: cc.Component,

    properties: {
        tween: 0.2
    },

    init: function (game) {

        this.game = game;

    },

    go: function() {

        this.game.gainScore();
        cc.tween(this.node).to(this.getComponent('Camera').tween, { position: cc.v2(this.game.player.x + this.game.node.width/2 - 100, this.node.y) })
        .call(this.game.nextState.bind(this.game))
        .start();

    },

});
