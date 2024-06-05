import { db } from './main'

class FakeServer {
  constructor() {
    this.db = db
  }

  async getContacts(id) {
    return this.db.transaction('r', [db.users, db.relations], async () => {
      const relations = await db.relations.where({ fromId: id }).toArray()
      const targetIds = relations.map((d) => d.targetId)
      const contacts = await db.users.where('id').anyOf(targetIds).toArray()
      return contacts
    })
  }

  async getUser(id) {
    return this.db.users.get(id)
  }
}

export const server = new FakeServer()
