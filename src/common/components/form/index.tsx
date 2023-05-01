import clsx from "clsx";
import React from "react";
import { Component } from "@appTypes/.";
import { Formik, FormikProps, FormikConfig, FormikHelpers } from "formik";
import { DangerButton, PrimaryButton, TertiaryButton } from "@elements/button";

interface SubComponent {
  Row: Component;
  Grid: Component;
}
interface OnSubmitResult {
  [key: string]: any;
}

export interface FormProps<S = any> {
  className?: string;
  children: React.ReactNode;
  schema?: FormikConfig<S>["validationSchema"];
  onSubmit?: (
    values: S,
    reset: () => void,
    helpers: FormikHelpers<S>
  ) => Promise<void | OnSubmitResult>;
  initialValues?: FormikProps<S>["initialValues"];
  submitButton?: { title: string; Icon?: any, className?: string };
  resetButton?: { title: string; Icon?: any };
  actionClassName?: string;
}

const Form: React.FC<FormProps> & SubComponent = ({
  className,
  actionClassName,
  initialValues = {},
  schema,
  onSubmit,
  children,
  submitButton,
  resetButton,
  ...props
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values, helpers) => {
        const reset = () => {
          helpers.resetForm({});
        };

        const errors = (await onSubmit?.(values, reset, helpers)) || {};

        if (Object.keys(errors).length > 0) {
          helpers.setErrors(errors);
        }
      }}
    >
      {({ handleSubmit, isSubmitting, handleReset, isValid, dirty }) => (
        <form
          className={clsx("grid gap-y-3 w-full", className)}
          onSubmit={handleSubmit}
          {...props}
        >
          {children}

          {(submitButton || resetButton) && (
            <div className={clsx("flex mt-3 gap-x-4", actionClassName)}>
              {submitButton && (
                <TertiaryButton
                  type="submit"
                  loading={isSubmitting}
                  Icon={submitButton.Icon}
                  disabled={!(isValid && dirty)}
                  className={submitButton.className}
                >
                  {submitButton.title}
                </TertiaryButton>
              )}

              {resetButton && (
                <DangerButton
                  onClick={handleReset}
                  disabled={isSubmitting}
                  Icon={resetButton.Icon}
                  type="reset"
                >
                  {resetButton.title}
                </DangerButton>
              )}
            </div>
          )}
        </form>
      )}
    </Formik>
  );
};

// eslint-disable-next-line react/display-name
Form.Row = ({ className, children }) => (
  <div
    className={clsx(
      "grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
      className
    )}
  >
    {children}
  </div>
);

// eslint-disable-next-line react/display-name
Form.Grid = ({ className, children }) => (
  <div className={clsx("grid gap-3 sm:grid-cols-2", className)}>{children}</div>
);

Form.displayName = "Form";
export default Form;
