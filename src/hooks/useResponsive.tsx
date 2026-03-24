import useWindowSize from "./useWindowSize";

export default function useResponsive() {
    const { width } = useWindowSize();

    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const chartHeight = isMobile ? 300 : isTablet ? 350 : 400;

    return { isMobile, isTablet, chartHeight };
}