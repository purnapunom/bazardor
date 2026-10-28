const BN = "০১২৩৪৫৬৭৮৯";
export const toBn = (v) => String(v).replace(/\d/g, (d) => BN[d]);
export const price = (n) => toBn(Number(n).toLocaleString("en-US"));
const UNITS = { kg: "প্রতি কেজি", litre: "প্রতি লিটার", liter: "প্রতি লিটার", l: "প্রতি লিটার", dozen: "প্রতি ডজন", piece: "প্রতি পিস", pcs: "প্রতি পিস", hali: "প্রতি হালি" };
export const unitBn = (u) => UNITS[String(u).toLowerCase()] || `প্রতি ${u}`;
export const bnDate = () =>
  new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());
// Sort by numeric value (prices are numbers, never compared as Bengali strings)
export const sortProducts = (items, mode) => {
  const a = [...items];
  if (mode === "asc") a.sort((x, y) => Number(x.today) - Number(y.today));
  if (mode === "desc") a.sort((x, y) => Number(y.today) - Number(x.today));
  return a;
};
