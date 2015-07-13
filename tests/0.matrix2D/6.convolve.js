import should from "should";
import Int8Matrix2D from "../../src/matrix/Int8Matrix2D";

describe("Int8Matrix2D", function(){

    describe("Convolve", function(){

        var m = new Int8Matrix2D(3, 3,
            new Int8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]));

        var kernel = new Int8Matrix2D(3, 3,
            new Int8Array([-1, -2, -1, 0, 0, 0, 1, 2, 1]));

        var expected = new Int8Matrix2D(3, 3,
            new Int8Array([-13, -20, -17, -18, -24, -18, 13, 20, 17]));

        m.convolve(kernel);

        it("should have the expected result", function(){
            should(m.equals(expected)).be.ok();
        });

    });

});
