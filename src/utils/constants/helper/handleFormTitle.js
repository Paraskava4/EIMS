export const handleFormTitle = (path) => {
  switch (path) {
    case "/enquiry/form-first":
      return "Enquiry Form";
    case "/enquiry/form-second":
      return "Educational Details";
    case "/enquiry/form-third":
      return "Guardian Details";
    default:
      return "";
  }
};
