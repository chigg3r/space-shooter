controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 2 2 2 . . . . . 
        . . . . . . . 2 2 2 4 2 . . . . 
        . . . . 2 2 2 2 4 4 5 4 2 . . . 
        . . . . . . . 2 2 2 4 2 . . . . 
        . . . . . . . . 2 2 2 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Player_ship, 100, 0)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.warmRadial, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.warmRadial, 500)
    scene.cameraShake(4, 500)
})
let Enemy_ship: Sprite = null
let projectile: Sprite = null
let Player_ship: Sprite = null
effects.starField.startScreenEffect()
Player_ship = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . 6 . . . . . . . . . . . 
    . . . . 8 6 . . . . . . . . . . 
    . . . . c 8 6 . . . . . . . . . 
    . . . . e c 8 6 . . . . . . . . 
    . . . e c 8 7 7 6 . . . . . . . 
    . . e c 2 8 7 7 6 6 6 6 6 6 . . 
    . e c 2 4 8 8 8 8 8 9 8 8 8 8 . 
    e c 2 2 4 b 9 6 6 6 9 9 6 6 6 7 
    . e c 2 4 8 8 8 8 8 9 8 8 8 8 . 
    . . e c 2 8 7 7 6 6 6 6 6 6 . . 
    . . . e c 8 7 7 6 . . . . . . . 
    . . . . e c 8 6 . . . . . . . . 
    . . . . c 8 6 . . . . . . . . . 
    . . . . 8 6 . . . . . . . . . . 
    . . . . 6 . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(Player_ship)
Player_ship.setStayInScreen(true)
info.setLife(1)
game.onUpdateInterval(2000, function () {
    Enemy_ship = sprites.create(img`
        . . . . . . . a a a a . . . . . . . 
        . . . . . . a a a a a a . . . . . . 
        . . . . . a 7 9 9 9 9 7 a . . . . . 
        . . . . . a 7 7 7 7 7 7 a . . . . . 
        . . . . . a 7 f 7 7 f 7 a . . . . . 
        . . . . . a 7 7 7 7 7 7 a . . . . . 
        . . . . . a 9 7 f f 7 9 a . . . . . 
        . . . a a a 9 7 7 7 7 9 a a a . . . 
        . . a 6 6 6 f f f f f f 6 6 6 a . . 
        . a 8 8 8 8 6 6 6 6 6 6 8 8 8 8 a . 
        a c c 8 8 8 8 8 6 6 8 8 8 8 8 c c a 
        . a c c c 8 8 8 8 8 8 8 8 c c c a . 
        . . a c c c c 8 8 8 8 c c c c a . . 
        . . . a a c c c c c c c c a a . . . 
        . . . . . a a c c c c a a . . . . . 
        . . . . . . . a a a a . . . . . . . 
        `, SpriteKind.Enemy)
    Enemy_ship.x = scene.screenWidth()
    Enemy_ship.vx = -20
    Enemy_ship.y = randint(10, scene.screenHeight() - 10)
})
