export type TProjectName = "algoForge" | "clim64-40";

/**
 * Branded type for hex color values
 */
export type TColorHex = string & { readonly __brand: 'ColorHex' };

export const brandColorHex = (color: string): TColorHex => color as TColorHex;

/**
 * Project color palette with primary and fill colors
 */
export type TProjectColors = {
  color: TColorHex;
  fill: TColorHex;
};

/**
 * Branded type for font family names
 */
export type TFontFamily = string & { readonly __brand: 'FontFamily' };

export const brandFontFamily = (font: string): TFontFamily => font as TFontFamily;

/**
 * Project data with strictly typed colors and fonts
 */
export type TProjectData = {
  logo: JSX.Element;
  title: string;
  description: string;
  colors: TProjectColors;
  fontFamily: TFontFamily;
};