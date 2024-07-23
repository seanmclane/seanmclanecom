interface Props {
  label: string,
  type?: string,
  name: string,
  placeholder?: string,
  required?: boolean,
  textArea?: boolean
}

export default function Input({label, type, name, textArea, placeholder}: Props) {
  return textArea ? (
    <div className="flex flex-wrap justify-between items-center mb-4">
        <label className="mr-8" htmlFor={name} >{label}</label>
        <textarea 
          className="border-b border-b-theme w-full md:w-2/3 resize-y py-2 focus:outline-none focus:shadow-md shadow-theme-dark [&:not(:focus):not(:placeholder-shown):invalid]:border-b-red-500"
          rows={4}
          name={name}
          placeholder={placeholder || " "}
          required ></textarea>
      </div>
  ) : (
    <div className="flex flex-wrap justify-between items-center mb-4">
        <label className="mr-8" htmlFor={name} >{label}</label>
        <input 
          className="border-b border-b-theme w-full md:w-2/3 py-2 focus:outline-none focus:shadow-md shadow-theme-dark [&:not(:focus):not(:placeholder-shown):invalid]:border-b-red-500"
          name={name}
          type={type || "text"}
          placeholder={placeholder || " "}
          required ></input>
      </div>
  )
}