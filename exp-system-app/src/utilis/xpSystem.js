export const getLevel = (xp) => {
  return Math.floor(xp / 100) + 1;
};

export const getXPForNextLevel = (xp) => {
  const level = getLevel(xp);
  return level * 100;
};

export const getProgressPercentage = (xp) => {
  const levelXP = (getLevel(xp) - 1) * 100;
  const nextLevelXP = getXPForNextLevel(xp);
  return ((xp - levelXP) / (nextLevelXP - levelXP)) * 100;
};

export const XP_REWARDS = {
  JavaScript: 60,
  Python: 60,
  Java: 70,
  TypeScript: 70,
  CSS: 40,
  HTML: 40,
  default: 50,
};

export const getXPReward = (language) => {
  return XP_REWARDS[language] || XP_REWARDS["default"];
};

export const addXPToStorage = (amount) => {
  const currentXP = Number(localStorage.getItem("xp")) || 0;
  const newXP = currentXP + amount;
  localStorage.setItem("xp", newXP);
  return newXP;
};