import should from "should";
import Int8Matrix2D from "../../src/matrix/Int8Matrix2D";

describe("Int8Matrix2D", function(){

    describe("Constructor", function(){

        var data = new Int8Array([1, 2, 3, 4]),
            m = new Int8Matrix2D(2, 2, data);

        it("should create matrix with correct dimensions", function(){
            should(m.getWidth()).equal(2);
            should(m.getHeight()).equal(2);
        });

        it("should create matrix with correct data", function(){
            should(m.get(0, 0)).equal(1);
            should(m.get(0, 1)).equal(3);
            should(m.get(1, 0)).equal(2);
            should(m.get(1, 1)).equal(4);
        });

    });

    describe("Duplicate", function(){

        var data = new Int8Array([1, 2, 3, 4]),
            m1 = new Int8Matrix2D(2, 2, data),
            m2 = m1.duplicate();

        it("should create matrix with correct dimensions", function(){
            should(m2.getWidth()).equal(2);
            should(m2.getHeight()).equal(2);
        });

        it("should create matrix with correct data", function(){
            should(m2.get(0, 0)).equal(1);
            should(m2.get(0, 1)).equal(3);
            should(m2.get(1, 0)).equal(2);
            should(m2.get(1, 1)).equal(4);
        });

        it("should not be affected by changes in original matrix", function(){
            m1.set(0, 0, 100);
            should(m2.get(0, 0)).equal(1);
        });

    });

});
