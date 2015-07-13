import should from "should";
import UInt8Matrix2D from "../../src/matrix/UInt8Matrix2D";

describe("UInt8Matrix2D", function(){

    describe("Equals", function(){

        var data = new Int8Array([0, 1, 2, 3, 4, 5]),
            m1 = new UInt8Matrix2D(2, 3, data),
            m2 = new UInt8Matrix2D(2, 3, data);

        it("should be equal", function(){
            should(m1.equals(m2)).be.ok();
            should(m2.equals(m1)).be.ok();
        });

    });

    describe("Not equals", function(){

        var data1 = new Int8Array([0, 1, 2, 3, 4, 5]),
            data2 = new Int8Array([0, 13, 23, 33, 4, 5]),
            m1 = new UInt8Matrix2D(2, 3, data1),
            m2 = new UInt8Matrix2D(2, 3, data2);

        it("should not be equal", function(){
            should(m1.equals(m2)).not.be.ok();
            should(m2.equals(m1)).not.be.ok();
        });

    });

    describe("Transpose equality", function(){

        var data = new Int8Array([0, 1, 2, 3, 4, 5]),
            m1 = new UInt8Matrix2D(2, 3, data),
            m2 = m1.duplicate().transpose();

        it("should not be equal", function(){
            should(m1.equals(m2)).not.be.ok();
            should(m2.equals(m1)).not.be.ok();
        });

    });

});
