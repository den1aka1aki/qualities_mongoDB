import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";


function init() {
    Sentry.init({
        dsn: "https://7d9c7ffca18e4b4996e21be72a76a977@o4503923344408576.ingest.sentry.io/4503923346767873",
        integrations: [new BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}
function log (error) {
    Sentry.captureException(error)
}

const logger = {
init,
log
}
export default logger;
