import Button from '../button'

const AddSection = ({ title, buttonText, description, onClick }) => {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <p className="my-2 text-sm text-gray-700">{description}</p>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <Button onClick={onClick}>{buttonText}</Button>
      </div>
    </div>
  )
}

export default AddSection
