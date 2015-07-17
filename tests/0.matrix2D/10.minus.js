import should from "should";
import Int8Matrix2D from "../../src/matrix/Int8Matrix2D";

describe("Int8Matrix2D", function(){

    describe("Minus", function(){

        var M = new Int8Matrix2D(2, 2, new Int8Array([
            1, 2,
            1, 2
        ]));

        var N = new Int8Matrix2D(2, 2, new Int8Array([
            1, 2,
            1, 2
        ]));

        const expected = new Int8Matrix2D(2, 2, new Int8Array([
            0, 0,
            0, 0
        ]));

        M.minus(N);

        it("should have correct data", function(){
            should(M.equals(expected)).be.ok();
        });

    });

});
