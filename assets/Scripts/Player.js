cc.Class({

    extends: cc.Component,

    properties: {
    	tween: 1,
        game: {
            default: null,
            serializable: false
        }
        
    },

    init: function (game) {

        this.game = game;
        this.node.zIndex = 2;

    },

    run: function(height) {

    	let path = this.node.x + height;

    	if(path + this.node.width/2 >= (this.game.nextTube.x - 5) && path + this.node.width/2 <= this.game.nextTube.x + this.game.nextTube.width/2) {
    		this.game.gainTrigger();
    	}

    	if(path + this.node.width/2 >= (this.game.nextTube.x - 5) && path + this.node.width/2 <= (this.game.nextTube.x + this.game.nextTube.width - 5)) {

    		this.game.bg.width = this.game.node.width + this.game.bg.width + path;

    		path = this.game.nextTube.x + this.game.nextTube.width - (this.node.width/2 + 10);
		 	cc.tween(this.node).to(this.getComponent('Player').tween, { position: cc.v2(path, this.node.y) })
		 	.call(()=>this.game.camera.getComponent('Camera').go())
	        .start();

    	} else {

    		path = this.node.x + height + this.node.width;
    		cc.tween(this.node).to(this.getComponent('Player').tween, { position: cc.v2(path, this.node.y) })
    		.call(()=>this.game.gameOver())
	        .start();

    	}


    }

});
