import { FinancialModel, Currency } from '../types';
import { WORLD_CURRENCIES } from '../data/languagesAndCurrencies';

export function formatCurrency(amount: number, currencyCode: Currency = 'IDR'): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    amount = 0;
  }

  const foundCurrency = WORLD_CURRENCIES.find(c => c.code.toUpperCase() === currencyCode.toUpperCase());
  const locale = foundCurrency ? foundCurrency.locale : 'en-US';
  const symbol = foundCurrency ? foundCurrency.symbol : currencyCode;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (e) {
    return `${symbol} ${Math.round(amount).toLocaleString()}`;
  }
}

export function calculateFinancials(model: FinancialModel) {
  const currency = model.currency || 'IDR';
  
  // Calculate CapEx
  const totalCapex = model.capexItems.reduce((sum, item) => sum + (item.cost || 0), 0);
  
  // Calculate Monthly OpEx
  const totalMonthlyOpex = model.opexItems.reduce((sum, item) => sum + (item.cost || 0), 0);
  const totalAnnualOpex = totalMonthlyOpex * 12;

  // Monthly Revenue & COGS calculation for Year 1 (Month 1 base)
  let baseMonthlyRevenue = 0;
  let baseMonthlyCogs = 0;
  let totalMonthlyUnits = 0;

  model.revenueStreams.forEach((stream) => {
    const rev = (stream.pricePerUnit || 0) * (stream.expectedMonthlyVolume || 0);
    const cogs = rev * ((stream.cogsPercent || 0) / 100);
    baseMonthlyRevenue += rev;
    baseMonthlyCogs += cogs;
    totalMonthlyUnits += stream.expectedMonthlyVolume || 0;
  });

  const baseMonthlyGrossProfit = baseMonthlyRevenue - baseMonthlyCogs;
  const baseGrossMarginPercent = baseMonthlyRevenue > 0 
    ? (baseMonthlyGrossProfit / baseMonthlyRevenue) * 100 
    : 0;

  // Monthly Net Profit (Month 1)
  const baseMonthlyTax = baseMonthlyGrossProfit > totalMonthlyOpex 
    ? (baseMonthlyGrossProfit - totalMonthlyOpex) * ((model.taxRate || 0.5) / 100) 
    : 0;
  const baseMonthlyNetProfit = baseMonthlyGrossProfit - totalMonthlyOpex - baseMonthlyTax;

  // Break Even Point (BEP) Calculations
  // BEP in Units = Total Monthly Fixed Costs (OpEx) / (Weighted Price per Unit - Weighted COGS per Unit)
  const weightedPricePerUnit = totalMonthlyUnits > 0 ? baseMonthlyRevenue / totalMonthlyUnits : 0;
  const weightedCogsPerUnit = totalMonthlyUnits > 0 ? baseMonthlyCogs / totalMonthlyUnits : 0;
  const contributionMarginPerUnit = weightedPricePerUnit - weightedCogsPerUnit;

  const bepUnits = contributionMarginPerUnit > 0 
    ? Math.ceil(totalMonthlyOpex / contributionMarginPerUnit) 
    : 0;

  const contributionMarginRatio = baseMonthlyRevenue > 0 ? baseMonthlyGrossProfit / baseMonthlyRevenue : 0;
  const bepRevenueMonthly = contributionMarginRatio > 0 
    ? Math.ceil(totalMonthlyOpex / contributionMarginRatio) 
    : 0;

  // 12-Month Detailed Projection
  const monthlyProjection = [];
  const growth = (model.monthlyGrowthRate || 0) / 100;
  
  let cumulativeCash = model.initialCapital - totalCapex;
  let currentMonthlyRevenue = baseMonthlyRevenue;
  let currentMonthlyCogs = baseMonthlyCogs;

  for (let m = 1; m <= 12; m++) {
    if (m > 1) {
      currentMonthlyRevenue = currentMonthlyRevenue * (1 + growth);
      currentMonthlyCogs = currentMonthlyCogs * (1 + growth);
    }

    const mGross = currentMonthlyRevenue - currentMonthlyCogs;
    const mOpex = totalMonthlyOpex;
    const mEbit = mGross - mOpex;
    const mTax = mEbit > 0 ? mEbit * ((model.taxRate || 0.5) / 100) : 0;
    const mNetProfit = mEbit - mTax;

    cumulativeCash += mNetProfit;

    monthlyProjection.push({
      month: `Bln ${m}`,
      monthNum: m,
      revenue: Math.round(currentMonthlyRevenue),
      cogs: Math.round(currentMonthlyCogs),
      grossProfit: Math.round(mGross),
      opex: Math.round(mOpex),
      netProfit: Math.round(mNetProfit),
      cumulativeCash: Math.round(cumulativeCash),
    });
  }

  // Annual Totals (Year 1)
  const year1Revenue = monthlyProjection.reduce((s, m) => s + m.revenue, 0);
  const year1Cogs = monthlyProjection.reduce((s, m) => s + m.cogs, 0);
  const year1GrossProfit = year1Revenue - year1Cogs;
  const year1NetProfit = monthlyProjection.reduce((s, m) => s + m.netProfit, 0);

  // 3-Year Projections (Assumes 25% annual expansion for Y2, 35% for Y3)
  const year2Revenue = year1Revenue * 1.35;
  const year2Cogs = year1Cogs * 1.30;
  const year2GrossProfit = year2Revenue - year2Cogs;
  const year2Opex = totalAnnualOpex * 1.15;
  const year2NetProfit = (year2GrossProfit - year2Opex) * (1 - (model.taxRate || 0.5) / 100);

  const year3Revenue = year2Revenue * 1.40;
  const year3Cogs = year2Cogs * 1.35;
  const year3GrossProfit = year3Revenue - year3Cogs;
  const year3Opex = year2Opex * 1.20;
  const year3NetProfit = (year3GrossProfit - year3Opex) * (1 - (model.taxRate || 0.5) / 100);

  const threeYearSummary = [
    { year: 'Tahun 1', revenue: year1Revenue, grossProfit: year1GrossProfit, opex: totalAnnualOpex, netProfit: year1NetProfit },
    { year: 'Tahun 2', revenue: year2Revenue, grossProfit: year2GrossProfit, opex: year2Opex, netProfit: year2NetProfit },
    { year: 'Tahun 3', revenue: year3Revenue, grossProfit: year3GrossProfit, opex: year3Opex, netProfit: year3NetProfit },
  ];

  // Payback Period (Months)
  let paybackMonth = 0;
  let runningCash = -(totalCapex);
  for (let i = 0; i < monthlyProjection.length; i++) {
    runningCash += monthlyProjection[i].netProfit;
    if (runningCash >= 0 && paybackMonth === 0) {
      paybackMonth = i + 1;
      break;
    }
  }

  // ROI Year 1 (%)
  const roiYear1 = totalCapex > 0 ? (year1NetProfit / totalCapex) * 100 : 0;

  return {
    currency,
    totalCapex,
    totalMonthlyOpex,
    totalAnnualOpex,
    baseMonthlyRevenue,
    baseMonthlyCogs,
    baseMonthlyGrossProfit,
    baseGrossMarginPercent,
    baseMonthlyNetProfit,
    bepUnits,
    bepRevenueMonthly,
    year1Revenue,
    year1GrossProfit,
    year1NetProfit,
    paybackMonth: paybackMonth > 0 ? `${paybackMonth} Bulan` : '> 12 Bulan',
    roiYear1: roiYear1.toFixed(1) + '%',
    monthlyProjection,
    threeYearSummary,
  };
}
