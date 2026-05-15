interface AlertErrorProps {
  message: string
}

export const AlertError = ({ message }: AlertErrorProps) => {
  return (
    <p className="alert-error px-4 py-3 text-sm">
      {message}
    </p>
  )
}