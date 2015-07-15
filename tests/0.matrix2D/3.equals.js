import should from "should";
import Int8Matrix2D from "../../src/matrix/Int8Matrix2D";

describe("Int8Matrix2D", function(){

    describe("Equals", function(){

        const m1 = new Int8Matrix2D(2, 3, new Int8Array([
            0, 1,
            2, 3,
            4, 5
        ]));

        const m2 = new Int8Matrix2D(2, 3, new Int8Array([
            0, 1,
            2, 3,
            4, 5
        ]));

        it("should be equal", function(){
            should(m1.equals(m2)).be.ok();
            should(m2.equals(m1)).be.ok();
        });

    });

    describe("Not equals", function(){

        const m1 = new Int8Matrix2D(2, 3, new Int8Array([
            0, 1,
            2, 3,
            4, 5
        ]));

        const m2 = new Int8Matrix2D(2, 3, new Int8Array([
             0, 13,
            23, 33,
             4,  5
        ]));

        it("should not be equal", function(){
            should(m1.equals(m2)).not.be.ok();
            should(m2.equals(m1)).not.be.ok();
        });

    });

    describe("Transpose equality", function(){

        const m1 = new Int8Matrix2D(2, 3, new Int8Array([
            0, 1,
            2, 3,
            4, 5
        ]));

        const m2 = m1.duplicate().transpose();

        it("should not be equal", function(){
            should(m1.equals(m2)).not.be.ok();
            should(m2.equals(m1)).not.be.ok();
        });

    });

});
