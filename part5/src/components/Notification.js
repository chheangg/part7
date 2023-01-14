import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  if (notification.message === null || notification.message === '') {
    return null
  }

  return (
    <div className={`notification${notification.error ? ' error' : ''}`}>
      {notification.message}
    </div>
  )
}

export default Notification
