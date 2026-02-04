import { TStrings } from "../../customHooks/useStrings";
import {
  TProjectName,
  TProjectData,
  brandColorHex,
  brandFontFamily,
} from "./ProjectLeftContent.types";
import { Clim6440Logo } from "../../assets/logos/Clim6440Logo";
import { AlgoForgeLogo } from "../../assets/logos/AlgoForgeLogo";

export const getLogo = (logoName: TProjectName): JSX.Element => {
  switch (logoName) {
    case "algoForge":
      return <AlgoForgeLogo size={128} />;
    case "clim64-40":
      return <Clim6440Logo size={128} />;
    default:
      throw new Error(`Logo "${logoName}" not found`);
  }
};

export const getProjectData = (
  name: TProjectName,
  strings: TStrings
): TProjectData => {
  switch (name) {
    case "algoForge":
      return {
        logo: getLogo("algoForge"),
        title: "AlgoForge",
        description: strings.projects.algoForge.pitch,
        colors: {
          color: brandColorHex("#F2F5F8"),
          fill: brandColorHex("#F2F5F8"),
        },
        fontFamily: brandFontFamily("Roboto"),
      };
    case "clim64-40":
      return {
        logo: getLogo("clim64-40"),
        title: "Clim 64-40",
        description: strings.projects.clim6440.pitch,
        colors: {
          color: brandColorHex("#F4F5F6"),
          fill: brandColorHex("transparent"),
        },
        fontFamily: brandFontFamily("Expletus Sans"),
      };
    default:
      throw new Error(`Project "${name}" not found`);
  }
};
