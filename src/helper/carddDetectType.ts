import Visa from "assets/svg/Group 39654.svg";
import Master from "assets/svg/Group 39655.svg";
import Amex from "assets/svg/Group 39656.svg";
import Jcb from "assets/svg/jcb.svg";
import React from "react";

// card detecttype----------------------------------------------------------------------------------------------------------
export function detectCardType(number: string): any {
  if (number[0] === "4" || number === "visa") {
    return React.createElement("img", { src: Visa, alt: "visa", className: "card-type-img" });
  }
  if (
    (number[0] === "5" &&
      (number[1] === "1" || number[1] === "2" || number[1] === "3" || number[1] === "4" || number[1] === "5")) ||
    number === "mastercard"
  ) {
    return React.createElement("img", { src: Master, alt: "master", className: "card-type-img" });
  }
  if ((number[0] === "3" && (number[1] === "4" || number[1] === "7")) || number === "amex") {
    return React.createElement("img", { src: Amex, alt: "amex", className: "card-type-img" });
  }
  if (
    (number[0] === "3" && number[1] === "5" && number[2] === "2" && (number[3] === "8" || number[3] === "9")) ||
    (number[0] === "3" &&
      number[1] === "5" &&
      (number[2] === "3" ||
        number[2] === "4" ||
        number[2] === "5" ||
        number[2] === "6" ||
        number[2] === "7" ||
        number[2] === "8")) ||
    number === "jcb"
  ) {
    return React.createElement("img", { src: Jcb, alt: "jcb", className: "card-type-img" });
  }
}
