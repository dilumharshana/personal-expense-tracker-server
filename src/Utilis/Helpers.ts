import * as d3 from "d3-scale-chromatic";

// helper for generate random colrs for bar chart
export const generateColorScale = (count: number) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(d3.interpolateRainbow(i / count));
  }
  return colors;
};
