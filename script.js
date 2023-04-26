const rateElmRef = document.getElementById("rate");

const quantityElmRef = document.getElementById("quantity");

const grossElmRef = document.getElementById("gross");

const cgstElmRef = document.getElementById("cgst");

const sgstElmRef = document.getElementById("sgst");

const grandElmRef = document.getElementById("grand");

rateElmRef.addEventListener("focus", function (e) {
  rateElmRef.style.backgroundColor = "cyan";

  if (rateElmRef.value == "" || rateElmRef.value == "0.00") {
    rateElmRef.value = "";
  } else {
    rateElmRef.value = rateElmRef.value;
  }
});

quantityElmRef.addEventListener("focus", function (e) {
  quantityElmRef.style.backgroundColor = "cyan";

  if (quantityElmRef.value == "" || quantityElmRef.value == "0") {
    quantityElmRef.value = "";
  } else {
    quantityElmRef.value = quantityElmRef.value;
  }
});

rateElmRef.addEventListener("blur", function (e) {
  rateElmRef.style.backgroundColor = "";
  if (rateElmRef.value == "") {
    rateElmRef.value = "0.00";
  } else {
    rateElmRef.value = rateElmRef.value;
  }
});

quantityElmRef.addEventListener("blur", function (e) {
  quantityElmRef.style.backgroundColor = "";
  if (quantityElmRef.value == "") {
    quantityElmRef.value = "0";
  } else {
    quantityElmRef.value = quantityElmRef.value;
  }
});

rateElmRef.addEventListener("change", function (e) {
  var rate = parseFloat(rateElmRef.value);
  var quantity = parseInt(quantityElmRef.value);

  const gross = calculateGross(rate, quantity);
  const cgst = calculateCGST(gross);
  const sgst = calculateSGST(cgst);
  const grand = calculateGrand(gross, cgst, sgst);
});

quantityElmRef.addEventListener("change", function (e) {
  var rate = parseFloat(rateElmRef.value);
  var quantity = parseInt(quantityElmRef.value);

  const gross = calculateGross(rate, quantity);
  const cgst = calculateCGST(gross);
  const sgst = calculateSGST(cgst);
  const grand = calculateGrand(gross, cgst, sgst);
});

function calculateGross(rate, quantity) {
  const gross = parseFloat(rate * quantity);
  grossElmRef.value = +gross.toFixed(2);
  return gross;
}

function calculateCGST(gross) {
  const CGST = parseFloat((gross * 2.5) / 100);
  cgstElmRef.value = +CGST.toFixed(2);
  return CGST;
}

function calculateSGST(cgst) {
  const SGST = parseFloat(cgst);
  sgstElmRef.value = +SGST.toFixed(2);
  return SGST;
}

function calculateGrand(gross, cgst, sgst) {
  const grand = parseFloat(gross + cgst + sgst);
  grandElmRef.value = +grand.toFixed(2);
  return grand;
}
