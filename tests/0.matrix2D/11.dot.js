import should from "should";
import Int8Matrix2D from "../../src/matrix/Int8Matrix2D";

describe("Int8Matrix2D", function(){

    describe("Dot", function(){

        var M = new Int8Matrix2D(3, 2, new Int8Array([
            1, 2, 3,
            1, 2, 3
        ]));

        var N = new Int8Matrix2D(2, 3, new Int8Array([
            1, 2,
            1, 2,
            1, 2
        ]));

        const expected = new Int8Matrix2D(2, 2, new Int8Array([
            6, 12,
            6, 12
        ]));

        M.dot(N);

        it("should have correct data", function(){
            should(M.equals(expected)).be.ok();
        });

    });

});
