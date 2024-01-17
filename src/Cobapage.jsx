import {Fragment, useState, useRef, useEffect, useCallback} from 'react'
import {
  Bars3Icon,
} from '@heroicons/react/24/outline'
import TransitionRoot from './components/TransitionRoot';
import DesktopSidebar from './components/DesktopSidebar';
import SearchForm from './components/SearchForm';
import ProfileSection from './components/ProfileSection';
import OptionSize from './components/OptionSize';
import {clearCanvasUtils } from './utils';
import {drawCircularImage, drawAdditionalInforUtils, drawNameUtils, drawTextOccupancyUtils} from './canvas/utils';
import BannerForm from './components/BannerForm';
import PropTypes from 'prop-types';
import { SliderPicker } from 'react-color';


const Cobapage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  //State to handle Canvas Size
  const [canvasWidth, setCanvasWidth] = useState(1500);
  const [canvasHeight, setCanvasHeight] = useState(500);

  //State to handle button theme clicked
  const [professionalThemeClicked, setProfessionalThemeClicked] = useState(false);
  const [simpleThemeClicked, setSimpleThemeClicked] = useState(false);
  const [clearCanvasClicked, setClearCanvasClicked] = useState(false);

  //Canvas ref
  const canvasRef = useRef(null);

  // State for theme data
  const [background, setBackground] = useState("");
  const [image, setImage] = useState('#FFFafa');
  const [name, setName] = useState('Your name');
  const [occupation, setOccupation] = useState('Your occupation');
  const [phone, setPhone] = useState("+1 000 0000 0000");
  const [email, setEmail] = useState('youremail@mail.com');
  const [socialHandler, setSocialHandler] = useState('@youraccount');

  // State for Styling Text
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("24px");
  const [fontColor, setFontColor] = useState("red");

  const handleSizeChange = (width, height) => {
    setCanvasWidth(width);
    setCanvasHeight(height);
  };

  // Handle Download Image
  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'banner.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // State of theme button clicked
  const professionalTheme = () => {
    setProfessionalThemeClicked(true)
  }

  const simpleTheme = () => {
    setSimpleThemeClicked(true)
  }

  // Clear Canvas
  const clearCanvas = () => {
    clearCanvasUtils(canvasRef)
    setProfessionalThemeClicked(false)
    setSimpleThemeClicked(false)
  }

  // Create Simple Theme
  const createSimpleTheme = useCallback((canvas, ctx, background, name, occupation) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (typeof background === 'string' && background.startsWith("#")) {
      // If background is a hex color
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawCircularImage(ctx, image, canvas.width/7, canvas.height/3.5, 100);
      drawNameUtils(ctx, name, canvas.width / 3, canvas.height / 2.5, "simple", selectedFont);
      drawTextOccupancyUtils(ctx, occupation, canvasHeight, canvas.width/4, canvas.height/1.8, "simple", selectedFont);
    } else if (background instanceof File) {
      // If background is an image
      const backgroundImg = new Image();
      backgroundImg.src = URL.createObjectURL(background);
      backgroundImg.onload = () => {
        ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        drawCircularImage(ctx, image, canvas.width/7, canvas.height/3.5, 100);
        drawNameUtils(ctx, name, canvas.width / 3, canvas.height / 2.5, "simple", selectedFont);
        drawTextOccupancyUtils(ctx, occupation, canvasHeight, canvas.width/4, canvas.height/1.8, "simple", selectedFont);
      };
    }

    setProfessionalThemeClicked(false)
    setClearCanvasClicked(false)
  }, [canvasHeight, image, selectedFont])

  // Create Professional Theme
  const createPrfoessionalTheme = useCallback((canvas, ctx, background, image, name, occupation, phone, email, socialhandler) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    if (typeof background === 'string' && background.startsWith("#")) {
      // If background is a hex color
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Image Photo
      drawCircularImage(ctx, image, canvas.width/7, canvas.height/3.5, 100);
      drawNameUtils(ctx, name, canvas.width/2.5, canvas.height/2.5, "pro", selectedFont);
      drawTextOccupancyUtils(ctx, occupation, canvasHeight, canvas.width/2.5, canvas.height/1.9, "pro", selectedFont);
      drawAdditionalInforUtils(ctx, canvas, phone, email, socialhandler, fontSize, selectedFont, "red");
    } else if (background instanceof File) {
      // If background is an image
      const backgroundImg = new Image();
      backgroundImg.src = URL.createObjectURL(background);
      backgroundImg.onload = () => {
        ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

        // Draw Image Photo
        drawCircularImage(ctx, image, canvas.width/7, canvas.height/3.5, 100);
        drawNameUtils(ctx, name, canvas.width/2.5, canvas.height/2.5, "pro");
        drawTextOccupancyUtils(ctx, occupation, canvasHeight, canvas.width/2.5, canvas.height/1.9, "pro", selectedFont);
        drawAdditionalInforUtils(ctx, canvas, phone, email, socialhandler, fontSize, selectedFont, "red");
      };
    }

    setSimpleThemeClicked(false)
    setClearCanvasClicked(false)
  }, [canvasHeight, fontSize, selectedFont]);
  

  //Image Handler
  const handleBackgroundImageChange = (e) => {
    setBackground(e.target.files[0]);
  };

  const handleImagePhotoChange = (e) => {
    setImage(e.target.files[0]);
  }

  // FormText Handler
  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  }

  const handleSocialHandlerChange = (e) => {
    setSocialHandler(e.target.value);
  }

  const handleBackgroundChange = (e) => {
    setBackground(e.target.value);
  }

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };  

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  }

  //Remove Image Handler
  const handleRemoveBackground = () => {
    setBackground("#FFFafa");
    setProfessionalThemeClicked(false);
    setSimpleThemeClicked(false);
    // setClearCanvasClicked(true); // Trigger canvas update
  };

  const handleRemoveImagePhoto = () => {
    setImage(null);
    setProfessionalThemeClicked(false);
    setSimpleThemeClicked(false);
    // setClearCanvasClicked(true); // Trigger canvas update
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if(professionalThemeClicked){
      createPrfoessionalTheme(canvas, ctx, background, image, name, occupation, phone, email, socialHandler)
    } else if(simpleThemeClicked){
      createSimpleTheme(canvas, ctx, background, name, occupation)
    } else if(clearCanvasClicked){
      clearCanvas()
    }
  }, [canvasWidth, canvasHeight, professionalThemeClicked, simpleThemeClicked, clearCanvasClicked, background, image, name, occupation, phone, email, socialHandler, createPrfoessionalTheme, createSimpleTheme]);
  
  return (
    <>
      <div>
        <TransitionRoot sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

        {/* Static sidebar for desktop */}
        <DesktopSidebar />

        <div className="lg:pl-20">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            {/* Navbar Search & Profile */}
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <SearchForm />
              <ProfileSection />
            </div>
          </div>

          <main className="xl:pl-96">
            {/* Canvas Component */}
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              <OptionSize handleSizeChange={handleSizeChange}/>
              <canvas
                ref={canvasRef}
                id="banner"
                width={canvasWidth}
                height={canvasHeight}
                className="border border-gray-400 rounded mt-4 w-full" 
              >
                
              </canvas>
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
              <button
                onClick={handleDownloadImage}
                className="mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
              >
                Download Image
              </button>

              <button
                onClick={professionalTheme}
                className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Professional Theme
              </button>
              <button
                onClick={simpleTheme}
                className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Simple Theme
              </button>
              <button
                onClick={clearCanvas}
                className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Clear Canvas
              </button>
            </div>
            
          </main>
        </div>

        {/* Static sidebar for desktop bg-red-100 change to bg-white */}
        <aside className="fixed bottom-0 left-0 right-0 top-96 overflow-y-auto bg-red-100 border-r border-gray-200 px-4 sm:left-20 sm:top-20 sm:w-96 sm:px-6 lg:px-8 xl:block">
          <form id="banner-data-form" className="mb-4">
            {/* <ColorPicker label="Background Colour (hex):" color={background} onChange={handleBackgroundChange} readOnly/>  */}
            <FileInput label={"Background Image:"} id={"background"} accept={"image/*"} onChange={handleBackgroundImageChange}/>
            {background && (
              <button
                onClick={handleRemoveBackground}
                className="mt-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
              >
                Remove Background
              </button>
            )}

            <FileInput label={"Photo Image:"} id={"image"} accept={"image/*"} onChange={handleImagePhotoChange}/>
            {image && (
              <button
                onClick={handleRemoveImagePhoto}
                className="mt-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
              >
                Remove Photo
              </button>
            )}

          {/* Font Family Dropdown */}
          <SelectInput label="Font Family:" id="fontFamily" options={fontOptions} value={selectedFont} onChange={handleFontChange} />
          <TextInput label="Name:" id="name" value={name} onChange={handleNameChange} />
          <TextInput label="Occupation:" id="occupation" value={occupation} onChange={handleOccupationChange} />
          <TextInput label="Phone:" id="phone" value={phone} onChange={handlePhoneChange} />
          <TextInput label="Email:" id="email" value={email} onChange={handleEmailChange} />
          <TextInput label="Social Handler:" id="socialHandler" value={socialHandler} onChange={handleSocialHandlerChange} />
          <SelectInput label="Font Size:" id="fontSize" options={fontSizeOptions} value={fontSize} onChange={handleFontSizeChange} />
          </form>
         {/* <BannerForm 
          occupation={occupation}
          email={email}
          phone={phone}
          socialHandler={socialHandler}
          name={name}
          professionalButtonClicked={professionalThemeClicked}
          setBackground={setBackground}
          setImage={setImage}
          setName={setName}
          setOccupation={setOccupation}
          setPhone={setPhone}
          setEmail={setEmail}
          setSocialHandler={setSocialHandler}
          // selectedFont,
          // handleFontChange,
          handleImagePhotoChange={handleImagePhotoChange}
          handleBackgroundImageChange={handleBackgroundImageChange}
          background={background}
          image={image}
          handleRemoveBackground={handleRemoveBackground}
          handleRemoveImagePhoto={handleRemoveImagePhoto}
         /> */}
            
        </aside>
      </div>
    </>
  )
}

export default Cobapage

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

// ColorPicker Component
const ColorPicker = ({ label, color, onChange, readOnly }) => {
  const handleColorChange = (newColor) => {
    onChange(newColor.hex); // Pass the hex value to the parent component
  };

  return (
    <div>
      <label htmlFor="hexColor" className="mb-4 block text-sm font-medium text-gray-600">
        {label}
      </label>
      <SliderPicker color={color} onChange={handleColorChange} />
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

// Font options
const fontOptions = [
  { value: 'arial', label: 'Arial' },
  { value: 'times-new-roman', label: 'Times New Roman' },
  { value: 'verdana', label: 'Verdana' },
  { value: 'helvetica', label: 'Helvetica' },
  { value: 'courier-new', label: 'Courier New' },
  { value: 'calibri', label: 'Calibri' },
  { value: 'georgia', label: 'Georgia' },
  { value: 'impact', label: 'Impact' },
  { value: 'palatino', label: 'Palatino' },
  { value: 'comic-sans-ms', label: 'Comic Sans MS' },
  // Add more font options as needed
];

// Font size options
const fontSizeOptions = [
  { value: '24px', label: '24px' },
  { value: '28px', label: '28px' },
  { value: '32px', label: '32px' },
  { value: '20px', label: '20px' },
  { value: '36px', label: '36px' },
  { value: '34px', label: '34px' },
  { value: '16px', label: '16px' },
  { value: '18px', label: '18px' },
  { value: '22px', label: '22px' },
  { value: '14px', label: '14px' },
];

