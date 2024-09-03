const sum = (...numbers) => {
  // 2
  if (numbers.length === 0) {
    return 0;
  }
  // 1
  if (numbers.some((num) => typeof num !== "number")) {
    return null;
  }
  // 3 - 4
  return numbers.reduce((acc, val) => acc + val);
};

let successTests = 0;
let totalTests = 0;

function test1() {
  totalTests++;
  console.log("TEST 1: returns null if a parameter is not numeric");
  const test = sum("2", 2);
  // test will fail not only because one parameter isnt numeric, but also because sum is doing nothing
  if (test === null) {
    console.log("- TEST 1 OK -");
    successTests++;
  } else {
    console.log(`- TEST 2 FAIL: EXPECTED null, GOT ${test} -`);
  }
}

function test2() {
  totalTests++;
  console.log("TEST 2: Returns 0 if the function receives no arguments");
  const test = sum();
  if (test === 0) {
    console.log("- TEST 2 OK -");
    successTests++;
  } else {
    console.log(`- TEST 2 FAIL: EXPECTED 0, GOT ${test} -`);
  }
}

function test3() {
  totalTests++;
  console.log("TEST 3: Returns the sum of two numbers");
  const test = sum(2, 2);
  if (test === 4) {
    console.log("- TEST 3 OK -");
    successTests++;
  } else {
    console.log(`- TEST 3 FAIL: EXPECTED 4, GOT ${test} -`);
  }
}

function test4() {
  totalTests++;
  console.log("TEST 4: Returns the sum of any quantity of numbers");
  const test = sum(2, 2, 5, 10, 4);
  if (test === 23) {
    console.log("- TEST 4 OK -");
    successTests++;
  } else {
    console.log(`- TEST 4 FAIL: EXPECTED 23, GOT ${test} -`);
  }
}

test1();
test2();
test3();
test4();

console.log(`OK Tests: ${successTests}/${totalTests}`);
