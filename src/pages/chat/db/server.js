import { db } from './main'

class FakeServer {
  constructor() {
    this.db = db
  }

  async getContacts(userId) {
    return this.db.transaction('r', [db.users, db.relations], async () => {
      const relations = await db.relations.where({ fromId: userId }).toArray()
      const targetIds = relations.map((d) => d.targetId)
      const contacts = await db.users.where('id').anyOf(targetIds).toArray()
      return contacts
    })
  }
}

export const server = new FakeServer()
