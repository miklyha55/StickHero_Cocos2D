cc.Class({

    extends: cc.Component,

    properties: {

        cameraTween: 1,

        tubePrefab: {
            default: null,
            type: cc.Prefab
        },

        playerPrefab: {
            default: null,
            type: cc.Prefab
        },

        stickPrefab: {
            default: null,
            type: cc.Prefab
        },

        scoreDisplay: {
            default: null,
            type: cc.Label
        },

        camera: {
            default: null,
            type: cc.Node
        },

        bg: {
            default: null,
            type: cc.Node
        }

    },

    onLoad () {

        this.score = 0;
        this.trigger = 0;

        this.firstTube = cc.instantiate(this.tubePrefab);
        this.node.addChild(this.firstTube);
        this.firstTube.width = 300;
        this.firstTube.setPosition(-this.node.width/2, this.firstTube.getComponent('Tube').positionY - this.node.height/2);
        this.firstTube.getComponent('Tube').init(this);

        this.player = cc.instantiate(this.playerPrefab);
        this.node.addChild(this.player);
        this.player.setPosition(this.firstTube.x + this.firstTube.width - (this.player.width/2 + 10), this.firstTube.getComponent('Tube').positionY - this.node.height/2);
        this.player.getComponent('Player').init(this);

        this.camera.setPosition(this.player.x + this.node.width/2 - 100, this.camera.y);
        this.camera.getComponent('Camera').init(this);

        this.stick = cc.instantiate(this.stickPrefab);
        this.node.addChild(this.stick);
        this.stick.setPosition(this.firstTube.x + this.firstTube.width - (this.stick.width/2), this.firstTube.getComponent('Tube').positionY - this.node.height/2);
        this.stick.getComponent('Stick').init(this);

        this.nextTube = cc.instantiate(this.tubePrefab);
        this.node.addChild(this.nextTube);
        this.nextTube.setPosition(this.camera.x + this.camera.width, this.nextTube.getComponent('Tube').positionY - this.camera.height/2);
        this.nextTube.getComponent('Tube').init(this);
        this.nextTube.getComponent('Tube').slide();

    },

    gainScore: function () {

        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();

    },

    gainTrigger: function () {

        this.trigger += 1;
        if(this.trigger == 3) {
            this.score += 1;
            this.trigger = 0;
        }
    },

    resetGame: function() {

        this.score = 0;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        this.trigger = 0;

        this.firstTube.setPosition(-this.node.width/2, this.firstTube.getComponent('Tube').positionY - this.node.height/2);
        this.firstTube.width = 300;

        this.player.setPosition(this.firstTube.x + this.firstTube.width - (this.player.width/2 + 10), this.firstTube.getComponent('Tube').positionY - this.node.height/2);
        this.player.rotation = 0;
        this.camera.setPosition(this.player.x + this.node.width/2 - 100, this.camera.y);

        this.stick.setPosition(this.firstTube.x + this.firstTube.width - (this.stick.width/2), this.firstTube.getComponent('Tube').positionY - this.node.height/2);
        this.stick.height = 0;
        this.stick.setRotation(0);

        this.nextTube.setPosition(this.camera.x + this.camera.width, this.nextTube.getComponent('Tube').positionY - this.camera.height/2);
        this.nextTube.getComponent('Tube').slide();

    },

    nextState: function() {
        
        this.firstTube.destroy();
        this.firstTube = cc.instantiate(this.tubePrefab);
        this.node.addChild(this.firstTube);
        this.firstTube.width = this.nextTube.width;
        this.firstTube.setPosition((this.player.x + this.player.width/2 + 10) - this.nextTube.width, this.nextTube.y);
        let trigger = this.firstTube.getChildren('trigger')[0];
        trigger.setPosition(this.firstTube.width/2, trigger.y);
        this.nextTube.destroy();

        this.stick.setPosition(this.firstTube.x + this.firstTube.width - (this.stick.width/2), this.firstTube.getComponent('Tube').positionY - this.node.height/2);
        this.stick.height = 0;
        this.stick.setRotation(0);

        this.nextTube = cc.instantiate(this.tubePrefab);
        this.node.addChild(this.nextTube);
        this.nextTube.setPosition(this.camera.x + this.camera.width, this.nextTube.getComponent('Tube').positionY - this.camera.height/2);
        this.nextTube.getComponent('Tube').init(this);
        this.nextTube.getComponent('Tube').slide();
    },

    gameOver: function() {

        cc.tween(this.player).to(0.3, { position: cc.v2(this.player.x, this.player.y - 2000), rotation: 90 })
        .call(this.resetGame.bind(this))
        .start();

    }

});
