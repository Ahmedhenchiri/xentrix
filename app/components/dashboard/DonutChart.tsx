import React from "react";

export default function DonutChart({ percent = 20 }: { percent?: number }) {
  const stroke = 20;
  const radius = 70;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center pt-5">
      <svg height={radius * 2} width={radius * 2}>
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#151B38" />
            <stop offset="100%" stopColor="#151B38" />
          </linearGradient>
        </defs>
        <circle
          stroke="#14B58B"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="url(#grad)"
          fill="transparent"
          strokeWidth={stroke}
          
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-[18px] font-bold fill-[#151B38]"
          style={{ fontSize: 16 }}
        >
          {percent}%
        </text>
      </svg>
    </div>
  );
}
