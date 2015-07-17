import should from "should";
import Int8Matrix2D from "../../src/matrix/Int8Matrix2D";

describe("Int8Matrix2D", function(){

    describe("Transpose", function(){

        var m = new Int8Matrix2D(2, 3, new Int8Array([
            0, 1,
            2, 3,
            4, 5
        ]));

        m.transpose();

        // 0 2 4
        // 1 3 5

        it("should create matrix with correct dimensions", function(){
            should(m.getWidth()).equal(3);
            should(m.getHeight()).equal(2);
        });

        it("should create matrix with correct data", function(){
            should(m.get(0, 0)).equal(0);
            should(m.get(1, 0)).equal(2);
            should(m.get(2, 0)).equal(4);
            should(m.get(0, 1)).equal(1);
            should(m.get(1, 1)).equal(3);
            should(m.get(2, 1)).equal(5);
        });

    });

    describe("Transpose and duplicate", function(){

        var m1 = new Int8Matrix2D(2, 3, new Int8Array([
            0, 1,
            2, 3,
            4, 5
        ]));

        m1.transpose();

        const m2 = m1.duplicate();

        // 0 2 4
        // 1 3 5

        it("should create matrix with correct dimensions", function(){
            should(m2.getWidth()).equal(3);
            should(m2.getHeight()).equal(2);
        });

        it("should create matrix with correct data", function(){
            should(m2.get(0, 0)).equal(0);
            should(m2.get(1, 0)).equal(2);
            should(m2.get(2, 0)).equal(4);
            should(m2.get(0, 1)).equal(1);
            should(m2.get(1, 1)).equal(3);
            should(m2.get(2, 1)).equal(5);
        });

    });

});
