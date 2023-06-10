import { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { GradientTealBlue } from "@visx/gradient";
import letterFrequency from "@visx/mock-data/lib/mocks/letterFrequency";
import { scaleBand, scaleLinear } from "@visx/scale";

const data = letterFrequency.slice(5);
const verticalMargin = 32;

// accessors
const getLetter = (d) => d.letter;
const getLetterFrequency = (d) => Number(d.frequency) * 100;

export default function BarGraph({ width = "358.3999", height = "150" }) {
  // bounds
  const xMax = width - 32;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: data.map(getLetter),
        padding: 0.4,
      }),
    [xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLetterFrequency))],
      }),
    [yMax]
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      {/* <GradientTealBlue id="teal" /> */}
      <rect width={width} height={height} fill="#e6e6e6" rx={14} />
      <Group top={verticalMargin / 2} left={16}>
        {data.map((d) => {
          const letter = getLetter(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0);
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={`oklch(${0.5 + Math.random() / 2} 0.15 185.96 / 0.5)`}
            />
          );
        })}
      </Group>
    </svg>
  );
}
