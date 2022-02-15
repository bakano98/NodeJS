function solveRect(length, breadth, callback) {
  if (length <= 0 || breadth <= 0) {
    setTimeout(
      () => callback(new Error("Needs to be greater than 0"), null),
      2000
    );
  } else {
    setTimeout(
      () =>
        // callback returns (null, {perimeter: (...), area: (...)})
        callback(null, {
          perimeter: (x, y) => 2 * (x + y),
          area: (x, y) => x * y,
        }),
      2000
    );
  }
}

// This is how to export modules properly.
module.exports = {
  solveRect,
};
