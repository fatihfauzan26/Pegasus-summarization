export const customStyles = (isDarkMode) => ({
  control: (provided) => ({
    ...provided,
    backgroundColor: isDarkMode ? "#151718" : "#fff",
    color: isDarkMode ? "#fff" : "#151718",
    border: isDarkMode
      ? "1px solid hsl(217, 33%, 18%)"
      : "1px solid hsl(214, 32%, 91%)",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: isDarkMode ? "#151718" : "#fff",
    color: isDarkMode ? "#fff" : "#151718",
    border: isDarkMode
      ? "1px solid hsl(217, 33%, 18%)"
      : "1px solid hsl(214, 32%, 91%)",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: isDarkMode ? "#fff" : "#151718",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? (isDarkMode ? "#fff" : "#151718") : "",
    color: state.isSelected ? (isDarkMode ? "#151718" : "#fff") : "",
    "&:hover": {
      backgroundColor: isDarkMode ? "#fff" : "#151718",
      color: isDarkMode ? "#151718" : "#fff",
    },
    borderColor: "#1f2a3d",
  }),
  input: (provided) => ({
    ...provided,
    color: isDarkMode ? "#fff" : "#151718",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#a4a5a8",
  }),
});
