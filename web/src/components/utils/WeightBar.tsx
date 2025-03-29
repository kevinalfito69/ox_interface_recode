import React, { useMemo } from 'react';

const colorChannelMixer = (colorChannelA: number, colorChannelB: number, amountToMix: number) => {
  let channelA = colorChannelA * amountToMix;
  let channelB = colorChannelB * (1 - amountToMix);
  return channelA + channelB;
};

const colorMixer = (rgbA: number[], rgbB: number[], amountToMix: number) => {
  let r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
  let g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
  let b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);
  return `rgb(${r}, ${g}, ${b})`;
};

const COLORS = {
  primaryColor: [255, 0, 102], // Neon Pink
  secondColor: [0, 255, 204], // Neon Cyan
  accentColor: [255, 221, 0], // Neon Yellow
};

const WeightBar: React.FC<{ percent: number; durability?: boolean, playerName?:string, inventoryWeight?:string }> = ({ percent, durability, playerName,inventoryWeight }) => {
  const color = useMemo(
    () =>
      durability
        ? percent < 50
          ? colorMixer(COLORS.accentColor, COLORS.primaryColor, percent / 100)
          : colorMixer(COLORS.secondColor, COLORS.accentColor, percent / 100)
        : percent > 50
        ? colorMixer(COLORS.primaryColor, COLORS.accentColor, percent / 100)
        : colorMixer(COLORS.accentColor, COLORS.secondColor, percent / 50),
    [durability, percent]
  );

  return (
    <div className={durability ? 'durability-bar' : 'weight-bar'}>
      
      <div
        style={{
          visibility: percent > 0 ? 'visible' : 'hidden',
          height: '100%',
          display:'flex',
          
          width: `${percent}%`,
          backgroundColor: color,
          transition: `background 0.3s ease, width 0.3s ease`,
          boxShadow: `0px 0px 15px 5px ${color.replace('rgb', 'rgba').replace(')', ', 0.8)')}`,
        }}
      >
      </div>
        <p className="player-name">{playerName}</p>
        <p className="inventory-weight">{inventoryWeight}kg</p>
    </div>
  );
};
export default WeightBar;
