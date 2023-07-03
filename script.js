const rateElmRef = document.getElementById("rate");

const quantityElmRef = document.getElementById("quantity");

const gstRateElmRef = document.getElementById("gstRates");

const grossElmRef = document.getElementById("gross");

const cgstElmRef = document.getElementById("cgst");

const sgstElmRef = document.getElementById("sgst");

const grandElmRef = document.getElementById("grand");

const amountInWordsElmRef = document.getElementById("amountInWords");

rateElmRef.addEventListener("focus", function (e) {
  if (rateElmRef.value == "" || rateElmRef.value == "0.00") {
    rateElmRef.value = "";
  } else {
    rateElmRef.value = rateElmRef.value;
  }
});

quantityElmRef.addEventListener("focus", function (e) {
  if (quantityElmRef.value == "" || quantityElmRef.value == "0") {
    quantityElmRef.value = "";
  } else {
    quantityElmRef.value = quantityElmRef.value;
  }
});

rateElmRef.addEventListener("blur", function (e) {
  if (rateElmRef.value == "") {
    rateElmRef.value = "₹ 0.00";
  } else {
    rateElmRef.value = rateElmRef.value;
  }
});

quantityElmRef.addEventListener("blur", function (e) {
  if (quantityElmRef.value == "") {
    quantityElmRef.value = "0";
  } else {
    quantityElmRef.value = quantityElmRef.value;
  }
});

rateElmRef.addEventListener("change", function (e) {
  if (!isValid()) {
    return;
  }
  claculateAll();
});

quantityElmRef.addEventListener("change", function (e) {
  if (!isValid()) {
    return;
  }
  claculateAll();
});

gstRateElmRef.addEventListener("change", function (e) {
  if (!isValid()) {
    return;
  }
  claculateAll();
});

rateElmRef.addEventListener("keyup", function (e) {
  if (!isValid()) {
    return;
  }
  claculateAll();
});

quantityElmRef.addEventListener("keyup", function (e) {
  if (!isValid()) {
    return;
  }
  claculateAll();
});

function claculateAll() {
  let rate = parseFloat(rateElmRef.value);
  let quantity = parseInt(quantityElmRef.value);
  let gstRate = parseInt(
    gstRateElmRef.options[gstRateElmRef.selectedIndex].value
  );

  const gross = calculateGross(rate, quantity);
  const cgst = calculateCGST(gross, gstRate);
  const sgst = calculateSGST(cgst);
  const grand = calculateGrand(gross, cgst, sgst);
  var amountInWords = showAmountInWords(grand);
}

function calculateGross(rate, quantity) {
  const gross = parseFloat(rate * quantity);
  grossElmRef.value = (+gross.toFixed(0)).toLocaleString("en-In", {
    style: "currency",
    currency: "INR",
  });
  return gross;
}

function calculateCGST(gross, gstRate) {
  const CGST = parseFloat((gross * (gstRate / 2)) / 100);
  cgstElmRef.value = (+CGST.toFixed(0)).toLocaleString("en-In", {
    style: "currency",
    currency: "INR",
  });;
  return CGST;
}

function calculateSGST(cgst) {
  const SGST = parseFloat(cgst);
  sgstElmRef.value = (+SGST.toFixed(0)).toLocaleString("en-In", {
    style: "currency",
    currency: "INR",
  });;
  return SGST;
}

function calculateGrand(gross, cgst, sgst) {
  const grand = parseFloat(gross + cgst + sgst);

  grandElmRef.value = (+grand.toFixed(0)).toLocaleString("en-In", {
    style: "currency",
    currency: "INR",
  });
  return grand;
}

function showAmountInWords(amount) {
  var value = amount.toFixed(0);

  var amountInWords = number2text(value);

  function number2text(value) {
    var fraction = Math.round(frac(value) * 100);
    var f_text = "";

    if (fraction > 0) {
      f_text = "And " + convert_number(fraction) + " Paise ";
    }

    return convert_number(value) + " Rupee " + f_text + "Only...";
  };

  function frac(f) {
    return f % 1;
  }

  function convert_number(number) {
    if (number < 0 || number > 999999999) {
      return "NUMBER OUT OF RANGE!";
    }
    var Gn = Math.floor(number / 10000000); /* Crore */
    number -= Gn * 10000000;
    var kn = Math.floor(number / 100000); /* lakhs */
    number -= kn * 100000;
    var Hn = Math.floor(number / 1000); /* thousand */
    number -= Hn * 1000;
    var Dn = Math.floor(number / 100); /* Tens (deca) */
    number = number % 100; /* Ones */
    var tn = Math.floor(number / 10);
    var one = Math.floor(number % 10);
    var res = "";

    if (Gn > 0) {
      res += convert_number(Gn) + " Crore";
    }
    if (kn > 0) {
      res += (res == "" ? "" : " ") + convert_number(kn) + " Lakh";
    }
    if (Hn > 0) {
      res += (res == "" ? "" : " ") + convert_number(Hn) + " Thousand";
    }

    if (Dn) {
      res += (res == "" ? "" : " ") + convert_number(Dn) + " Hundred";
    }

    var ones = Array(
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen"
    );
    var tens = Array(
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety"
    );

    if (tn > 0 || one > 0) {
      if (!(res == "")) {
        res += " And ";
      }
      if (tn < 2) {
        res += ones[tn * 10 + one];
      } else {
        res += tens[tn];
        if (one > 0) {
          res += "-" + ones[one];
        }
      }
    }

    if (res == "") {
      res = "Zero";
    }
    return res;
  }

  amountInWordsElmRef.value = amountInWords;
  return amountInWords;
}

function isValid() {
  const rate = parseInt(rateElmRef.value);
  const quantity = parseInt(quantityElmRef.value);

  if (isNaN(rate) || isNaN(quantity)) {
    return false;
  }
  return true;
}
