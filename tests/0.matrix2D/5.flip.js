import should from "should";
import Int8Matrix2D from "../../src/matrix/Int8Matrix2D";

describe("Int8Matrix2D", function(){

    describe("FlipX", function(){

        var m = new Int8Matrix2D(2, 2, new Int8Array([
            1, 2,
            3, 4
        ]));

        m.flipX();

        it("should create matrix with correct dimensions", function(){
            should(m.getWidth()).equal(2);
            should(m.getHeight()).equal(2);
        });

        it("should create matrix with correct data", function(){
            should(m.get(0, 0)).equal(2);
            should(m.get(0, 1)).equal(4);
            should(m.get(1, 0)).equal(1);
            should(m.get(1, 1)).equal(3);
        });

    });

    describe("FlipY", function(){

        var m = new Int8Matrix2D(2, 2, new Int8Array([
            1, 2,
            3, 4
        ]));

        m.flipY();

        it("should create matrix with correct dimensions", function(){
            should(m.getWidth()).equal(2);
            should(m.getHeight()).equal(2);
        });

        it("should create matrix with correct data", function(){
            should(m.get(0, 0)).equal(3);
            should(m.get(0, 1)).equal(1);
            should(m.get(1, 0)).equal(4);
            should(m.get(1, 1)).equal(2);
        });

    });

});
