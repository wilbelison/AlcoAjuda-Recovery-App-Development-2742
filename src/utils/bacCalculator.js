// BAC (Blood Alcohol Content) Calculator
// Based on Widmark formula

export const calculateBAC = ({ drinks, weight, gender, hours = 0 }) => {
  if (!drinks || !weight || drinks.length === 0) return 0;

  const r = gender === 'male' ? 0.73 : 0.66; // Body water constant
  const totalAlcohol = drinks.reduce((sum, drink) => {
    return sum + (drink.volume * drink.alcoholPercentage / 100);
  }, 0);

  // Convert to grams (alcohol density ≈ 0.789 g/ml)
  const alcoholGrams = totalAlcohol * 0.789;

  // Widmark formula: BAC = (alcohol in grams / (weight in kg * r)) - (0.015 * hours)
  const bac = (alcoholGrams / (weight * r)) - (0.015 * hours);

  return Math.max(0, bac);
};

export const getBACStatus = (bac) => {
  if (bac === 0) return { status: 'sober', message: 'Sóbrio', color: 'success' };
  if (bac < 0.02) return { status: 'minimal', message: 'Mínimo', color: 'success' };
  if (bac < 0.05) return { status: 'light', message: 'Leve', color: 'warning' };
  if (bac < 0.08) return { status: 'moderate', message: 'Moderado', color: 'warning' };
  if (bac < 0.15) return { status: 'high', message: 'Alto', color: 'danger' };
  return { status: 'dangerous', message: 'Perigoso', color: 'danger' };
};

export const getLegalStatus = (bac, country = 'BR') => {
  const limits = {
    BR: 0.05, // Lei Seca Brasil
    US: 0.08,
    EU: 0.05,
  };

  const limit = limits[country] || limits.BR;
  return {
    isLegal: bac < limit,
    limit,
    message: bac >= limit ? 'Acima do limite legal' : 'Dentro do limite legal'
  };
};