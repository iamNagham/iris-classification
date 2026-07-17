
import setosaIcon from "./assets/setosa-icon.svg";
import versicolorIcon from "./assets/versicolor-icon.svg";
import virginicaIcon from "./assets/virginica-icon.svg";
 
export const SPECIES = {
  setosa: { color: "var(--setosa)", latin: "Iris setosa", icon: setosaIcon },
  versicolor: { color: "var(--versicolor)", latin: "Iris versicolor", icon: versicolorIcon },
  virginica: { color: "var(--virginica)", latin: "Iris virginica", icon: virginicaIcon },
};
 
export function speciesInfo(label) {
  const key = (label || "").toLowerCase();
  return SPECIES[key] || { color: "var(--ink-soft)", latin: label, icon: null };
}
 