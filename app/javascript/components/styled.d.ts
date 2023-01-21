import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        background: string;
        main: string;
        subMain: string;
        contrast: string;
        subContrast: string;
        error: string;
        subError: string;
        text: string;
        subText: string;
        errorText: string;
        dark: string;
        darkContrast: string;
    }
}
