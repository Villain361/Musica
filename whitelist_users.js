// events/whitelist_users.js
const fs = require('fs');
const path = require('path');
const config = require('./config');

const FILE = path.join(__dirname, 'whitelist_users.json');

function load() {
  if (fs.existsSync(FILE)) {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'));
  }
  const owners = config.ownerID.filter(id => id && id.trim());
  save(owners);
  return owners;
}
function save(arr) {
  fs.writeFileSync(FILE, JSON.stringify(arr, null, 2));
}

module.exports = {
  isAllowed(userId) {
    if (!config.private) return true;
    const stored = load();
    const owners = config.ownerID.filter(id => id && id.trim());
    return stored.includes(userId) || owners.includes(userId);
  },

  async add(userId, executorId) {
    if (!this.isAllowed(executorId)) throw new Error('Not authorized');
    const owners = config.ownerID.filter(id => id && id.trim());
    if (owners.includes(userId)) throw new Error('Owner already whitelisted');
    const list = load();
    if (list.includes(userId)) throw new Error('Already whitelisted');
    list.push(userId);
    save(list);
    return userId;
  },

  async remove(userId, executorId) {
    if (!this.isAllowed(executorId)) throw new Error('Not authorized');
    const owners = config.ownerID.filter(id => id && id.trim());
    if (owners.includes(userId)) throw new Error('Cannot remove owner');
    const list = load();
    if (!list.includes(userId)) throw new Error('Not in whitelist');
    save(list.filter(id => id !== userId));
    return userId;
  },

  getAll() {
    const stored = load();
    const owners = config.ownerID.filter(id => id && id.trim());
    return [...new Set([...stored, ...owners])];
  }
};