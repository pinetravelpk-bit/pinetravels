export interface SalaryInfo {
  amount: number | null;
  unit: "month" | "job";
  note: { en: string; ur: string };
}

// Typical starting monthly salaries in PKR, used on service detail pages and
// the pricing page. Trade staff (electricians, plumbers, carpenters,
// painters) are priced per job/visit rather than a fixed monthly salary.
export const salaries: Record<string, SalaryInfo> = {
  batman: {
    amount: 35000,
    unit: "month",
    note: { en: "Starting monthly salary, PKR", ur: "ابتدائی ماہانہ تنخواہ، روپے" },
  },
  cooks: {
    amount: 35000,
    unit: "month",
    note: { en: "Starting monthly salary, PKR", ur: "ابتدائی ماہانہ تنخواہ، روپے" },
  },
  chefs: {
    amount: 50000,
    unit: "month",
    note: { en: "Starting monthly salary, PKR", ur: "ابتدائی ماہانہ تنخواہ، روپے" },
  },
  maids: {
    amount: 40000,
    unit: "month",
    note: { en: "Starting monthly salary, PKR", ur: "ابتدائی ماہانہ تنخواہ، روپے" },
  },
  helpers: {
    amount: 25000,
    unit: "month",
    note: { en: "Starting monthly salary, PKR", ur: "ابتدائی ماہانہ تنخواہ، روپے" },
  },
  drivers: {
    amount: 35000,
    unit: "month",
    note: { en: "Starting monthly salary, PKR", ur: "ابتدائی ماہانہ تنخواہ، روپے" },
  },
  cleaners: {
    amount: 25000,
    unit: "month",
    note: { en: "Starting monthly salary, PKR", ur: "ابتدائی ماہانہ تنخواہ، روپے" },
  },
  "security-guards": {
    amount: 25000,
    unit: "month",
    note: { en: "Starting monthly salary, PKR", ur: "ابتدائی ماہانہ تنخواہ، روپے" },
  },
  "office-boys": {
    amount: 25000,
    unit: "month",
    note: { en: "Starting monthly salary, PKR", ur: "ابتدائی ماہانہ تنخواہ، روپے" },
  },
  "babysitters-nannies": {
    amount: 40000,
    unit: "month",
    note: { en: "Starting monthly salary, PKR", ur: "ابتدائی ماہانہ تنخواہ، روپے" },
  },
  gardeners: {
    amount: 25000,
    unit: "month",
    note: { en: "Starting monthly salary, PKR", ur: "ابتدائی ماہانہ تنخواہ، روپے" },
  },
  nurses: {
    amount: 60000,
    unit: "month",
    note: { en: "Starting monthly salary, PKR", ur: "ابتدائی ماہانہ تنخواہ، روپے" },
  },
  caretakers: {
    amount: 30000,
    unit: "month",
    note: { en: "Starting monthly salary, PKR", ur: "ابتدائی ماہانہ تنخواہ، روپے" },
  },
  couples: {
    amount: 60000,
    unit: "month",
    note: { en: "Starting combined monthly salary, PKR", ur: "ابتدائی مشترکہ ماہانہ تنخواہ، روپے" },
  },
  electricians: {
    amount: null,
    unit: "job",
    note: {
      en: "Priced per job, depends on scope of work",
      ur: "کام کے دائرہ کار پر منحصر، فی کام قیمت",
    },
  },
  plumbers: {
    amount: null,
    unit: "job",
    note: {
      en: "Priced per job, depends on scope of work",
      ur: "کام کے دائرہ کار پر منحصر، فی کام قیمت",
    },
  },
  carpenters: {
    amount: null,
    unit: "job",
    note: {
      en: "Priced per job, depends on scope of work",
      ur: "کام کے دائرہ کار پر منحصر، فی کام قیمت",
    },
  },
  painters: {
    amount: null,
    unit: "job",
    note: {
      en: "Priced per job, depends on scope of work",
      ur: "کام کے دائرہ کار پر منحصر، فی کام قیمت",
    },
  },
};

export function getSalaryForService(slug: string): SalaryInfo | undefined {
  return salaries[slug];
}
