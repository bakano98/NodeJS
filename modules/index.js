var rect = require("./rectangle");

function solveRect(l, b) {
  return rect.solveRect(l, b, (err, r) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Area: " + r.area(l, b));
      console.log("Perimeter: " + r.perimeter(l, b));
    }
  });
}

solveRect(0, 3);
solveRect(1, 4);
solveRect(2, 5);
