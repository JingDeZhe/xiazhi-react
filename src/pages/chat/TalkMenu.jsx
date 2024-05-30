import { Button, Input } from 'antd'

export const TalkMenu = ({ items }) => {
  return (
    <div className="talk-menu col-ctn">
      <div className="talk-menu-search v-center">
        <Input></Input>
        <Button>
          <i className="i-tabler-plus"></i>
        </Button>
      </div>
      <Scrollbar
        className="full-ctn"
        options={{ scrollbars: { autoHide: 'scroll', autoHideDelay: 500 } }}
        defer
      >
        {items.map((d) => {
          return (
            <div className="avatar-info" key={d.id}>
              <img className="avatar" src={d.avatar} />
              <div className="info">
                <div className="flex gap-2">
                  <span className="flex-1">{d.nickname}</span>
                  <span className="text-fade-2 truncate mr-1">
                    {d.lastMessageTime}
                  </span>
                </div>
                <div className="text-fade-1">{d.lastMessage}</div>
              </div>
            </div>
          )
        })}
      </Scrollbar>
    </div>
  )
}
