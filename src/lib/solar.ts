export type CalcInput = {
  monthlyBill: number;
  roofArea: number;
  orientation: "jug" | "istok-zapad" | "sjever";
  city: string;
};
export type CalcResult = {
  systemKw: number;
  yearlyKwh: number;
  monthlySavings: number;
  yearlySavings: number;
  paybackYears: number;
  co2Tons: number;
  estCost: number;
  batteryRec: string;
};
const irradiance: Record<string, number> = {
  Mostar: 1450, Ljubuški: 1430, Sarajevo: 1250, Banja_Luka: 1200,
  Zagreb: 1180, Split: 1450, Dubrovnik: 1480, Rijeka: 1300, default: 1280,
};
export function calculate(i: CalcInput): CalcResult {
  const factor = i.orientation === "jug" ? 1 : i.orientation === "istok-zapad" ? 0.85 : 0.6;
  const sun = irradiance[i.city.replaceAll(" ", "_")] ?? irradiance.default;
   const tariff = 0.25; // KM/kWh blended (approximate for BiH/HR)
  const yearlyConsumption = (i.monthlyBill * 12) / tariff;
  const targetKwh = yearlyConsumption * 0.9;
  const systemKw = Math.max(2, Math.min(i.roofArea / 5.5, targetKwh / (sun * factor)));
  const yearlyKwh = Math.round(systemKw * sun * factor);
  const yearlySavings = Math.round(Math.min(yearlyKwh, yearlyConsumption) * tariff);
  const monthlySavings = Math.round(yearlySavings / 12);
   const estCost = Math.round(systemKw * 2150); // KM cost
  const paybackYears = +(estCost / Math.max(yearlySavings, 1)).toFixed(1);
  const co2Tons = +(yearlyKwh * 0.0005).toFixed(1);
  const batteryRec = systemKw > 8 ? "10 kWh baterija (preporučeno)" : systemKw > 4 ? "5 kWh baterija (opcionalno)" : "Bez baterije";
  return { systemKw: +systemKw.toFixed(1), yearlyKwh, monthlySavings, yearlySavings, paybackYears, co2Tons, estCost, batteryRec };
}
