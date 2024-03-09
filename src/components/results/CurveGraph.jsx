/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { LinePath } from "@visx/shape";
import { curveNatural } from "@visx/curve";
import { scaleTime, scaleLinear } from "@visx/scale";
import { MarkerLine, MarkerCircle } from "@visx/marker";
import { Group } from "@visx/group";

const CurveGraph = ({ height = "150px", data }) => {
  const svgRef = useRef(null);
  const [rendered, setRendered] = useState(false);
  const getX = (d) => d.timestamp;
  const getY = (d) => d.value;

  const xScale = scaleTime({
    domain: [Math.min(...data.map(getX)), Math.max(...data.map(getX))],
  });
  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(getY))],
  });
  useEffect(() => {
    const box = svgRef.current.getBoundingClientRect();
    xScale.range([0, box.width - 50]);
    setRendered(true);
  }, [svgRef.current]);
  yScale.range([100, 0]);
  xScale.range([0, 308.3999]);
  return (
    <svg ref={svgRef} width={"100%"} height={height}>
      {rendered && (
        <>
          <MarkerCircle id="marker-circle" fill="#FFD700" size={2} refX={2} />
          <MarkerLine id="marker-line" fill="#333" size={16} strokeWidth={1} />
          <rect width={"100%"} height={height} fill="#E6E6E6" rx={12} ry={12} />
          <Group key={"metric"} top={25} left={25}>
            <LinePath
              curve={curveNatural}
              data={data}
              x={(d) => xScale(getX(d))}
              y={(d) => yScale(getY(d))}
              //brightyellow
              stroke="#FFD700"
              strokeWidth={3}
              strokeOpacity={1}
              shapeRendering="geometricPrecision"
              markerStart="url(#marker-circle)"
            />
          </Group>
        </>
      )}
    </svg>
  );
};

export default CurveGraph;
