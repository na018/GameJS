/*
// /!*
// (function () {
//
//     var container = {
//         instances: 0,
//         getContainer: null,
//         findContainer: function () {
//             if (this.getContainer == null) {
//                 this.getContainer = document.getElementById("outputContainer");
//             }
//             console.log(++this.instances);
//         },
//         init: function () {
//             this.findContainer()
//         },
//         input: "",
//         changeHtml: function () {
//             this.getContainer.innerHTML = this.input;
//         },
//         addInput: function (input) {
//             console.log(input);
//             this.input += "<p>" + input + "</p>";
//         }
//     };
//
//     var o = {
//         a: 2,
//         m: function () {
//             return this.a + 1;
//         }
//     };
//
//     container.init();
//     container.addInput("o.m(): " + o.m());
//
//
//     var p = Object.create(o);
//     container.addInput("p.m(): " + p.m());
//     p.a = 4;
//
//
//     container.addInput("p.m(): " + p.m());
//
//     function Graph() {
//         this.vertices = [];
//         this.edges = [];
//     }
//
//
//     Graph.prototype = {
//         addVertex: function (v) {
//             this.vertices.push(v);
//             container.addInput(this.vertices);
//         }
//     }
//     var g;
//     g= new Graph().addVertex(12);
//
//
//     "use strict";
//
//     class Polygon {
//         constructor(height, width) {
//             this.height = height;
//             this.width = width;
//         }
//     }
//
//     class Square extends Polygon {
//         constructor(sideLength) {
//             super(sideLength, sideLength);
//         }
//         get area() {
//             return this.height * this.width;
//         }
//         set sideLength(newLength) {
//             this.height = newLength;
//             this.width = newLength;
//         }
//     }
//
//     var square = new Square(2*2);
//     container.addInput(square.area);
//
//
//
//     container.changeHtml();
//
//
// })();
// *!/
*/
