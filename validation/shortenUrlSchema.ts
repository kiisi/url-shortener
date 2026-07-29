import * as Yup from "yup";

export const shortenUrlSchema = Yup.object({
    url: Yup.string()
        .trim()
        .required("URL is required")
        .url("Enter a valid URL"),

    alias: Yup.string()
        .trim()
        .optional()
        .test(
            "alias-length",
            "Alias must be at least 5 characters",
            (value) => {
                if (!value) return true;

                return value.length >= 5;
            }
        )
        .matches(
            /^[a-zA-Z0-9_-]*$/,
            "Alias can only contain letters, numbers, hyphens and underscores"
        ),
});