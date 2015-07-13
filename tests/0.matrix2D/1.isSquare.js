import should from "should";
import Int8Matrix2D from "../../src/matrix/Int8Matrix2D";

describe("Int8Matrix2D", function(){

    describe("Is Square", function(){

        var data = new Int8Array([0, 1, 2, 3]),
            m1 = new Int8Matrix2D(2, 2, data),
            m2 = new Int8Matrix2D(1, 4, data);

        it("should be square", function(){
            should(m1.isSquare()).be.ok();
        });

        it("should not be square", function(){
            should(m2.isSquare()).not.be.ok();
        });

    });

});