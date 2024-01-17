// Import necessary dependencies and components
import { useState, Fragment } from 'react';
import { SliderPicker } from 'react-color';
import ProfessionalFields from './ProfessionalFields'; // Assuming you have a component for professional fields
import PropTypes from 'prop-types'

// Define the main form component
const BannerForm = ({
  professionalButtonClicked,
  occupation,
  email,
  phone,
  socialHandler,
  name,
  setBackground,
  setImage,
  setName,
  setOccupation,
  setPhone, 
  setEmail,
  setSocialHandler,
  selectedFont,
  handleFontChange,
  handleImagePhotoChange,
  handleBackgroundImageChange,
  background,
  image,
  handleRemoveBackground,
  handleRemoveImagePhoto
}) => {
  // State for form fields
  const [hexColor, setHexColor] = useState('#FFFFFF');
  const [bannerText, setBannerText] = useState('');
  const [textColor, setTextColor] = useState('#000');
  const [textXPos, setTextXPos] = useState('center');
  const [textYPos, setTextYPos] = useState('center');
  // ... (other state variables)

  // Event handlers
  const handleHexColorChange = (color) => setBackground(color);
  const handleBannerTextChange = (e) => setBannerText(e.target.value);
  const handleTextColorChange = (color) => setTextColor(color);
  const handleTextXPosChange = (e) => setTextXPos(e.target.value);
  const handleTextYPosChange = (e) => setTextYPos(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleOccupationChange = (e) => setOccupation(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleSocialHandlerChange = (e) => setSocialHandler(e.target.value);

  // ... (other event handlers)

  // Render JSX
  return (
    <form id="banner-data-form" className="mb-4">
      {professionalButtonClicked ? (
        <>
          <FileInput label="Background Image:" id="background" accept="image/*" onChange={handleBackgroundImageChange} />
          {background && (
            <button onClick={handleRemoveBackground} className="mt-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300">
              Remove Background
            </button>
          )}

          {/* Theme Buttons
          <div className="flex mt-2">
            <ThemeButton label="Professional Theme" onClick={handleProfessionalTheme} isActive={professionalButtonClicked} />
            <ThemeButton label="Personal Theme" onClick={handleTwitterTheme} />
            <ThemeButton label="Minimalist Theme" onClick={handleTwitterTheme} />
          </div> */}

          {/* Logo Input */}
          <FileInput label="Photo Image:" id="image" accept="image/*" onChange={handleImagePhotoChange} />
          {image && (
            <button onClick={handleRemoveImagePhoto} className="mt-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300">
              Remove Photo
            </button>
          )}
        </>
      ):(
        <>
          <TextInput label="Name:" id="name" value={name} onChange={handleNameChange} />
          <TextInput label="Occupation:" id="occupation" value={occupation} onChange={handleOccupationChange} />
          <TextInput label="Phone:" id="phone" value={phone} onChange={handlePhoneChange} />
          <TextInput label="Email:" id="email" value={email} onChange={handleEmailChange} />
          <TextInput label="Social Handler:" id="socialHandler" value={socialHandler} onChange={handleSocialHandlerChange} />
        </>
      )}

      {/* Hex Color Picker */}
      <ColorPicker label="Background Colour (hex):" color={background} onChange={handleBackgroundImageChange} readOnly />

      {/* Banner Text input or Professional Fields
      {professionalButtonClicked ? (
        <ProfessionalFields setNameText={setNameText} setOccupationText={setOccupationText} />
      ) : (
        <TextInput label="Banner Text:" id="bannerText" value={bannerText} onChange={handleBannerTextChange} />
      )} */}

      {/* Text Color Picker */}
      <RadioGroup label="Text Colour" name="TextColor" options={textColorOptions} selected={textColor} onChange={handleTextColorChange} />

      {/* Text Position Radio Groups */}
      {/* <RadioGroup label="Text x Position" name="textXPos" options={textXPosOptions} selected={textXPos} onChange={handleTextXPosChange} />
      <RadioGroup label="Text y Position" name="textYPos" options={textYPosOptions} selected={textYPos} onChange={handleTextYPosChange} /> */}

      {/* Font Family Dropdown */}
      <SelectInput label="Font Family:" id="fontFamily" options={fontOptions} value={selectedFont} onChange={handleFontChange} />

      {/* Background Image Input */}
      <FileInput label="Background Image:" id="background" accept="image/*" onChange={handleBackgroundImageChange} />
      {background && (
        <button onClick={handleRemoveBackground} className="mt-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300">
          Remove Background
        </button>
      )}

      {/* Theme Buttons
      <div className="flex mt-2">
        <ThemeButton label="Professional Theme" onClick={handleProfessionalTheme} isActive={professionalButtonClicked} />
        <ThemeButton label="Personal Theme" onClick={handleTwitterTheme} />
        <ThemeButton label="Minimalist Theme" onClick={handleTwitterTheme} />
      </div> */}

      {/* Logo Input */}
      <FileInput label="Photo Image:" id="image" accept="image/*" onChange={handleImagePhotoChange} />
      {image && (
        <button onClick={handleRemoveImagePhoto} className="mt-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300">
          Remove Photo
        </button>
      )}

      {/* Logo Size Dropdown */}
      {/* <SelectInput label="Logo Size:" id="logoSize" options={logoSizeOptions} value={logoSize} onChange={handleLogoSizeChange} /> */}

      {/* Logo Position Dropdowns */}
      {/* <SelectInput label="Logo X Position:" id="logoXPos" options={logoXPosOptions} value={logoXPos} onChange={handleLogoXPosChange} />
      <SelectInput label="Logo Y Position:" id="logoYPos" options={logoYPosOptions} value={logoYPos} onChange={handleLogoYPosChange} /> */}
    </form>
  );
};

// Define reusable components

// ColorPicker Component
const ColorPicker = ({ label, color, onChange, readOnly }) => {
  return (
    <div>
      <label htmlFor="hexColor" className="mb-4 block text-sm font-medium text-gray-600">
        {label}
      </label>
      <SliderPicker color={color} onChange={onChange} />
      <input
        type="text"
        id="hexColor"
        name="hexColor"
        value={color}
        className="mt-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
        readOnly={readOnly}
      />
    </div>
  );
};

ColorPicker.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired, // assuming color is a string, adjust if needed
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

// TextInput Component
const TextInput = ({ label, id, value, onChange }) => {
  return (
    <Fragment>
      <label htmlFor={id} className="mt-2 block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        onChange={onChange}
        value={value}
        className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
      />
    </Fragment>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired, // assuming value is a string, adjust if needed
  onChange: PropTypes.func.isRequired,
};

// RadioGroup Component
const RadioGroup = ({ label, name, options, selected, onChange }) => {
  return (
    <fieldset className="flex-1 mt-4">
      <legend className="text-sm font-medium text-gray-600">{label}</legend>
      <div className="mt-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={selected === option.value}
              onChange={onChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-900">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// SelectInput Component
const SelectInput = ({ label, id, options, value, onChange }) => {
  return (
    <label htmlFor={id} className="mt-4 block text-sm font-medium text-gray-600">
      {label}
      <select
        id={id}
        name={id}
        onChange={onChange}
        value={value}
        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// FileInput Component
const FileInput = ({ label, id, accept, onChange }) => {
  return (
    <label htmlFor={id} className="mt-4 block text-sm font-medium text-gray-600">
      {label}
      <input
        type="file"
        id={id}
        name={id}
        accept={accept}
        onChange={onChange}
        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
      />
    </label>
  );
};

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  accept: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

// ThemeButton Component
const ThemeButton = ({ label, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`mr-2 p-2 ${isActive ? 'bg-green-300' : 'bg-blue-500'} text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300`}
    >
      {label}
    </button>
  );
};

ThemeButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

// Define options for different selects
const fontOptions = [
  { value: 'arial', label: 'Arial' },
  { value: 'times-new-roman', label: 'Times New Roman' },
  { value: 'verdana', label: 'Verdana' },
  { value: 'helvetica', label: 'Helvetica' },
  { value: 'courier-new', label: 'Courier New' },
  // Add more font options as needed
];

const textColorOptions = [
  { value: '#000', label: 'Black' },
  { value: '#FFF', label: 'White' },
  { value: '#FF0000', label: 'Red' },
  { value: '#00FF00', label: 'Green' },
  { value: '#0000FF', label: 'Blue' },
];

const textXPosOptions = [
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
  { value: 'left', label: 'Left' },
];

const textYPosOptions = [
  { value: 'center', label: 'Center' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'top', label: 'Top' },
];

const logoSizeOptions = ['Small', 'Medium', 'Big'].map((value) => ({ value: value.toLowerCase(), label: value }));

const logoXPosOptions = ['Center', 'Right'].map((value) => ({ value: value.toLowerCase(), label: value }));

const logoYPosOptions = ['Center', 'Bottom'].map((value) => ({ value: value.toLowerCase(), label: value }));

BannerForm.propTypes = {
  professionalButtonClicked: PropTypes.bool.isRequired,
  setNameText: PropTypes.func.isRequired,
  setOccupationText: PropTypes.func.isRequired,
  selectedFont: PropTypes.string.isRequired,
  handleFontChange: PropTypes.func.isRequired,
  handleBackgroundImageChange: PropTypes.func.isRequired,
  backgroundImage: PropTypes.object, // Adjust the type based on the actual type of backgroundImage
  handleRemoveBackground: PropTypes.func.isRequired,
  handleProfessionalTheme: PropTypes.func.isRequired,
  handleTwitterTheme: PropTypes.func.isRequired,
  handleLogoChange: PropTypes.func.isRequired,
  logoSize: PropTypes.string.isRequired,
  handleLogoSizeChange: PropTypes.func.isRequired,
  logoXPos: PropTypes.string.isRequired,
  handleLogoXPosChange: PropTypes.func.isRequired,
  logoYPos: PropTypes.string.isRequired,
  handleLogoYPosChange: PropTypes.func.isRequired,
};


// Export the BannerForm component
export default BannerForm;
