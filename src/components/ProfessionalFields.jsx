const ProfessionalFields = ({ setNameText, setOccupationText }) => (
  <>
    <label htmlFor="name" className="mt-2 block text-sm font-medium text-gray-600">
      Name:
    </label>
    <input
      type="text"
      id="name"
      name="name"
      onChange={(e) => setNameText(e.target.value)}
      className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
    />

    <label htmlFor="occupation" className="mt-2 block text-sm font-medium text-gray-600">
      Occupation:
    </label>
    <input
      type="text"
      id="occupation"
      name="occupation"
      onChange={(e) => setOccupationText(e.target.value)}
      className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
    />
  </>
);

export default ProfessionalFields