module.exports = (function () {

    var dir = {
        North: 1,
        East: 2,
        South: 3,
        West: 4,
        prop: {
            1: 'North',
            2: 'East',
            3: 'South',
            4: 'West'
        }
    };
    var gameSettings, movesObj;

    function init(settingsFile, movesFile) {

        gameSettings = require(settingsFile);
        movesObj = require(movesFile);

    }

    function play() {

        var currentPos = gameSettings.startPos;

        for (var i = 0; i < movesObj.moves.length; i++) {

            var nextPos = getNextPosition(currentPos, movesObj.moves[i]);

            if (isOffBound(nextPos, gameSettings.boardSize)) {
                console.log('Out of bounds');
                return;
            }

            if (isMineHit(nextPos, gameSettings.minePos)) {
                console.log('Mine hit');
                return;
            }

            if (isExit(nextPos, gameSettings.exitPos)) {
                console.log('Success');
                return;
            }

            /*if (isInDanger(nextPos, gameSettings.minePos)) {
                console.log('still in danger');
            }*/

            currentPos = nextPos;

        }
    }

    function getNextPosition(currentPos, move) {

        var nextPos;

        // Move forward
        if (move == "m") {

            nextPos = position(currentPos.x, currentPos.y, currentPos.dir);

            switch (currentPos.dir) {

                case "North":
                    nextPos.y--;
                    break;
                case "East":
                    nextPos.x++;
                    break;
                case "South":
                    nextPos.y++;
                    break;
                case "West":
                    nextPos.x--;
                    break;

            }

        }

        // Rotate
        else {

            var nextDir = getNextDir(currentPos.dir);

            nextPos = position(currentPos.x, currentPos.y, nextDir);
        }

        return nextPos;

    }

    function position(x, y, dir) {
        return {x: x, y: y, dir: dir};
    }

    function getNextDir(currentDir) {

        var dirIdx = dir[currentDir];

        var nextDirIdx = dirIdx + 1;

        if (nextDirIdx > 4) {
            nextDirIdx = 1;
        }

        return dir.prop[nextDirIdx];
    }

    function isOffBound(pos, boardSize) {

        return pos.x < 0 || pos.x > boardSize.n - 1 || pos.y < 0 || pos.y > boardSize.m - 1;

    }

    // TODO: fix it
    function isInDanger(pos, mines) {

        var isDanger = false;

        for (var i = 0; i < mines.length; i++) {
            if (pos.x+1 == mines[i].x || pos.x-1 == mines[i].x || pos.y-1 == mines[i].y || pos.y+1 == mines[i].y) {
                isDanger = true;
                break;
            }
        }

        return isDanger;

    }

    function isMineHit(pos, mines) {

        var isCollision = false;

        for (var i = 0; i < mines.length; i++) {
            if (mines[i].x == pos.x && mines[i].y == pos.y) {
                isCollision = true;
                break;
            }
        }

        return isCollision;
    }

    function isExit(currentPos, exitPos) {

        return currentPos.x == exitPos.x && currentPos.y == exitPos.y;

    }

    return {
        position: position,
        getNextPosition: getNextPosition,
        getNextDir: getNextDir,
        isOffBound: isOffBound,
        isMineHit: isMineHit,
        isInDanger: isInDanger,
        isExit: isExit,
        init: init,
        play: play
    }

})();