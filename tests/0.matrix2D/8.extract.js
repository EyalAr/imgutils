import should from "should";
import Int8Matrix2D from "../../src/matrix/Int8Matrix2D";

describe("Int8Matrix2D", function(){

    describe("Extract", function(){

        var m = new Int8Matrix2D(5, 5, new Int8Array([
            1, 2, 3, 4, 5,
            1, 2, 3, 4, 5,
            1, 2, 3, 4, 5,
            1, 2, 9, 4, 5,
            1, 2, 3, 4, 5,
        ]));

        var expected = new Int8Matrix2D(3, 3, new Int8Array([
            2, 3, 4,
            2, 9, 4,
            2, 3, 4,
        ]));

        var actual = m.extract(1, 2, 4, 5);

        it("should have correct data", function(){
            should(actual.equals(expected)).be.ok();
        });

        it("should be a copy of the data", function(){
            m.set(2, 3, 100);
            should(actual.get(1, 1)).equal(9);
        });

    });

});
