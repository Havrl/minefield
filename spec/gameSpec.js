describe("Game spec", function() {

    var game = require("../app/game");

    it("pass test", function() {
        expect(true).toBe(true);
    });

    describe("getNextDir", function() {

        it("should get East after North", function() {
            var currentDir = 'North';
            var nextDir = game.getNextDir(currentDir);

            expect(nextDir).toBe("East");
        });

        it("should get North after West", function() {
            var currentDir = 'West';
            var nextDir = game.getNextDir(currentDir);

            expect(nextDir).toBe("North");
        });

    });

    describe("getNextPosition", function() {
        it("should get next position on rotate", function() {

            var currentPos = game.position(0, 3, "North");
            var nextPos = game.getNextPosition(currentPos, "r");

            expect(nextPos.x).toBe(0);
            expect(nextPos.y).toBe(3);
            expect(nextPos.dir).toBe("East");

        });

        it("should get next position on move to North", function() {

            var currentPos = game.position(0, 3, "North");
            var nextPos = game.getNextPosition(currentPos, "m");

            expect(nextPos.x).toBe(0);
            expect(nextPos.y).toBe(2);
            expect(nextPos.dir).toBe("North");

        });

        it("should get next position on move to South", function() {

            var currentPos = game.position(0, 3, "South");
            var nextPos = game.getNextPosition(currentPos, "m");

            expect(nextPos.x).toBe(0);
            expect(nextPos.y).toBe(4);
            expect(nextPos.dir).toBe("South");

        });

        it("should get next position on move to East", function() {

            var currentPos = game.position(0, 3, "East");
            var nextPos = game.getNextPosition(currentPos, "m");

            expect(nextPos.x).toBe(1);
            expect(nextPos.y).toBe(3);
            expect(nextPos.dir).toBe("East");

        });

        it("should get next position on move to West", function() {

            var currentPos = game.position(0, 3, "West");
            var nextPos = game.getNextPosition(currentPos, "m");

            expect(nextPos.x).toBe(-1);
            expect(nextPos.y).toBe(3);
            expect(nextPos.dir).toBe("West");

        });
    });

    describe("isOffBound", function() {
        it("should be out of bound if pos.x < 0", function () {

            var boardSize = { "n": 4, "m": 4 };
            var pos = game.position(-1, 3, "North");
            var isOut = game.isOffBound(pos, boardSize);

            expect(isOut).toBeTruthy();

        });

        it("should be out of bound if pos.y < 0", function () {

            var boardSize = { "n": 4, "m": 4 };
            var pos = game.position(-1, -1, "North");
            var isOut = game.isOffBound(pos, boardSize);

            expect(isOut).toBeTruthy();

        });

        it("should not be out of bound", function () {

            var boardSize = { "n": 4, "m": 4 };
            var pos = game.position(0, 0, "North");
            var isOut = game.isOffBound(pos, boardSize);

            expect(isOut).toBeFalsy();

        });
    });

    describe("isMineHit", function() {
        it("should get mine collision", function () {

            var mines = [ { "x": 1, "y": 2 }, { "x": 2, "y": 2 } ];
            var pos = game.position(2, 2, "North");
            var isCollision = game.isMineHit(pos, mines);

            expect(isCollision).toBeTruthy();

        });

        it("should not get mine collision", function () {

            var mines = [ { "x": 1, "y": 2 }, { "x": 2, "y": 2 } ];
            var pos = game.position(2, 3, "North");
            var isCollision = game.isMineHit(pos, mines);

            expect(isCollision).toBeFalsy();

        });
    });

    describe("isExit", function() {
        it("should be on exit tile", function () {

            var exitPos = game.position(3, 3);
            var currentPos = game.position(3, 3, "South");
            var isExit = game.isExit(currentPos, exitPos);

            expect(isExit).toBeTruthy();

        });

        it("should not be on exit tile", function () {

            var exitPos = game.position(3, 3);
            var currentPos = game.position(3, 2, "South");
            var isExit = game.isExit(currentPos, exitPos);

            expect(isExit).toBeFalsy();

        });
    });
});