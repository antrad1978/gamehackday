ig.module(
    'game.entities.hero'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityHero = ig.Entity.extend({
    size: {x:66, y:60},
    checkAgainst: ig.Entity.TYPE.B,

    animSheet: new ig.AnimationSheet('media/herb_body_1.png', 66, 60),
    maxVel: {x: 100, y: 100},
    speed: 100,
    friction: {x: 50, y: 50},
    collides: ig.Entity.COLLIDES.PASSIVE,
    sound: new ig.Sound('media/herbert_bzzt2.caf.ogg'),

    init: function( x, y, settings ) {
        this.addAnim( 'idle', 0.1, [0] );
        this.parent( x, y, settings );
    },

    update: function() {
        // User Input

        if( ig.input.state('left') ) {
            this.accel.x = -this.speed;
        }
        else if( ig.input.state('right') ) {
            this.accel.x = this.speed;
        }
        else if( ig.input.state('up') ) {
            this.accel.y = -this.speed;
        }
        else if( ig.input.state('down') ) {
            this.accel.y = this.speed;
        }
        else {
            this.accel.x = 0;
            this.accel.y = 0;
        }

        this.parent();
    },

    handleMovementTrace: function( res ) {
        if( res.collision.y || res.collision.x ) {
            this.sound.play();
        }

        // Continue resolving the collision as normal
        this.parent(res);
    },

    check: function( other ) {
        other.pickup();
    }
});

});