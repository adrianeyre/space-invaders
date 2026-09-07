import type { Metric } from 'web-vitals';

// web-vitals 6 renamed every getter (getCLS -> onCLS) and dropped getFID
// outright: FID was retired as a Core Web Vital in favour of INP, so there is
// no like-for-like replacement to call and INP takes its place below.
const reportWebVitals = (onPerfEntry?: (metric: Metric) => void): void => {
	if (!onPerfEntry) return;

	void import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
		onCLS(onPerfEntry);
		onFCP(onPerfEntry);
		onINP(onPerfEntry);
		onLCP(onPerfEntry);
		onTTFB(onPerfEntry);
	});
};

export default reportWebVitals;
