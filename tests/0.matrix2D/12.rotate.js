import should from "should";
import Int8Matrix2D from "../../src/matrix/Int8Matrix2D";

describe("Int8Matrix2D", function(){

    describe("Rotate", function(){

        describe("90", function(){

            var M = new Int8Matrix2D(3, 2, new Int8Array([
                1, 2, 3,
                1, 2, 4
            ]));

            const expected = new Int8Matrix2D(2, 3, new Int8Array([
                1, 1,
                2, 2,
                4, 3
            ]));

            M.rotate90();

            it("should have correct data", function(){
                should(M.equals(expected)).be.ok();
            });

        });

        describe("270", function(){

            var M = new Int8Matrix2D(3, 2, new Int8Array([
                1, 2, 3,
                1, 2, 4
            ]));

            const expected = new Int8Matrix2D(2, 3, new Int8Array([
                3, 4,
                2, 2,
                1, 1
            ]));

            M.rotate270();

            it("should have correct data", function(){
                should(M.equals(expected)).be.ok();
            });

        });

        describe("180", function(){

            var M = new Int8Matrix2D(3, 2, new Int8Array([
                1, 2, 3,
                1, 2, 4
            ]));

            const expected = new Int8Matrix2D(3, 2, new Int8Array([
                4, 2, 1,
                3, 2, 1
            ]));

            M.rotate180();

            it("should have correct data", function(){
                should(M.equals(expected)).be.ok();
            });

        });

    });

});
