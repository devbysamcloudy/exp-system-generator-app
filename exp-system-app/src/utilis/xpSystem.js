export const getLevel = (xp) => {
    return Math.floor(xp/100) + 1
};

export const getXPForNextLevel = (xp) => {
    const level = getLevel(xp);
    return level * 100;
};

export const getProgressPercentage = (xp) => {
    const levelXP = (getLevel(xp) - 1) * 100;
    const nextLevelXP = getXPForNextLevel(xp);
    return((xp - levelXP) / (nextLevelXP - levelXP)) * 100;
};



