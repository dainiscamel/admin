import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      WHITE: string;
      BG: string;
      BLACK: string;
      RED: string;
      BLUE: string;
      GREY_100: string;
      GREY_300: string;
      GREY_400: string;
      GREY_600: string;
      GREY_700: string;
      GREY_900: string;
    };
  }
}

const baseTheme: DefaultTheme = {
  colors: {
    WHITE: "#ffffff",
    BG: "#f6f6f6",
    BLACK: "#000000",
    RED: "#F21724",
    BLUE: "#2656F6",
    GREY_100: "#F5F6F7",
    GREY_300: "#DBDEE2",
    GREY_400: "#BFC6D2",
    GREY_600: "#8E94A0",
    GREY_700: "#6F7785",
    GREY_900: "#101C33",
  },
};

export default baseTheme;
