namespace SpriteKind {
    export const Tree = SpriteKind.create()
}
/**
 * JUMP_VELOCITY = Math.sqrt(2 * GRAVITY * JUMP_HEIGHT)
 */
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (Gidget.vy > 0 && otherSprite.top - Gidget.bottom < 2) {
        Gidget.vy = 0 - jumpVelocity
    }
})
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    info.changeScoreBy(1)
})
let projectile: Sprite = null
let treeIndex = 0
let treeSection: Sprite = null
let Gidget: Sprite = null
let jumpVelocity = 0
scene.setBackgroundColor(9)
let jumpHeight = 32
let gravity = 500
jumpVelocity = Math.sqrt(2 * (gravity * jumpHeight))
Gidget = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . b . . . b . . . . . 
    . . . . . b 3 b . b 3 b . . . . 
    . . . . . b b b b b b b . . . . 
    . . . . . b b b b b b b . . . . 
    . . . . . b b 1 b b b 1 . . . . 
    . b . . . b b b b b b b . . . . 
    b b b b . b b b b b b b . . . . 
    b b b b . . . b b b . . . . . . 
    b b b b . . b b b b b . . . . . 
    b b b b b . b b b b b . . . . . 
    . b b b b . b b b b b . . . . . 
    . b b b b b b b b b b . . . . . 
    . . b b b b b b b b b . . . . . 
    . . . . . . . b . . b . . . . . 
    . . . . . . . b . . b . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(Gidget, 100, 0)
Gidget.ay = gravity
let startingPlatform = sprites.createProjectileFromSprite(img`
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    `, Gidget, 0, 50)
let treeSections = [img`
    ...eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee..
    ...eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee...
    ...eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee...
    ...eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeccccccccccccccceeeeeeeeeeeeeeeeeeeeccccccccccccceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeecccceeeeeeeee...
    ...eeeeeeeeeeeccccccceeeeeeeeeeeecccccccccccccccccceeeeeeeeeeeeeeecccccccccccccccccceeeeeeeeeeeeeeeeecccccccccceeeeeeeeeeeeeccccceeeeeeee...
    ...eeeeeeeeeecccccccccceeeeeeeeccccccccccccccccccccceeeeeeeeeeeecccccccccccccccccccccceeeeeeeeeeeeecccccccccccccceeccccccccccccccceeeeeee...
    ...eeeeeeeeecccccccccccccceeeeecccccceeeeeeeeeccccccceeeeeeeeeccccccccceeeeeeeeeccccccceeeeeeeeeeeccccccccccccccccccccccccccccccccceeeeee...
    ...eeeeeeeeeccccceecccccccceeeccccceeeeeeeeeeeeeeccccceeeeeeeecccccceeeeeeeeeeeeeeccccceeeeeeeeeccccccceeeeeeccccccccccccccccccccccceeeee...
    ....eeeeeeeeccceeeeeeccccccccccccceeeeeeeeeeeeeeeecccceccccccccccceeeeeeeeeeeeeeeecccccccceeeeeeccccceeeeeeeeeecccccceeeeeeeeeecccccceeee...
    ....eeeeeeecccceeeeeeeeeccccccccceeeeeeeeeeeeeeeeeecccccccccccccccceeeeeeeeeeeeeeecccccccccccceccccceeeeeeeeeeeecccceeeeeeeeeeeeeccccceee...
    ....eeeeeeecccceeeeeeeeeeccccccceeeeecccccccceeeeeeccccccccccccccccceeeeeeeeeeeeeeccccccccccccccccceeeeeeeeeeeeeccceeeeeeeeeeeeeeecccceee...
    ....eeeeeecccceeeeeeeeeeeeecccceeeeeccccccccccceeeeeccccceeeeecccccccceeeeeeeeeeeeeeecccccccccccccceeeeeeeeeeeeeccceeeeecccceeeeeeeccccee...
    ...eeeeeeecccceeecccccceeeecccceeeeecccccccccccceeeeccceeeeeeeeeeccccceeeeeeeeeeeeeecccceeeecccccceeeeeeeeeeeeeeccceeeeecccceeeeeeeccccee...
    ...eeeeeeeccceeeecccccceeeeccceeeeecccccccccccccceeeccceeeeeeeeeeeccccceeeeeeeeeeeeecccceeeeeeccccceeeeeeeeeeeecccceeeeccccccccceeeeccce....
    ...eeeeeeeccceeeecccccceeeeccceeeeecccccccccccccceeecccceeeeeeeeeeeccccceeeeeeeeeeeeccceeeeeeeccccceeeeeeeeeeeecccceeeccccccccccceeeccce....
    ...eeeeeeecccceeecccccceeeeccceeeeeccccccccccccccceecccceeeeccceeeeeccccceeeeeeeeeecccceeeeeeeeecccceeeeeeeeeeeccceeeeccccccccccceeeccce....
    ..eeeeeeeecccceeeccccceeeeecccceeeeccccccccccccccceecccceeeccccceeeeeccccceeeeeeeeecccceeeeeeeeecccceeeeeeeeeecccceeeeccccccccccceeeccce....
    ..eeeeeeeeecccceeeccceeeeeecccceeeeccccccccccccccceeeccceeccccccceeeeecccceeeeeeeecccceeeeeeeeeecccceeeeeeeeeecccceeeecccccccccceeeeccce....
    ..eeeeeeeeeccccceeeeeeeeeeeeccceeeeccccccccccccccceeeccceeccccccceeeeecccceeeeeeeecccceeeeeeeeeeeccceeeeeeeeeeccceeeeecccccccccceeeecccee...
    ..eeeeeeeeeeccccceeeeeeeeeeeccceeeeccccccccccccccceecccceecccccccceeeeeccceeeeeeccccceeeeeeeeeeeeccceeeeeeeeeeccceeeeeeecccccccceeeecccee...
    ...eeeeeeeeeeccccceeeeeeeccccccceeecccccccccccccceeecccceecccccccceeeeeccceeeeecccccceeeeeeeeeeeeccceeeeeeeeeeccceeeeeeeeeeeeeeeeeeccccee...
    ...eeeeeeeeeeeccccceeeeecccccccceeecccccccccccccceeeccceeeeccccccceeeeeccccccccccccceeeeeeeeeeeeeccceeeeeeeeeeccceeeeeeeeeeeeeeeeeecccce....
    .....eeeeeeeeeecccccccccccccccccceeccccccccccccceeeeccceeeeecccccceeeeecccccccccccceeeeeeeeeeeeeeccceeeeeeeeeecccceeeeeeeeeeeeeeeeecccee....
    .....eeeeeeeeeeeccccccccccccecccceeecccccccccceeeeecccceeeeeeeeeeeeeeeecccccccccceeeeeeeeeeeeeeeeccceeeeeeeeeccccceeeeeeeeeeeeeeeeccccee....
    .....eeeeeeeeeeecccccccccceeeecccceeeeeeeeeeeeeeeeecccceeeeeeeeeeeeeeecccceeeecccceeeeeeeeeeeeeecccceeeeeeeecccccceeeeeeeeeeeeeeecccccee....
    .....eeeeeeeeeeeccccccceeeeeeecccceeeeeeeeeeeeeeeccccceeeeeeeeeeeeeeeccccceeeeccccceeeeeeeeeeeeeccccccccccccccccccceeeeeeeeeeeecccccceeee...
    .....eeeeeeeeeeeccccceeeeeeeeecccccccccccccceeeccccccccccceeeeeeeeeeccccceeeeeeccccceeeeeeeeeeecccccccccccccccccccceeeeeeeeeeecccccceeeee...
    .....eeeeeeeeeeeeeeeeeeeeeeeeeeccccccccccccccccccccccccccccccceeeeccccccceeeeeeeccccceeeeeeeeeecccccccccccccccceccccceeeeeeeecccccceeeeee...
    .....eeeeeeeeeeeeeeeeeeeeeeeeeeecccccccccccccccccccceccccccccccccccccccceeeeeeeeeccccceeeeeeeecccceeeeeeeeeeeeeecccccceeeeccccccceeeeeeee...
    ....eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeccccccccceeeeeecccccccccccccceeeeeeeeeeeeccccccceeccccccceeeeeeeeeeeeeeeccccccccccccccceeeeeeeee...
    ...eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeecccccccceeeeeeeeeeeeeeecccccccccccccceeeeeeeeeeeeeeeeeccccccccccccceeeeeeeeee...
    ...eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeecccccccccccceeeeeeeeeeeeeeeeeeeeccccccccceeeeeeeeeeee...
    `, img`
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee....
    ..eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeecccccccceeeeeeecccccccceeeeeeeeeeeeeeeeeeeeeeee....
    ..eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeecccccccccccceeeeccccccccccceeeeeeeeeeeeeeeeeeeeee....
    ..eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeccccccccccccccccccccccccceccccccccccccceeeeeeeeeeeeeeeeeeee....
    ..eeeeeeeeeeeeeeeeeccccceeeeeeeeeeeeeeeecccccccccccccceeeeeeeeeeeeeeeeeeeecccccccccccccccccceeeccccccccccceeecccccccceeeeeeeeeeeeeeeeeee....
    ....eeeeeeeeeeeeeecccccccceeeeeeeeecccccccccccccccccccceeeeeeeeeeeeeeeeecccccccccccccccccccccceeecccccccceeeeeeeccccceeeeeeeeeeeeeeeeee.....
    ....eecccccccccceecccccccccceeeeeeccccccccccccccccccccccceecccccccccccccccccccceeeeccccccccccceeeeeecccccceeeeeeeecccceeeeeeeeeeeeeeeee.....
    ....cccccccccccccccccccccccccceeeccccccccceeeeeeeeeccccccceccccccccccccccccceeeeeeccccceeecccceeeeeeeecccceeeeccccccccccccceeeeeeeeeeee.....
    ....ccccccccccccccccceeecccccccccccccceeeeeeeeeeeeeeecccccccccccccccccccccccceeeeccccceeeeeeeeeeeeeeeeeccccceccccccccccccccceeeeeeeeeee.....
    ...ecccceeeeeeccccccceeeeecccccccccceeeeeeeeeeeeeeeeeecccccccccccccccccccccccceeecccceeeeeeeeeeeeeeeeeecccccccccccccccccccccccceeeeeeee.....
    ..ecccceeeeeeeeecccceeeeeeecccccccceeeeeeeeeeeeeeeeeeecccccccceeeeeccccccccccccecccceeeeeeeeeeeeeeeeeeeecccccccceeeeccceeccccccceeeeeee.....
    ..ecccceeeeeeeeecccceeeeeeeeccccceeeeeeeeeeeecccceeeeecccccccceeeeeeeecccccccccccccceeeeeeeeeeeeeeeeeeeeecccccceeeeeeeeeeecccccccceeeeee....
    ..cccceeeeeeeeecccceeeeeeeeeeccccceeeeeeeeeeccccccceeecccccccceeeeeeeeeeecccccccccceeeeeeeeeeeeeeeeeeeeeeccccceeeeeeeeeeeeeeecccccceeeee....
    ..cccceeeeeeeeecccceeeeeeeeeeeccccceeeeeeeeeccccccceeeeeeecccceeeeeeeeeeeccccccccceeeeeeeeeeeeeeeeeeeeeeccccceeeeeecccccceeeeeccccceeeeee...
    ..ccceeeeeeeeeeccceeeeeeeeeeeeeccccceeeeeeeeccccccceeeeeeecccceeeeeeeeeeeecccccccceeeeeeeeeeeeeeeeeeeeeecccceeeeeecccccccceeeeeeccceeeeee...
    ..ccceeeeeeeeeeccceeeeeeeccceeeecccccccccceeccccccceeeeeeccccceeeeeeeeeeeeeccccccceeeeeeeeeeeeeeeeeeeeeecccceeeeeccccccccceeeeeeccceeeeee...
    ..ccceeeeeeeeeeccceeeeeeecccceeecccccccccceecccccceeeeeecccccceecccceeeeeeeccccccceeeeeeeeeeeeeeeeeeeeecccceeeeeecccccecccceeeeeccceeeeee...
    ..ccceeeeeeeeeeccceeeeeeccccceeeeecccccccceeeeeeeeeeeeeecccccceeccccceeeeeeeeccccceeeeeeeeeeeeeeeeeeeeecccceeeeeeccceeecccceeeecccceeeeee...
    ..ccceeeeeeeeeecccceeeeeccccceeeeeeeeeeccceeeeeeeeeeeecccccccceeccccceeeeeeeeccccceeeeeeeeeeeeeeeeeeeecccceeeeeeecccceeeccceeeecccceeeeee...
    ..cccceeeeeeeeecccceeeeeccccceeeeeeeeeeccceeeeeeeeeeeeccccccceeeccccceeeeeeeccccccceeeeeeeeeeeeeeeeeeccccceeeeeeecccccccccceeecccceeeeeee...
    ..cccceeeeeeeeeeccceeeeeccccceeeeeeeeeeccceeeeeeeeeeecccccccceeecccceeeeeeeeccccccceeeeeeeeeeeeeeeeeccccceeeeeeeeeccccccccceeccccceeeeeee...
    ..ecccceeeeeeeeeccccceeeccccceeeeeeeeecccceeeeeeeeeecccccccceeeeeeeeeeeeeeeccccccccceeeeeeeeeeeeeccccccccceeeeeeeecccccccceeecccceeeeeeee...
    ...cccccceeeeeeeccccceeeeeeeeeeeeeeeeccccceeeeeeeeeecccccccceeeeeeeeeeeeeeeccccccccccceeeeeeeecccccccccccccceeeeeeeeeeeeeeeccccceeeeeeeee...
    ...eccccccceeeecccccceeeeeeeeeeeeeeeecccceeeeeeeeecccccccccccceeeeeeeeeeeecccccccccccccccccccccccccccccccccccccceeeeeeeeeecccccceeeeeeee....
    ...eeccccccccccccccccceeeeeeeeeeeeeeecccccccccccccccccceccccccceeeeeeeeeeecccccccccccccccccccccccccceeeeccccccccccccccccccccccceeeeeeeee....
    ..eeeeeccccccccccccccccceeeeeeeeeeeccccccccccccccccccceecccccccccceeeeeecccccccceeeeccccccccccccccccceeeeeccccccccccccccccccceeeeeeeeeee....
    ...eeeeecccccccccecccccccceeeeeeeecccccccccccccccccceeeeecccccccccccccecccccccceeeeeeeecccceeeeeccccccceeeeeeecccccccccccccceeeeeeeeeeee....
    ...eeeeeeeeeeeeeeeecccccccccccccccccccceeeeeeeeeeeeeeeeeeeecccccccccccccccccccccceeeeeecccceeeeeeeccccccccccccccccceeeeeeeeeeeeeeeeeeeee....
    ...eeeeeeeeeeeeeeeeeeccccccccccccccccceeeeeeeeeeeeeeeeeeeeeeeecccccccccccccccccccceeeeecccceeeeeeeecccccccccccccccceeeeeeeeeeeeeeeeeeeeee...
    ...eeeeeeeeeeeeeeeeeeeeeccccccccccccceeeeeeeeeeeeeeeeeeeeeeeeeeeccccccccccccecccccccccccccceeeeeeeeeeccccccccccceeeeeeeeeeeeeeeeeeeeeeee....
    ...eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeccccccccceeecccccccccccceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee....
    ...eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeccccccccceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee....
    `]
game.onUpdate(function () {
    Gidget.x = Math.constrain(Gidget.x, 0, scene.screenWidth())
    Gidget.vy = Math.constrain(Gidget.vy, 0 - jumpVelocity, jumpVelocity * 1.5)
    if (Gidget.top > scene.screenHeight()) {
        game.over(false)
    }
})
game.onUpdateInterval(500, function () {
    treeSection = sprites.createProjectileFromSide(treeSections[treeIndex], 0, 50)
    treeSection.setKind(SpriteKind.Tree)
    treeSection.z = -1
    treeSection.x = scene.screenWidth() / 2
    projectile = sprites.createProjectileFromSide(img`
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        `, 0, 50)
    projectile.x = randint(16, scene.screenWidth() - 16)
    treeIndex = (treeIndex + 1) % treeSections.length
})
