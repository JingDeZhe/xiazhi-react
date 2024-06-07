import { Button, Descriptions, Input, Popconfirm, Space } from 'antd'
import { EmptyInfo } from './EmptyInfo'
import { server } from './db/server'
import { useNavigate } from 'react-router-dom'

export const AddressContent = ({ fromId, targetId, onDelete }) => {
  const [contact, setContact] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!targetId) return setContact(null)
    server.getContact(fromId, targetId).then(setContact)
  }, [fromId, targetId])

  const handleDeleleContact = () => {
    server.deleteContact(contact.id).then(() => {
      onDelete(targetId)
    })
  }
  const handleEditContact = () => {}
  const handleChat = () => {
    navigate('../talk', { state: { targetId } })
  }

  return (
    <div className="address-content">
      {contact ? (
        <>
          <div className="flex gap-3">
            <img src={contact.avatar} className="avatar xl" />
            <Descriptions title={contact.alias} column={1}>
              <Descriptions.Item label="Nickname">
                {contact.nickname}
              </Descriptions.Item>
              <Descriptions.Item label="Username">
                {contact.username}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className="p-2">
            <p className="font-bold">Character</p>
            <div className="text-sm">{contact.character}</div>
          </div>
          <Space className="justify-end mt-5">
            <Popconfirm
              icon={null}
              description="Sure to delete the contact?"
              okText="Yes"
              cancelText="No"
              onConfirm={handleDeleleContact}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            {/* <Button onClick={handleEditContact}>Edit</Button> */}
            <Button onClick={handleChat}>Chat</Button>
          </Space>
        </>
      ) : (
        <EmptyInfo>
          <i className="i-tabler-message-circle-bolt"></i>
        </EmptyInfo>
      )}
    </div>
  )
}
