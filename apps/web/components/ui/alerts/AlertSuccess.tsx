interface AlertSuccessProps {
  message: string
}

export const AlertSuccess = ({ message }: AlertSuccessProps) => {
  return (
    <p className="alert-success px-4 py-3 text-sm">
      {message}
    </p>
  )
}
