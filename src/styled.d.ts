import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        headerBg: string;
        headerFontColor: string;
        headerBtnColor: string;
        menuColor: string;
        menuHoverColor: string;
        lineColor: string;
    }
}
