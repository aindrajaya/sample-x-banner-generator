import { Fragment, useState, useRef, useEffect } from 'react'
import { SliderPicker } from 'react-color';

import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  HomeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
]
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const fontOptions = [
  { label: 'Bree Serif', value: "'Bree Serif', serif" },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Courier New', value: "'Courier New', monospace" },
  { label: 'Georgia', value: 'Georgia, serif' }, // New font family
  { label: 'Tahoma', value: 'Tahoma, sans-serif' },
];

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hexColor, setHexColor] = useState('');
  const [bannerText, setBannerText] = useState('');
  const [professionText, setProfessionText] = useState('');
  const [textXPos, setTextXPos] = useState('center');
  const [textYPos, setTextYPos] = useState('center');
  const [textColor, setTextColor] = useState('#fff');
  const [logo, setLogo] = useState(null);
  const [logoSize, setLogoSize] = useState('medium');
  const [logoXPos, setLogoXPos] = useState('center');
  const [logoYPos, setLogoYPos] = useState('center');
  const [canvasWidth, setCanvasWidth] = useState(1500);
  const [canvasHeight, setCanvasHeight] = useState(500);
  const [clickedButton, setClickedButton] = useState(null);
  const [selectedFont, setSelectedFont] = useState(fontOptions[0].value);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = hexColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw logo
    if (logo) {
      const logoImg = new Image();
      logoImg.src = URL.createObjectURL(logo);
      logoImg.onload = () => {
        const logoWidth = getLogoWidth();
        const logoHeight = getLogoHeight();

        const logoX = getLogoXPosition(logoWidth);
        const logoY = getLogoYPosition(logoHeight);

        ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
        formChanged();
      };
    }

    // Draw background image if provided
    if (backgroundImage) {
      const backgroundImageImg = new Image();
      backgroundImageImg.src = URL.createObjectURL(backgroundImage);
      backgroundImageImg.onload = () => {
        ctx.drawImage(backgroundImageImg, 0, 0, canvas.width, canvas.height);
        drawText(); // Draw text after the background image
        drawLogo(); // Draw logo after the background image
        formChanged();
      };
    } else {
      // Draw background if no background image
      ctx.fillStyle = hexColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw text directly if no background image
      drawLogo();
      drawText();
      formChanged();
    }

      // Function to draw logo
    function drawLogo() {
      if (logo) {
        const logoImg = new Image();
        logoImg.src = URL.createObjectURL(logo);
        logoImg.onload = () => {
          const logoWidth = getLogoWidth();
          const logoHeight = getLogoHeight();

          const logoX = getLogoXPosition(logoWidth);
          const logoY = getLogoYPosition(logoHeight);

          ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
        };
      }
    }

    // Function to draw text
    function drawText() {
      ctx.fillStyle = textColor;
      ctx.font = `75px ${selectedFont}`; // custom font
      ctx.textAlign = textXPos;
  
      let textPosition = [];
      if (textXPos === 'center') {
        textPosition[0] = canvas.width / 2;
      } else if (textXPos === 'left') {
        textPosition[0] = 20;
      } else {
        textPosition[0] = canvas.width - 20;
      }
  
      if (textYPos === 'center') {
        textPosition[1] = canvas.height / 2;
      } else if (textYPos === 'top') {
        textPosition[1] = 50;
      } else {
        textPosition[1] = canvas.height - 20;
      }
  
      ctx.fillText(bannerText, textPosition[0], textPosition[1]);

      // Draw the second banner text (professionText)
      ctx.fillText(professionText, textPosition[0], textPosition[1] + 100); 
    }
    
    // Draw text
    // ctx.fillStyle = textColor;
    // ctx.font = "50px 'Bree Serif'";
    // ctx.font = `75px ${selectedFont}`; //custom font
    // ctx.textAlign = textXPos;

    let textPosition = [];
    if (textXPos === 'center') {
      textPosition[0] = canvas.width / 2;
    } else if(textXPos === 'left') {
      textPosition[0] = 20;
    } else {
      textPosition[0] = canvas.width - 20;
    }

    if (textYPos === 'center') {
      textPosition[1] = canvas.height / 2;
    } else if(textYPos === 'top') {
      textPosition[1] = 50;
    } else {
      textPosition[1] = canvas.height - 20;
    }

    const getLogoWidth = () => {
      switch (logoSize) {
        case 'small':
          return 50;
        case 'medium':
          return 100;
        case 'big':
          return 200;
        default:
          return 100;
      }
    };
  
    const getLogoHeight = () => {
      // You can customize the logo height if needed
      return getLogoWidth();
    };
  
    const getLogoXPosition = (logoWidth) => {
      const canvas = canvasRef.current;
  
      if (logoXPos === 'center') {
        return (canvas.width - logoWidth) / 2;
      } else {
        return canvas.width - logoWidth - 20; // Customizing the gap from the right
      }
    };
  
    const getLogoYPosition = (logoHeight) => {
      const canvas = canvasRef.current;
  
      if (logoYPos === 'center') {
        return (canvas.height - logoHeight) / 2;
      } else {
        return canvas.height - logoHeight - 20; // Customizing the gap from the bottom
      }
    };

    ctx.fillText(bannerText, textPosition[0], textPosition[1]);
   }, [hexColor, bannerText, textXPos, textYPos, textColor, logo, logoSize, logoXPos, logoYPos, backgroundImage, clickedButton, selectedFont, professionText]);

  const handleRemoveBackground = () => {
    setBackgroundImage(null);
  };

  const handleBackgroundImageChange = (e) => {
    // setHexColor(null);
    setBackgroundImage(e.target.files[0]);
  };

  const handleProfessionalTheme = () => {
    // Update the state and perform any necessary logic for LinkedIn theme
    setHexColor('#0A66C2');
    setTextColor('#FFF');
    setBannerText('LinkedIn Theme');
    // Add any additional customization for LinkedIn theme
  };

  const handleTwitterTheme = () => {
    // Update the state and perform any necessary logic for Twitter theme
    setHexColor('#1DA1F2');
    setTextColor('#FFF');
    setBannerText('Twitter Theme');
    // Add any additional customization for Twitter theme
  };
  
  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };  

  const handleHexColorChange = (color) => {
    if (color && color.hex) {
      setBackgroundImage(null)
      setHexColor(color.hex);
    }
  };

  const handleBannerTextChange = (e) => {
    setBannerText(e.target.value);
  };

  const handleTextXPosChange = (e) => {
    setTextXPos(e.target.value);
  };

  const handleTextYPosChange = (e) => {
    setTextYPos(e.target.value);
  };

  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleLogoSizeChange = (e) => {
    setLogoSize(e.target.value);
  };

  const handleLogoXPosChange = (e) => {
    setLogoXPos(e.target.value);
  };

  const handleLogoYPosChange = (e) => {
    setLogoYPos(e.target.value);
  };

  const formChanged = () => {
    // Perform any additional logic when the form changes
  };

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

  const handleSizeChange = (width, height, button) => {
    setCanvasWidth(width);
    setCanvasHeight(height);
    setClickedButton(button);
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="/pena.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="-mx-2 flex-1 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                              )}
                            >
                              <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4">
          <div className="flex h-16 shrink-0 items-center justify-center">
            <img
              className="h-8 w-auto"
              src="/pena.png"
              alt="Your Company"
            />
          </div>
          <nav className="mt-8">
            <ul role="list" className="flex flex-col items-center space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    <span className="sr-only">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="lg:pl-20">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                        Tom Cook
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-50' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="xl:pl-96">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              <canvas
                ref={canvasRef}
                id="banner"
                width={canvasWidth}
                height={canvasHeight}
                className="border border-gray-400 rounded mt-4 w-full"
              ></canvas>
              <div className="mt-4">
                <button
                  onClick={() => handleSizeChange(1500, 500, 'Twitter')}
                  className={`mr-2 p-2 ${clickedButton === 'Twitter' ? 'bg-green-300' : 'bg-blue-500'} text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300`}
                >
                  Twitter Size
                </button>
                <button
                  onClick={() => handleSizeChange(1584, 396, 'LinkedIn')}
                  className={`p-2 ${clickedButton === 'LinkedIn' ? 'bg-green-300' : 'bg-blue-500'} text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-red-300`}
                >
                  LinkedIn Size
                </button>
              </div>
              <button
                onClick={handleDownloadImage}
                className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Download Image
              </button>
            </div>
          </main>
        </div>

        <aside className="fixed bottom-0 left-0 right-0 top-96 overflow-y-auto bg-white border-r border-gray-200 px-4 sm:left-20 sm:top-20 sm:w-96 sm:px-6 lg:px-8 xl:block">
          <form id="banner-data-form" className="mb-4">
            <label htmlFor="hexColor" className="mb-4 block text-sm font-medium text-gray-600">
              Background Colour (hex):
            </label>

            {/* Use the Circle Picker component */}
            <SliderPicker
              color={hexColor}
              onChange={handleHexColorChange}
            />

            {/* Display the hex color value if needed */}
            <input
              type="text"
              id="hexColor"
              name="hexColor"
              value={hexColor}
              className="mt-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
              readOnly
            />
            <label htmlFor="bannerText" className="mt-2 block text-sm font-medium text-gray-600">Banner Text:</label>
            <input
              type="text"
              id="bannerText"
              name="bannerText"
              onChange={handleBannerTextChange}
              value={bannerText}
              className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
            />
            <div className='flex flex-row'>
              <fieldset className="flex-1 mt-4">
                <legend className="text-sm font-medium text-gray-600">Text Colour</legend>
                <div className="mt-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="textBlack"
                      name="TextColor"
                      value="#000"
                      checked={textColor === '#000'}
                      onChange={handleTextColorChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="textBlack" className="ml-2 block text-sm text-gray-900">Black</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="textWhite"
                      name="TextColor"
                      value="#FFF"
                      checked={textColor === '#FFF'}
                      onChange={handleTextColorChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="textWhite" className="ml-2 block text-sm text-gray-900">White</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="textRed"
                      name="TextColor"
                      value="#FF0000"
                      checked={textColor === '#FF0000'}
                      onChange={handleTextColorChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="textRed" className="ml-2 block text-sm text-gray-900">Red</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="textGreen"
                      name="TextColor"
                      value="#00FF00"
                      checked={textColor === '#00FF00'}
                      onChange={handleTextColorChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="textGreen" className="ml-2 block text-sm text-gray-900">Green</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="textBlue"
                      name="TextColor"
                      value="#0000FF"
                      checked={textColor === '#0000FF'}
                      onChange={handleTextColorChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="textBlue" className="ml-2 block text-sm text-gray-900">Blue</label>
                  </div>
                </div>
              </fieldset>
              <fieldset className="flex-1 mt-4">
                <legend className="text-sm font-medium text-gray-600">Text x Position</legend>
                <div className="mt-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="xcenter"
                      name="textXPos"
                      value="center"
                      checked={textXPos === 'center'}
                      onChange={handleTextXPosChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="xcenter" className="ml-2 block text-sm text-gray-900">Center</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="xright"
                      name="textXPos"
                      value="right"
                      checked={textXPos === 'right'}
                      onChange={handleTextXPosChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="xright" className="ml-2 block text-sm text-gray-900">Right</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="xleft"
                      name="textXPos"
                      value="left"
                      checked={textXPos === 'left'}
                      onChange={handleTextXPosChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="xleft" className="ml-2 block text-sm text-gray-900">Left</label>
                  </div>
                </div>
              </fieldset>
              <fieldset className="flex-1 mt-4">
                <legend className="text-sm font-medium text-gray-600">Text y Position</legend>
                <div className="mt-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="ycenter"
                      name="textYPos"
                      value="center"
                      checked={textYPos === 'center'}
                      onChange={handleTextYPosChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="center" className="ml-2 block text-sm text-gray-900">Center</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="ybottom"
                      name="textYPos"
                      value="bottom"
                      checked={textYPos === 'bottom'}
                      onChange={handleTextYPosChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="ybottom" className="ml-2 block text-sm text-gray-900">Bottom</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="ytop"
                      name="textYPos"
                      value="top"
                      checked={textYPos === 'top'}
                      onChange={handleTextYPosChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="ybottom" className="ml-2 block text-sm text-gray-900">Top</label>
                  </div>
                </div>
              </fieldset>
            </div>
            <label htmlFor="fontFamily" className="mt-4 block text-sm font-medium text-gray-600">Font Family:</label>
            <select
              id="fontFamily"
              name="fontFamily"
              onChange={handleFontChange}
              value={selectedFont}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
            >
              {fontOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <label htmlFor="backgroundImage" className="mt-4 block text-sm font-medium text-gray-600">Background Image:</label>
            <input
              type="file"
              id="backgroundImage"
              name="backgroundImage"
              accept="image/*"
              onChange={handleBackgroundImageChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
            />

            {backgroundImage && (
              <button
                onClick={handleRemoveBackground}
                className="mt-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
              >
                Remove Background
              </button>
            )}

            <label htmlFor="theme" className="mt-4 block text-sm font-medium text-gray-600">Choose Theme:</label>
            <div className="flex mt-2">
              <button
                onClick={handleProfessionalTheme}
                className="mr-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Professional Theme
              </button>
              <button
                onClick={handleTwitterTheme}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Personal Theme
              </button>
              <button
                onClick={handleTwitterTheme}
                className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Minimalist Theme
              </button>
            </div>
            <label htmlFor="logo" className="mt-4 block text-sm font-medium text-gray-600">Logo:</label>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={handleLogoChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
            />
            <label htmlFor="logoSize" className="mt-4 block text-sm font-medium text-gray-600">Logo Size:</label>
            <select
              id="logoSize"
              name="logoSize"
              onChange={handleLogoSizeChange}
              value={logoSize}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="big">Big</option>
            </select>
            <label htmlFor="logoXPos" className="mt-4 block text-sm font-medium text-gray-600">Logo X Position:</label>
            <select
              id="logoXPos"
              name="logoXPos"
              onChange={handleLogoXPosChange}
              value={logoXPos}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
            >
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
            <label htmlFor="logoYPos" className="mt-4 block text-sm font-medium text-gray-600">Logo Y Position:</label>
            <select
              id="logoYPos"
              name="logoYPos"
              onChange={handleLogoYPosChange}
              value={logoYPos}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
            >
              <option value="center">Center</option>
              <option value="bottom">Bottom</option>
            </select>
          </form>
        </aside>
      </div>
    </>
  )
}
