import should from "should";
import Int8Matrix2D from "../../src/matrix/Int8Matrix2D";

describe("Int8Matrix2D", function(){

    describe("Paste", function(){

        var m = new Int8Matrix2D(5, 5, new Int8Array([
            1, 2, 3, 4, 5,
            1, 2, 3, 4, 5,
            1, 2, 3, 4, 5,
            1, 2, 3, 4, 5,
            1, 2, 3, 4, 5,
        ]));

        var other = new Int8Matrix2D(3, 3, new Int8Array([
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
        ]));

        const expected = new Int8Matrix2D(5, 5, new Int8Array([
            1, 2, 3, 4, 5,
            1, 0, 0, 0, 5,
            1, 0, 0, 0, 5,
            1, 0, 0, 0, 5,
            1, 2, 3, 4, 5,
        ]));

        m.paste(other, 1, 1);

        it("should have correct data", function(){
            should(m.equals(expected)).be.ok();
        });

        it("should be a copy of the data", function(){
            other.set(1, 1, 100);
            should(m.get(2, 2)).equal(0);
        });

    });

});
