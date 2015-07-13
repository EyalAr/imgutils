import should from "should";
import UInt8Matrix2D from "../../src/matrix/UInt8Matrix2D";

describe("UInt8Matrix2D", function(){

    describe("Is Symmetric", function(){

        var data1 = new Int8Array([0, 1, 1, 0]),
            data2 = new Int8Array([0, 1, 0, 1]),
            m1 = new UInt8Matrix2D(2, 2, data1),
            m2 = new UInt8Matrix2D(2, 2, data2);

        it("should be symmetric", function(){
            should(m1.isSymmetric()).be.ok();
        });

        it("should not be symmetric", function(){
            should(m2.isSymmetric()).not.be.ok();
        });

    });

});
