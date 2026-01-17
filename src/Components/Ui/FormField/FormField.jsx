import React from "react";

export default function FormField({
  name,
  elementType,
  inputType,
  id,
  placeholder,
  className,
  labelText,
  value,
  onChange,
  onBlur,
  errors,
  touched,
  options,
}) {
  const renderElement = () => {
    switch (elementType) {
      case "input":
        return (
          <>
            <input
              type={inputType}
              name={name}
              id={id}
              className={`bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body  ${className}`}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </>
        );
      case "select":
        return (
          <>
            <select
              name={name}
              id={id}
              className={`w-50   px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body ${className}`}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            >
              {options.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
                );
              })}
            </select>
          </>
        );
      case "textarea":
        return (
          <>
            <textarea
              name={name}
              id={id}
              className={`bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body ${className}`}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
            ></textarea>
          </>
        );
    }
  };
  return (
    <>
      {labelText ? (
        <label
          htmlFor={id}
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          {labelText}
        </label>
      ) : (
        ""
      )}
      {renderElement()}
      {errors && touched ? (
        <p className="alert text-white bg-red-600 rounded p-1 mt-2 text-center">
          {errors}
        </p>
      ) : (
        ""
      )}
    </>
  );
}
