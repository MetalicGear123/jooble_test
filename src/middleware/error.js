import { isPromise, oneOf } from "../utils";

export const GLOBAL_ERROR = "GLOBAL_ERROR";
export const LOCAL_ERROR = "LOCAL_ERROR";

export default function globalErrorMiddleware() {
  return next => action => {
    const types = [GLOBAL_ERROR];

    // If not a promise, continue on
    if (!isPromise(action.payload)) {
      return next(action);
    }

    /**
     * Because it iterates on an array for every async action, this
     * oneOfType function could be expensive to call in production.
     * Another solution would would be to include a property in `meta`
     * and evaulate that property.
     *
     * if (action.meta.globalError === true) {
     *   // handle error
     * }
     *
     * The error middleware serves to dispatch the initial pending promise to
     * the promise middleware, but adds a `catch`.
     */
    if (oneOf(action.type, types)) {
      // Dispatch initial pending promise, but catch any errors
      return next(action).catch(error => {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            `${action.type} caught at middleware with reason: ${JSON.stringify(
              error.message
            )}.`
          );
        }

        return error;
      });
    }

    return next(action);
  };
}
