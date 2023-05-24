import { CardData } from "@types";

export function stripeBody(data: CardData) {
  const card: any = {
    "payment_method_data[type]": "card",
    "payment_method_data[card][number]": data.number,
    "payment_method_data[card][exp_month]": data.exp_month,
    "payment_method_data[card][exp_year]": data.exp_year,
    "payment_method_data[card][cvc]": data.cvc,
  };
  var formBody: any = [];
  for (var property in card) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(card[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return formBody;
}
