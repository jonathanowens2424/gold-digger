export default function generateGoldPrice() {
  // generate a random number that is close to Gold's Price
  const min = 4400;
  const max = 4600;
  const goldPrice = Math.floor(Math.random() * (max - min + 1)) + min;
  return goldPrice;
}
