import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const OptionSize = ({ handleSizeChange }) => {
  const [dropdownTypeOpen, setDropdownTypeOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdownType = () => {
    setDropdownTypeOpen((prevState) => !prevState);
  };

  const handleOptionClick = (width, height) => {
    handleSizeChange(width, height);
    setSelectedOption({ width, height });
    setDropdownTypeOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownTypeOpen && !e.target.closest('#dropdownNavbarLink')) {
        setDropdownTypeOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownTypeOpen]);

  return (
    <li className="relative list-none">
      <button
        id="dropdownNavbarLink"
        data-dropdown-toggle="dropdownNavbar"
        className="md:px-3 md:py-2 border-solid border-2 border-gray-200 flex items-center justify-between w-full text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:w-auto dark:text-blue md:dark:hover:text-gray-500 dark:focus:text-black dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
        onClick={toggleDropdownType}
        aria-expanded={dropdownTypeOpen ? 'true' : 'false'}
      >
        Choose Canvas Size:{' '}
        <svg
          className={`w-5 h-5 ml-1 transition-transform duration-300 transform ${
            dropdownTypeOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {dropdownTypeOpen && (
        <div
          id="dropdownNavbar"
          className="z-10 absolute mt-2 max-w-full font-normal bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-400"
            aria-labelledby="dropdownNavbarLink"
          >
            <li>
              <a
                href="#"
                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                  selectedOption && selectedOption.width === 1500 && selectedOption.height === 500
                    ? 'bg-gray-500' // Change this color as needed
                    : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleOptionClick(1500, 500);
                }}
              >
                Twitter {selectedOption && selectedOption.width === 1500 && selectedOption.height === 500 && '✓'}
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                  selectedOption && selectedOption.width === 1584 && selectedOption.height === 396
                    ? 'bg-gray-500' // Change this color as needed
                    : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleOptionClick(1584, 396);
                }}
              >
                LinkedIn {selectedOption && selectedOption.width === 1584 && selectedOption.height === 396 && '✓'}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 opacity-50 cursor-not-allowed"
                onClick={(e) => e.preventDefault()}
              >
                Others (coming soon)
              </a>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
};

OptionSize.propTypes = {
  handleSizeChange: PropTypes.func.isRequired,
};

export default OptionSize;
