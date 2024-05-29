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
      <div className="ctn-body">
        <Scrollbar>
          {items.map((d) => {
            return (
              <div className="talk-menu-item" key={d.id}>
                <div>{d.nickname}</div>
              </div>
            )
          })}
        </Scrollbar>
      </div>
    </div>
  )
}
